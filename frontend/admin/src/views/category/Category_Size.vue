<template>
    <div class="cate-size">
        <p class="cate-size-space-border">
            <span class="font-weight-bold cate-size-title">CHI TIẾT CÁC BẢNG SIZE</span>
        </p>
        <div class="content-type-details">
            <span v-for="gender in genders" :key="gender._id">
                <button style="width: 150px;" class="ml-4 btn content-type-details-btn-name"
                    @click="onChangeGender(gender._id)">
                    {{ gender.name }}
                </button>
            </span>
            <br>
            <br>

            <span class="mt-4" v-for="sizes in allSizes" :key="sizes._id">
                <button class="ml-4 mb-2 btn content-type-details-btn-name" @click="selectSizeName(sizes)">
                    {{ sizes.name }}
                </button>
            </span>

            <!-- Show all -->
            <div class="row">
                <div class="col-12">
                    <template v-for="sizes in allSizes" :key="sizes._id">
                        <p class="cate-size-space">
                            <span class="mt-4 content-type-details-title">
                                {{ sizes.name }}
                                <!-- {{ sizes.typeId}} -->
                            </span>
                            <span>
                                <button class="btn cate-size-btn-add" data-toggle="modal" data-target="#modalAddSize"
                                    @click="btnAddSize(sizes)">Thêm</button>
                            </span>
                        </p>
                        <table class="table" :ref="sizes._id">
                            <thead class="thead" v-if="sizes.sizeDetails.length !== 0">
                                <tr>
                                    <th scope="col" class="">Thông số</th>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <th>
                                            <div>
                                                <div class="dropdown mr-1">
                                                    <button type="button" class="dropdown-toggle"
                                                        data-toggle="dropdown">
                                                        <span class="font-weight-bold">{{ size.name }}</span>
                                                    </button>
                                                    <div class="dropdown-menu">
                                                        <button class="btn-delete-size" data-toggle="modal"
                                                            data-target="#deleteSizeModal"
                                                            @click="btnDeleteSize(size._id)">Xóa</button>
                                                        <br>
                                                        <button class="btn-update-size mt-2" data-toggle="modal"
                                                            data-target="#updateSizeModal"
                                                            @click="btnUpdateSize(size)">Cập nhật</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    </template>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="sizes.sizeDetails.some(size => size.chestFrom)">
                                    <td>Rộng ngực</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.chestFrom + "-" + size.chestTo +
                                            "cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.shoulderFrom)">
                                    <td>Ngang vai</td>
                                    <template v-if="sizes.sizeDetails.some(size => size.shoulderFrom)"
                                        v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.shoulderFrom + "-" + size.shoulderTo
                                            + " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.heightFrom)">
                                    <td>Dài áo</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.heightFrom + "-" + size.heightTo +
                                            " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.sleevedFrom)">
                                    <td>Dài tay</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.sleevedFrom + "-" + size.sleevedTo +
                                            " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.longPantsFrom)">
                                    <td>Dài quần</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.longPantsFrom + "-" +
                                            size.longPantsTo + " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.wideWaistFrom)">
                                    <td>Rộng eo</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.wideWaistFrom + "-" +
                                            size.wideWaistTo + " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.widePipeFrom)">
                                    <td>Rộng ống</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.widePipeFrom + "-" + size.widePipeTo
                                            + " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.longLegsFrom)">
                                    <td>Dài chân</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.longLegsFrom + "-" + size.longLegsTo
                                            + " cm" }}</td>
                                    </template>
                                </tr>
                                <tr v-if="sizes.sizeDetails.some(size => size.wideLegsFrom)">
                                    <td>Rộng chân</td>
                                    <template v-for="size in sizes.sizeDetails" :key="size._id">
                                        <td scope="col" class="text-center">{{ size.wideLegsFrom + "-" + size.wideLegsTo
                                            + " cm" }}</td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                        <div class="cate-size-divider">
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- Modal Thêm Size -->
        <div class="modal fade" id="modalAddSize" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Thêm Size Cho <span
                                class="title-modal">{{ typeDetail.name }}</span></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h6 class="text-center font-weight-bold">Điền Thông Tin</h6>
                        <form class="form" action="">
                            <div class="form-group">
                                <label for="name">Chọn Size</label>
                                <select class="ml-4" name="name" id="name" v-model="size.name"
                                    v-if="chossen == 1 || chossen == 2">
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                                <select class="ml-4" name="name" id="name" v-model="size.name"
                                    v-if="chossen == 3 || chossen == 4">
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <h6 class="text-primary font-weight-bold">Thông số chi tiết</h6>
                            </div>
                            <div v-if="chossen == 1">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4 cate-size-space">
                                                <span class="ml-2">Rộng ngực</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.chestFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.chestTo" />
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4  cate-size-space">
                                                <span class="ml-2">Ngang vai</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.shoulderFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.shoulderTo" />
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4 cate-size-space">
                                                <span class="ml-2">Dài tay</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.sleevedFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.sleevedTo" />
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4 cate-size-space">
                                                <span class="ml-2">Dài áo</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.heightFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.heightTo" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="chossen == 2">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4 cate-size-space">
                                                <span class="ml-2">Dài quần</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.longPantsFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.longPantsTo" />
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4  cate-size-space">
                                                <span class="ml-2">Rộng eo</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.wideWaistFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.wideWaistTo" />
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4 cate-size-space">
                                                <span class="ml-2">Rộng ống</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.widePipeFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.widePipeTo" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="chossen == 3 || chossen == 4">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4 cate-size-space">
                                                <span class="ml-2">Dài chân</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.longLegsFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.longLegsTo" />
                                        </span>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <div class="cate-size-space-input">
                                            <span class="ml-4  cate-size-space">
                                                <span class="ml-2">Rộng chân</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <span class="cate-size-space">
                                            <input style="width: 130px;" type="number" placeholder="Từ"
                                                v-model="size.wideLegsFrom" />
                                            <input style="width: 130px;" type="number" placeholder="Đến"
                                                v-model="size.wideLegsTo" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn btn-primary" @click="addSize">Thêm</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Xóa 1 size -->
        <div class="modal fade" id="deleteSizeModal" tabindex="-1" aria-labelledby="deleteSizeModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <h5 class="text-center font-weight-bold">Bạn có chắn chắn xóa size này không?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-delete-size-no" data-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn-delete-size-yes" @click="deleteSize()">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cập nhật size -->
        <div class="modal fade" id="updateSizeModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title font-weight-bold" id="staticBackdropLabel">Cập nhật size</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="form" action="">
                            <div class="form-group">
                                <h6 class="text-primary font-weight-bold">Thông số chi tiết</h6>
                            </div>
                            <div v-if="updateSize.chestFrom != null" class="row">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Ngực</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.chestFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.chestTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.sleevedFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Dài tay</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.sleevedFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.sleevedTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.shoulderFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Ngang vai</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.shoulderFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.shoulderTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.heightFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Dài áo</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.heightFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.heightTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.widePipeFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Rộng ống</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.widePipeFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.widePipeTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.longPantsFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Dài quần</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.longPantsFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.longPantsTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.wideWaistFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Rộng eo</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.wideWaistFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.wideWaistTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.longLegsFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Dài quần</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.longLegsFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.longLegsTo" />
                                    </span>
                                </div>
                            </div>
                            <div v-if="updateSize.wideLegsFrom != null" class="row mt-4">
                                <div class="col-4">
                                    <div class="cate-size-space-input">
                                        <span class="ml-4 cate-size-space">
                                            <span class="ml-2">Rộng eo</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <span class="cate-size-space">
                                        <input style="width: 130px;" type="number" placeholder="Từ"
                                            v-model="updateSize.wideLegsFrom" />
                                        <input style="width: 130px;" type="number" placeholder="Đến"
                                            v-model="updateSize.wideLegsTo" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-delete-size-no" data-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn-delete-size-yes" @click="agreeUpdateSize">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import type_detailService from '@/services/type_detail.service';
