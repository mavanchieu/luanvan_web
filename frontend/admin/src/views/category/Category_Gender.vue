<template>
  <div class="cate-gender">
    <h5 class="font-weight-bold">DANH SÁCH GIỚI TÍNH</h5>
    <button class="btn mb-2 cate-add-gender-btn" @click="formAddGender">
      Thêm Giới Tính
    </button>
    <div class="staff-gender-divider">
    </div>
    <div v-if="isVisibleFormAddGender" class="cate-gender-form-add ml-2 mt-2">
      <form action="" @submit.prevent="addGender">
        <div class="form-group">
          <label for="gender-name">Tên giới tính</label>
          <input class="form-control" type="text" name="gender-name" id="gender-name" placeholder="Nhập giới tính"
            v-model="gender.name">
        </div>
        <div class="form-group">
          <label for="gender-description">Mô tả</label>
          <input class="form-control" type="text" name="gender-description" id="gender-description"
            placeholder="Nhập mô tả" v-model="gender.description">
        </div>
        <p class="text-center cate-btn-form-add-close">
          <button class="btn btn-dark" @click="closeFormAddGender">
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
          <th scope="col">Tên giới tính</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Chỉnh sửa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gender, index) in genders" :key="gender._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ gender.name }}</td>
          <td>{{ gender.description }}</td>
          <td>
            <button class="cate-delete" @click="openModalDeleteGender(gender._id)">Xóa</button>
            <button class="ml-2 cate-update" @click="openModalUpdateGender(gender._id)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal-delete-gender -->
    <div v-if="isVisibleModalDeleteGender" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Xóa giới tính</h5>
            <button type="button" class="close" @click="closeModalDeleteGender">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa giới tính này?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalDeleteGender">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteOneGender">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal-update-gender -->
    <div v-if="isVisibleModalUpdateGender" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">Cập nhật thông tin giới tính</h5>
            <button type="button" class="close" @click="closeModalUpdateGender">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="gender-name">Tên giới tính</label>
              <input class="form-control" type="text" name="gender-name" id="gender-name" placeholder="Nhập giới tính"
                v-model="getOneGender.name">
            </div>
            <div class="form-group">
              <label for="gender-description">Mô tả</label>
              <input class="form-control" type="text" name="gender-description" id="gender-description"
                placeholder="Nhập mô tả" v-model="getOneGender.description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModalUpdateGender">Hủy</button>
            <button type="button" class="btn btn-success" @click="updateOneGender">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { showErrorToast, showSuccessToast } from '@/components/shared/Toast_Notification.vue';
import genderService from '@/services/gender.service';
export default {
  data() {
    return {
      genders: [],
      isVisibleModalDeleteGender: false,
      isVisibleModalUpdateGender: false,
      isVisibleFormAddGender: false,

      gender: {
        name: '',
        description: '',
      },
      getOneGender: {
        name: '',
        description: '',
      },
      gender_id: '',
    };
  },
  methods: {
    async fetchAllGenders() {
      this.genders = await genderService.getAll();
    },

    formAddGender() {
      this.isVisibleFormAddGender = true;
    },

    closeFormAddGender() {
      this.isVisibleFormAddGender = false;
    },

    async addGender() {
      try {
        const result = await genderService.create(this.gender);
        if (result) {
          showSuccessToast("Bạn đã thêm thành công giới tính");
          this.fetchAllGenders();
        }
      } catch {
        console.error("Lỗi không thêm được giới tính");
      }
    },

    openModalDeleteGender(id) {
      this.isVisibleModalDeleteGender = true;
      this.gender_id = id;
    },

    async openModalUpdateGender(id) {
      this.isVisibleModalUpdateGender = true;
      if (this.genders.length === 0) {
        await this.fetchAllGenders();
      }
      this.gender_id = id;
      this.getOneGender = await this.genders.find(gender => gender._id === id);
    },

    closeModalDeleteGender() {
      this.isVisibleModalDeleteGender = false;
      this.gender_id = null;
    },

    closeModalUpdateGender() {
      this.isVisibleModalUpdateGender = false;
      this.gender_id = null;
    },

    async deleteOneGender() {
      if (this.gender_id) {
        try {
          const message = await genderService.delete(this.gender_id);
          this.closeModalDeleteGender();
          showSuccessToast(message.message);
          await this.fetchAllGenders();
        } catch (error) {
          showErrorToast(error.response.data.message);
          console.error("Lỗi không xóa được giới tính");
        }
      }
    },

    async updateOneGender() {
      if (this.gender_id) {
        try {
          const message = await genderService.update(this.gender_id, this.getOneGender);
          this.closeModalUpdateGender();
          showSuccessToast(message.message);
          await this.fetchAllGenders();
        } catch {
          console.error("Lỗi không cập nhật được giới tính");
        }
      }
    }
  },

  mounted() {
    this.fetchAllGenders();
  }
}

</script>

<style>
.cate-gender {
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.cate-add-gender-btn {
  display: flex;
  border: 1px solid black;
  padding: 7px;
  border-radius: 5px;
}

.cate-add-gender-btn:hover {
  background-color: rgb(1, 92, 80);
  border: 1px solid rgb(0, 134, 121);
  padding: 7px;
  border-radius: 5px;
  color: white;
}

.cate-gender-form-add {
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

.cate-gender-btn-close {
  background-color: white;
  border: 1px solid black;
}

.cate-gender-btn-add {
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  color: white;
}

.cate-gender-btn-close:hover {
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  font-weight: bold;
}

.cate-gender-btn-add:hover {
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

.staff-gender-divider {
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>