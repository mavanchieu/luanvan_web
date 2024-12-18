<template>
  <div class="cate-brand">
    <h5 class="font-weight-bold">DANH SÁCH CÁC NHÃN HIỆU</h5>
    <button class="btn mb-2 cate-add-brand-btn" @click="formAddBrand">
      Thêm Nhãn Hiệu
    </button>
    <div class="staff-brand-divider">
    </div>
    <div v-if="isVisibleFormAddBrand" class="cate-brand-form-add ml-2 mt-2">
      <form action="" @submit.prevent="addBrand">
        <div class="form-group">
          <label for="brand-name">Tên nhãn hiệu</label>
          <input class="form-control" type="text" name="brand-name" id="brand-name" placeholder="Nhập tên nhãn hiệu"
            v-model="brand.name">
        </div>
        <div class="form-group">
          <label for="brand-description">Mô tả</label>
          <input class="form-control" type="text" name="brand-description" id="brand-description"
            placeholder="Nhập mô tả" v-model="brand.description">
        </div>
        <p class="text-center cate-btn-form-add-close">
          <button class="btn btn-dark" @click="closeFormAddBrand">
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
          <th scope="col">Tên nhãn hiệu</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Chỉnh sửa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(brand, index) in brands" :key="brand._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ brand.name }}</td>
          <td>{{ brand.description }}</td>
          <td>
            <button class="cate-delete" @click="openModalDeleteBrand(brand._id)">Xóa</button>
            <button class="ml-2 cate-update" @click="openModalUpdateBrand(brand._id)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal-delete-brand -->
    <div v-if="isVisibleModalDeleteBrand" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Xóa nhãn hiệu</h5>
            <button type="button" class="close" @click="closeModalDeleteBrand">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa nhãn hiệu này?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalDeleteBrand">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteOneBrand">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal-update-brand -->
    <div v-if="isVisibleModalUpdateBrand" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Cập nhật thông tin nhãn hiệu</h5>
            <button type="button" class="close" @click="closeModalUpdateBrand">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="brand-name">Tên nhãn hiệu</label>
              <input class="form-control" type="text" name="brand-name" id="brand-name" placeholder="Nhập tên nhãn hiệu"
                v-model="getOneBrand.name">
            </div>
            <div class="form-group">
              <label for="brand-description">Mô tả</label>
              <input class="form-control" type="text" name="brand-description" id="brand-description"
                placeholder="Nhập tên nhãn hiệu" v-model="getOneBrand.description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalUpdateBrand">Hủy</button>
            <button type="button" class="btn btn-success" @click="updateOneBrand">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { showErrorToast, showSuccessToast } from '@/components/shared/Toast_Notification.vue';
import brandService from '@/services/brand.service';
export default {
  data() {
    return {
      brands: [],
      isVisibleModalDeleteBrand: false,
      isVisibleModalUpdateBrand: false,
      isVisibleFormAddBrand: false,

      brand: {
        name: '',
        description: '',
      },
      getOneBrand: {
        name: '',
        description: '',
      },
      brand_id: '',
    };
  },
  methods: {
    async fetchAllBrands() {
      this.brands = await brandService.getAll();
    },

    formAddBrand() {
      this.isVisibleFormAddBrand = true;
    },

    closeFormAddBrand() {
      this.isVisibleFormAddBrand = false;
    },

    async addBrand() {
      try {
        const result = await brandService.create(this.brand);
        if (result) {
          showSuccessToast("Bạn đã thêm thành công nhãn hiệu");
          this.fetchAllBrands();
        }
      } catch {
        console.error("Lỗi không thêm được brand");
      }
    },

    openModalDeleteBrand(id) {
      this.isVisibleModalDeleteBrand = true;
      this.brand_id = id;
    },

    async openModalUpdateBrand(id) {
      this.isVisibleModalUpdateBrand = true;
      if (this.brands.length === 0) {
        await this.fetchAllBrands();
      }
      this.brand_id = id;
      this.getOneBrand = await this.brands.find(brand => brand._id === id);
    },

    closeModalDeleteBrand() {
      this.isVisibleModalDeleteBrand = false;
      this.brand_id = null;
    },

    closeModalUpdateBrand() {
      this.isVisibleModalUpdateBrand = false;
      this.brand_id = null;
    },

    async deleteOneBrand() {
      if (this.brand_id) {
        try {
          const message = await brandService.delete(this.brand_id);
          this.closeModalDeleteBrand();
          showSuccessToast(message.message);
          await this.fetchAllBrands();
        } catch (error) {
          showErrorToast(error.response.data.message);
          console.error("Lỗi không xóa được nhãn hiệu");
        }
      }
    },

    async updateOneBrand() {
      if (this.brand_id) {
        try {
          const message = await brandService.update(this.brand_id, this.getOneBrand);
          this.closeModalUpdateBrand();
          alert(message.message);
          await this.fetchAllBrands();
        } catch (error) {
          console.error("Lỗi không cập nhật được nhãn hiệu");
        }
      }
    }
  },

  mounted() {
    this.fetchAllBrands();
  }
}

</script>

<style>
.cate-brand {
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.cate-add-brand-btn {
  display: flex;
  border: 1px solid black;
  padding: 7px;
  border-radius: 5px;
}

.cate-add-brand-btn:hover {
  background-color: rgb(1, 92, 80);
  border: 1px solid rgb(0, 134, 121);
  padding: 7px;
  border-radius: 5px;
  color: white;
}

.cate-brand-form-add {
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

.cate-brand-btn-close {
  background-color: white;
  border: 1px solid black;
}

.cate-brand-btn-add {
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  color: white;
}

.cate-brand-btn-close:hover {
  background-color: white;
  border: 1px solid black;
  color: red;
  border-radius: 3px;
  font-weight: bold;
}

.cate-brand-btn-add:hover {
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  color: rgb(20, 172, 0);
  border-radius: 3px;
  font-weight: bold;
}


.thead {
  background-color: black;
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

.thead {
  background-color: rgb(107, 107, 107);
  color: white;
}

.modal-overlay {
  position: fixed;
  z-index: 200;
  top: 25px;
  right: 10px;
}

.staff-brand-divider {
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>