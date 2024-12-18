<template>
  <div class="cate-type">
    <h5 class="font-weight-bold">DANH SÁCH CÁC LOẠI SẢN PHẨM</h5>
    <button class="btn mb-2 cate-add-type-btn" @click="formAddType">
      Thêm Loại Sản Phẩm
    </button>
    <div class="staff-type-divider"></div>
    <div v-if="isVisibleFormAddType" class="cate-type-form-add ml-2 mt-2">
      <form action="" @submit.prevent="addType">
        <div class="form-group">
          <label for="type-name">Tên loại sản phẩm</label>
          <input class="form-control" type="text" name="type-name" id="type-name" placeholder="Nhập loại sản phẩm"
            v-model="type.name">
        </div>
        <div class="form-group">
          <label for="type-description">Mô tả</label>
          <input class="form-control" type="text" name="type-description" id="type-description" placeholder="Nhập mô tả"
            v-model="type.description">
        </div>
        <p class="text-center cate-btn-form-add-close">
          <button class="btn btn-dark " @click="closeFormAddType">
            Hủy
          </button>
          <button class="btn btn-primary" type="submit">
            Thêm
          </button>
        </p>

      </form>
    </div>
    <table class="table">
      <thead class="thead">
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên loại sản phẩm</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Chỉnh sửa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(type, index) in types" :key="type._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ type.name }}</td>
          <td>{{ type.description }}</td>
          <td>
            <button class="cate-delete" @click="openModalDeleteType(type._id)">Xóa</button>
            <button class="ml-2 cate-update" @click="openModalUpdateType(type._id)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal-delete-type -->
    <div v-if="isVisibleModalDeleteType" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Xóa loại sản phẩm</h5>
            <button type="button" class="close" @click="closeModalDeleteType">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa loại sản phẩm này?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalDeleteType">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteOneType">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal-update-type -->
    <div v-if="isVisibleModalUpdateType" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Cập nhật thông tin loại sản phẩm</h5>
            <button type="button" class="close" @click="closeModalUpdateType">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="type-name">Tên loại sản phẩm</label>
              <input class="form-control" type="text" name="type-name" id="type-name" placeholder="Nhập loại sản phẩm"
                v-model="getOneType.name">
            </div>
            <div class="form-group">
              <label for="type-description">Mô tả</label>
              <input class="form-control" type="text" name="type-description" id="type-description"
                placeholder="Nhập mô tả" v-model="getOneType.description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalUpdateType">Hủy</button>
            <button type="button" class="btn btn-success" @click="updateOneType">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { showErrorToast, showSuccessToast } from '@/components/shared/Toast_Notification.vue';
import typeService from '@/services/type.service';
export default {
  data() {
    return {
      types: [],
      isVisibleModalDeleteType: false,
      isVisibleModalUpdateType: false,
      isVisibleFormAddType: false,

      type: {
        name: '',
        description: '',
      },
      getOneType: {
        name: '',
        description: '',
      },
      type_id: '',
    };
  },
  methods: {
    async fetchAllTypes() {
      this.types = await typeService.getAll();
    },

    formAddType() {
      this.isVisibleFormAddType = true;
    },

    closeFormAddType() {
      this.isVisibleFormAddType = false;
    },

    async addType() {
      try {
        const result = await typeService.create(this.type);
        if (result) {
          showSuccessToast("Bạn đã thêm thành công loại sản phẩm");
          this.fetchAllTypes();
        }
      } catch {
        console.error("Lỗi không thêm được loại sản phẩm");
      }
    },

    openModalDeleteType(id) {
      this.isVisibleModalDeleteType = true;
      this.type_id = id;
    },

    async openModalUpdateType(id) {
      this.isVisibleModalUpdateType = true;
      if (this.types.length === 0) {
        await this.fetchAllTypes();
      }
      this.type_id = id;
      this.getOneType = await this.types.find(type => type._id === id);
    },

    closeModalDeleteType() {
      this.isVisibleModalDeleteType = false;
      this.type_id = null;
    },

    closeModalUpdateType() {
      this.isVisibleModalUpdateType = false;
      this.type_id = null;
    },

    async deleteOneType() {
      if (this.type_id) {
        try {
          const message = await typeService.delete(this.type_id);
          this.closeModalDeleteType();
          console.log(message.message);
          showSuccessToast(message.message);
          await this.fetchAllTypes();
        } catch (error) {
          showErrorToast(error.response.data.message);
          console.error("Lỗi không xóa được loại sản phẩm");
        }
      }
    },

    async updateOneType() {
      if (this.type_id) {
        try {
          const message = await typeService.update(this.type_id, this.getOneType);
          this.closeModalUpdateType();
          showSuccessToast(message.message);
          await this.fetchAllTypes();
          // window.history.go('/category/type')
        } catch {
          console.error("Lỗi không cập nhật được loại sản phẩm");
        }
      }
    }
  },

  mounted() {
    this.fetchAllTypes();
  }
}

</script>

<style>
.cate-type {
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.cate-add-type-btn {
  display: flex;
  border: 1px solid black;
  padding: 7px;
  border-radius: 5px;
}

.cate-add-type-btn:hover {
  background-color: rgb(1, 92, 80);
  border: 1px solid rgb(0, 134, 121);
  padding: 7px;
  border-radius: 5px;
  color: white;
}

.cate-type-form-add {
  max-width: 100%;
  width: 35%;
  border: 1px solid black;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 5px 10px #888888;
}



.cate-btn-form-add-close {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.cate-type-btn-close {
  background-color: white;
  border: 1px solid black;
}

.cate-type-btn-add {
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  color: white;
}

.cate-type-btn-close:hover {
  background-color: white;
  border: 1px solid black;
  color: red;
  border-radius: 3px;
  font-weight: bold;
}

h .cate-type-btn-add:hover {
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  color: rgb(20, 172, 0);
  border-radius: 3px;
  font-weight: bold;
}


.thead {
  background-color: rgb(107, 107, 107);
  color: white;
}

.table tbody tr:hover {
  background-color: #dfdfdf;
}

.cate-delete,
.cate-update {
  background-color: white;
  padding: 3px;
  border-radius: 5px;
  border: 0.5px solid black;
}

.cate-delete:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(255, 0, 0);
  font-weight: bold;
  border: 2px solid black;
}

.cate-update:hover {
  background-color: rgb(255, 255, 255);
  color: green;
  font-weight: bold;
  border: 2px solid black;
}

.modal-overlay {
  position: fixed;
  z-index: 200;
  top: 25px;
  right: 10px;
}

.staff-type-divider {
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>