<template>
  <div class="cate-type-detail">
    <h5 class="font-weight-bold">DANH SÁCH CÁC CHI TIẾT LOẠI SẢN PHẨM</h5>
    <button class="btn mb-2 cate-add-type-detail-btn" @click="formAddTypeDetail">
      Thêm Chi Tiết Loại
    </button>
    <div class="staff-type-detail-divider">

    </div>
    <div v-if="isVisibleFormAddTypeDetail" class="cate-type-detail-form-add ml-2 mt-2">
      <form action="" @submit.prevent="addTypeDetail">

        <div class="form-group">
          <label for="select-type-detail">Chọn loại</label>
          <select name="select-type-detail" id="select-type-detail" class="ml-4" v-model="typeDetail.typeId">
            <option v-for="(type, typeIndex) in types" :key="type._id" :value="type._id">
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="select-type-detail">Chọn giới tính</label>
          <select name="select-type-detail" id="select-type-detail" class="ml-4" v-model="typeDetail.genderId">
            <option v-for="(gender, genderIndex) in genders" :key="gender._id" :value="gender._id">
              {{ gender.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="type-name">Tên chi tiết loại</label>
          <input class="form-control" type="text" name="type-name" id="type-name" placeholder="Nhập tên chi tiết loại"
            v-model="typeDetail.name">
        </div>
        <div class="form-group">
          <label for="type-description">Mô tả</label>
          <input class="form-control" type="text" name="type-description" id="type-description" placeholder="Nhập mô tả"
            v-model="typeDetail.description">
        </div>
        <p class="text-center cate-btn-form-add-close">
          <button class="btn btn-dark" @click="closeFormAddTypeDetail">
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
          <th scope="col">Tên loại sản phẩm</th>
          <th scope="col">Tên chi tiết loại</th>
          <th scope="col">Thuộc giới tính</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Chỉnh sửa</th>
        </tr>
      </thead>
      <tbody>
        <!-- Lặp qua từng loại sản phẩm -->
        <!-- <template v-for="(type, typeIndex) in types" :key="type._id">
      <template v-for="(typeDetail, detailIndex) in type.typeDetails" :key="typeDetail._id">
        <tr>
          <td>{{ type.name }}</td>
          <td>{{ typeDetail.name }}</td>
          <td>{{ typeDetail.description }}</td>
          <td>
            <button class="cate-delete" @click="openModalDeleteTypeDetail(typeDetail._id)">Xóa</button>
            <button class="ml-2 cate-update" @click="openModalUpdateTypeDetail(typeDetail._id)">Sửa</button>
          </td>
        </tr>
      </template>
</template> -->

        <template v-for="(type, index) in types" :key="type._id">
          <template v-for="(typeDetail, detailIndex) in typeDetails" :key="typeDetail._id">
            <template v-if="type._id === typeDetail.typeId">
              <tr>
                <td>{{ type.name }}</td>
                <td>{{ typeDetail.name }}</td>
                <td>{{ typeDetail.description }}</td>
                <template v-for="gender in genders" :key="gender._id">
                  <template v-if="gender._id === typeDetail.genderId">
                    <td>{{ gender.name }}</td>
                  </template>
                </template>
                <td>
                  <button class="cate-delete" @click="openModalDeleteTypeDetail(typeDetail._id)">Xóa</button>
                  <button class="ml-2 cate-update" @click="openModalUpdateTypeDetail(typeDetail._id)">Sửa</button>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>

    <!-- modal-delete-type -->
    <div v-if="isVisibleModalDeleteTypeDetail" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Xóa chi tiết loại sản phẩm</h5>
            <button type="button" class="close" @click="closeModalDeleteTypeDetail">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>Bạn có chắc chắn muốn xóa chi tiết loại sản phẩm này?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalDeleteTypeDetail">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteOneTypeDetail">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal-update-type -->
    <div v-if="isVisibleModalUpdateTypeDetail" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Cập nhật thông tin loại sản phẩm</h5>
            <button type="button" class="close" @click="closeModalUpdateTypeDetail">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="type-name">Tên loại sản phẩm</label>
              <input class="form-control" type="text" name="type-name" id="type-name" placeholder="Nhập loại sản phẩm"
                v-model="getOneTypeDetail.name">
            </div>
            <div class="form-group">
              <label for="type-description">Mô tả</label>
              <input class="form-control" type="text" name="type-description" id="type-description"
                placeholder="Nhập mô tả" v-model="getOneTypeDetail.description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalUpdateTypeDetail">Hủy</button>
            <button type="button" class="btn btn-success" @click="updateOneTypeDetail">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import typeDetailService from '@/services/type_detail.service';
import typeService from '@/services/type.service';
import { error } from 'jquery';
import genderService from '@/services/gender.service';
import { showErrorToast, showSuccessToast } from '@/components/shared/Toast_Notification.vue';
export default {
  data() {
    return {
      isVisibleModalDeleteTypeDetail: false,
      isVisibleModalUpdateTypeDetail: false,
      isVisibleFormAddTypeDetail: false,

      // type chứa mảng các type
      types: [],

      // typeDetails chứa mảng chi tiết loại
      typeDetails: [],

      // get đối tượng
      getOneTypeDetail: {
        name: '',
        description: '',
      },

      // id typeDetail để xóa
      typeDetail_id: typeof (Object),

      // TypeDetail để tạo một đối tượng
      typeDetail: {
        typeId: '',
        genderId: '',
        name: '',
        description: '',

      },
      globalIndex: 0,

      genders: [],

    };
  },
  methods: {
    async fetchAllType() {
      this.types = await typeService.getAll();
      this.types.sort((a, b) => a.name.localeCompare(b.name));
    },

    async fetchGenders() {
      try {
        this.genders = await genderService.getAll();
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAllTypeDetail() {
      this.typeDetails = await typeDetailService.getAll();
      this.globalIndex = 0;
    },

    formAddTypeDetail() {
      this.isVisibleFormAddTypeDetail = true;
    },

    closeFormAddTypeDetail() {
      this.isVisibleFormAddTypeDetail = false;
    },

    async addTypeDetail() {
      this.typeDetail.id
      try {
        const result = await typeDetailService.create(this.typeDetail);
        if (result) {
          showSuccessToast("Bạn đã thêm thành công loại sản phẩm");
          this.fetchAllTypeDetail();
        }
      } catch {
        console.error("Lỗi không thêm được loại sản phẩm");
      }
    },

    openModalDeleteTypeDetail(id) {
      this.isVisibleModalDeleteTypeDetail = true;
      this.typeDetail_id = id;
    },

    async openModalUpdateTypeDetail(id) {
      this.isVisibleModalUpdateTypeDetail = true;
      this.typeDetail_id = id;
      this.getOneTypeDetail = await this.typeDetails.find(typedetail => typedetail._id === this.typeDetail_id);
    },



    closeModalDeleteTypeDetail() {
      this.isVisibleModalDeleteTypeDetail = false;
      this.typeDetail_id = null;
    },

    async deleteOneTypeDetail() {
      if (this.typeDetail_id) {
        try {
          const message = await typeDetailService.delete(this.typeDetail_id);
          this.closeModalDeleteTypeDetail();
          showSuccessToast(message.message);
          await this.fetchAllTypeDetail();
        } catch (error) {
          showErrorToast(error.response.data.message);
          console.error("Lỗi không xóa được loại sản phẩm");
        }
      }
    },

    closeModalUpdateTypeDetail() {
      this.isVisibleModalUpdateTypeDetail = false;
      this.typeDetail_id = null;
    },



    async updateOneTypeDetail() {
      if (this.typeDetail_id) {
        try {
          const message = await typeDetailService.update(this.typeDetail_id, this.getOneTypeDetail);
          this.closeModalUpdateTypeDetail();
          showSuccessToast(message.message);
          await this.fetchAllTypeDetail();
        } catch (error) {
          showErrorToast(error.response.data.message);
          console.error(error);
        }
      }
    }
  },


  async mounted() {
    await this.fetchAllType();
    await this.fetchAllTypeDetail();
    await this.fetchGenders();

  }
}

</script>

<style>
.cate-type-detail {
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.cate-add-type-detail-btn {
  display: flex;
  border: 1px solid black;
  padding: 7px;
  border-radius: 5px;
}

.cate-add-type-detail-btn:hover {
  background-color: rgb(1, 92, 80);
  border: 1px solid rgb(0, 134, 121);
  padding: 7px;
  border-radius: 5px;
  color: white;
}

.cate-type-detail-form-add {
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

.cate-type-detail-btn-close {
  background-color: white;
  border: 1px solid black;
}

.cate-type-detail-btn-add {
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  color: white;
}

.cate-type-detail-btn-close:hover {
  background-color: white;
  border: 1px solid black;
  color: red;
  border-radius: 3px;
  font-weight: bold;
}

h .cate-type-detail-btn-add:hover {
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

.staff-type-detail-divider {
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>