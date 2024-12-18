<template>

    <div class="search-history" v-if="searchList.length != 0">
        <p class="search-delete-all">
            <button class="search-btn-delete-all" data-toggle="modal" data-target="#search-btn-delete-all">Xóa Tất
                Cả</button>
        </p>
        <div class="row">
            <div class="col-6">
                <div v-for="search in searchList" :key="search._id">
                    <p class="search-history-space">
                        <button class="btn btn-search" @click="searchName(search.searchName)">{{ search.searchName
                            }}</button>
                        <span><button class="search-history-btn" data-toggle="modal"
                                data-target="#search-history-delete" @click="searchId(search._id)"><i
                                    class="fa-solid fa-xmark" style="padding-top: 3px;"></i></button></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="mt-4">
        <h5 class="text-center font-weight-bold">Bạn Không Có Lịch Sử Tìm Kiếm Nào!</h5>
    </div>




    <!-- Modal -->
    <div class="modal" tabindex="-1" id="search-btn-delete-all">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold">Xóa lịch sử tìm kiếm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-center">Bạn có chắc chắn xóa Tất cả lịch sử tìm kiếm?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary search-btn-delete-all-no"
                        data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary search-btn-delete-all-yes"
                        @click="deleteAllSearchNames">Đồng ý</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" id="search-history-delete" @click.seft="closeModalDeleteSearch">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold">Xóa lịch sử tìm kiếm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-center">Bạn có chắc chắn xóa tên tìm kiếm này?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary search-btn-no" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary search-btn-yes" @click="deleteSearchName">Đồng
                        ý</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchService from '@/services/search.service';
import $ from 'jquery';
import { error } from 'jquery';
import io from 'socket.io-client';
export default {
    data() {
        return {
            isVisibleModalDeleteSearch: false,
            search_id: '',
            searchList: typeof (Object),
        };
    },
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },
    methods: {

        searchId(id) {
            this.search_id = id;
        },

        searchName(name) {
            this.$router.push({ name: 'search', query: { search: name } });
        },

        async deleteSearchName() {
            if (this.search_id) {
                try {
                    const message = await searchService.delete(this.search_id);
                    alert(message.message);
                    this.fetchSearchList();
                    $('#search-history-delete').modal('hide');
                } catch {
                    error(error);
                }
            }
        },

        async deleteAllSearchNames() {
            try {
                const message = await searchService.deleteAll(this.getUserId);
                alert(message.message);
                this.fetchSearchList();
                $('#search-btn-delete-all').modal('hide');
            } catch {
                error(error);
            }
        },

        async fetchSearchList() {
            try {
                this.searchList = await searchService.getAll();
                this.searchList = this.searchList.filter(search => search.userId === this.getUserId);
            } catch {
                error(error);
            }
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');

        socket.on('createSearch', async (data) => {
            console.log(data);
            await this.fetchSearchList();
        });
        socket.on('deleteOneSearchName', async (data) => {
            console.log(data);
            await this.fetchSearchList();
        });
        socket.on('deleteAllSearchName', async (data) => {
            console.log(data);
            await this.fetchSearchList();
        });
    },

    async created() {
        await this.fetchSearchList();
    }
}
</script>

<style>
.search-history-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-history-btn {
    background-color: white;
    border: none;
}

.search-btn-no,
.search-btn-delete-all-no {
    background-color: white;
    border: 0.5px solid black;
    color: black;
}

.router-link-search {
    color: black;
}

.router-link-search:hover {
    color: black;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
}

.search-btn-yes,
.search-btn-delete-all-yes {
    background-color: rgb(0, 0, 0);
    border: 0.5px solid black;
    color: rgb(255, 255, 255);
}

.search-btn-yes:hover,
.search-btn-delete-all-yes:hover {
    background-color: rgb(255, 255, 255);
    border: 0.5px solid black;
    color: rgb(0, 0, 0);
}

.search-delete-all {
    display: flex;
    justify-content: end;
}

.search-btn-delete-all {
    background-color: white;
    border: 1px solid rgb(255, 255, 255);
}

.search-btn-delete-all:hover {
    background-color: white;
    border: 1px solid black;
}

.btn-search {
    all: unset;
    background: transparent;
}
</style>