import sizeService from '@/services/size.service';
import { error } from 'jquery';
import $ from 'jquery';
import genderService from '@/services/gender.service';
import typeService from '@/services/type.service';
import { type } from 'jquery';
import { showSuccessToast } from '@/components/shared/Toast_Notification.vue';


export default {
    data() {
        return {
            typeDetails: [],
            index: 0,

            // Tất cả size thuộc các typedetails
            allSizes: [],

            // Biến lưu trữ hiển thị
            selected: 0,

            // Truyền dữ liệu cho modal 1 typedetail
            typeDetail: typeof (Object),

            fetchOneSize: typeof (Object),

            size: {
                name: "",
                typeDetailId: "",
                chestFrom: "",
                chestTo: "",
                sleevedFrom: "",
                sleevedTo: "",
                shoulderFrom: "",
                shoulderTo: "",
                heightFrom: "",
                heightTo: "",
                longPantsFrom: "", // Dài quần 
                longPantsTo: "",

                wideWaistFrom: "", // Rộng eo
                wideWaistTo: "",

                widePipeFrom: "",
                widePipeTo: "",

                longLegsFrom: "",
                longLegsTo: "",

                wideLegsFrom: "",
                wideLegsTo: "",
            },


            // Id để xóa size
            sizeId: "",

            // Size update:
            updateSize: typeof (Object),

            genders: [],

            types: [],

            chossen: 0,

            genderId: "",
        };
    },

    methods: {
        async fetchAllTypeDetails() {
            try {
                this.typeDetails = await type_detailService.getAll();
                console.log(this.typeDetails);
            } catch {
                error(error);
            }
        },

        async fetchAllTypes() {
            try {
                this.types = await typeService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchAllSizes() {
            try {
                this.allSizes = await sizeService.getAll();
                this.allSizes.sort((a, b) => a.name.localeCompare(b.name));
            } catch {
                error(error);
            }
        },

        async fetchGenders() {
            try {
                this.genders = await genderService.getAll();
            } catch {
                error(error);
            }
        },

        async onChangeGender(genderId) {
            await this.fetchAllSizes();
            this.allSizes = this.allSizes.filter(size => size.genderId === genderId);
            this.genderId = genderId;
        },



        selectSizeName(size) {
            this.selected = 1; // Cập nhật trạng thái đã chọn
            this.$nextTick(() => {
                const element = this.$refs[size._id];
                if (element && element.length > 0) {
                    const yOffset = -100;
                    const y = element[0].getBoundingClientRect().top + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        },

        btnAddSize(typeDetail) {
            const typeName = this.types.find(type => type._id == typeDetail.typeId);
            if (typeName.name == "Áo") {
                this.chossen = 1;
            }
            if (typeName.name == "Quần") {
                this.chossen = 2;
            }
            if (typeName.name == "Giày") {
                this.chossen = 3;
            }
            if (typeName.name == "Dép") {
                this.chossen = 4;
            }
            this.size.typeDetailId = typeDetail._id;
        },

        async addSize() {
            // this.size.typeDetailId = this.typeDetail._id;
            try {
                const message = await sizeService.create(this.size);
                if (message) {
                    showSuccessToast("Bạn đã thêm size thành công!");
                    $('#modalAddSize').modal('hide');

                    await this.fetchAllTypeDetails();
                    await this.fetchAllSizes();
                    await this.fetchAllTypes();
                    // window.location.reload();
                    await this.onChangeGender(this.genderId);
                    this.size = {};

                }
            } catch {
                error(error);
            }
        },

        btnDeleteSize(id) {
            this.sizeId = id;
        },

        async deleteSize() {
            try {
                const message = await sizeService.delete(this.sizeId);
                if (message) {
                    showSuccessToast(message.message);
                    $('#deleteSizeModal').modal('hide');
                    await this.fetchAllTypeDetails();
                    await this.fetchAllSizes();
                    await this.fetchAllTypes();
                    // window.location.reload();
                    await this.onChangeGender(this.genderId);
                }
            } catch {
                error(error);
            }
        },

        btnUpdateSize(size) {
            this.updateSize = size;
            console.log(size);
        },

        async agreeUpdateSize() {
            try {
                const message = await sizeService.update(this.updateSize._id, this.updateSize);
                if (message) {
                    showSuccessToast(message.message);
                    $('#updateSizeModal').modal('hide');
                    await this.fetchAllTypeDetails();
                    await this.fetchAllSizes();
                    await this.fetchAllTypes();
                    // window.location.reload();
                    await this.onChangeGender(this.genderId);
                }
            } catch (error) {
                console(error);
            }
        }
    },

    async mounted() {
        await this.fetchGenders();
        await this.fetchAllTypeDetails();
        await this.fetchAllSizes();
        await this.fetchAllTypes();
        if (this.genders.length > 0) {
            this.allSizes = this.allSizes.filter(size => size.genderId === this.genders[0]._id);
            console.log(this.genders[0]._id);
            this.genderId = this.genders[0]._id;
        }
        this.index = 0;
    },
}

</script>

<style scoped>
.cate-size {
    font-family: 'Courier New', Courier, monospace;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
}


.cate-size-title {
    font-size: 20px;
}

.cate-size-space-border {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 5px 5px rgb(32, 70, 52);
    padding: 10px;
}

.cate-size-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cate-size-space-input {
    display: flex;
    justify-content: start;
}

.cate-size-btn-view-all {
    background-color: rgb(255, 255, 255);
    color: black;
}

.content-type-details-title {
    font-size: 20px;
    color: rgb(232, 0, 178);
    font-weight: bold;
}

.cate-size-btn-add {
    background-color: pink;
    color: black;
}

.cate-size-btn-add:hover {
    background-color: rgb(160, 22, 45);
    color: white;
}

.table thead {
    background-color: rgb(220, 220, 220);
    color: black;
}

.title-modal {
    color: blue;
}

.content-type-details-btn-name {
    background-color: white;
    color: black;
    border: 1px solid black;
}

.content-type-details-btn-name:hover {
    background-color: rgb(75, 75, 75);
    color: rgb(255, 255, 255);
    border: 1px solid black;
}

.dropdown,
.dropdown-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropdown-toggle {
    border: 0.5px solid black;
}

.btn-delete-size,
.btn-update-size {
    border: none;
    background-color: white;
}

.btn-delete-size:hover,
.btn-update-size:hover {
    border: none;
    color: white;
    background-color: rgb(0, 0, 0);
}

.btn-delete-size-no,
.btn-delete-size-yes {
    border: 1px solid black;
    background-color: white;
}

.btn-delete-size-no:hover,
.btn-delete-size-yes:hover {
    border: 1px solid rgb(0, 0, 0);
    background-color: rgb(0, 0, 0);
    color: white;
}

.cate-size-divider {
    border: 1px solid black;
}
</style>