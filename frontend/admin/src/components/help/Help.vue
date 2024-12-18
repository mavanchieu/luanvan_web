<template>
    <div class="help">
        <h5 class="mb-4"><b>DANH SÁCH CÁC CÂU HỎI CỦA NGƯỜI DÙNG</b></h5>
        <template v-for="q in questions" :key="q._id">
            <div class="row mb-4">
                <div class="col-4 border">
                    <span class="help-space">
                        <span style="color: grey;"><b>Họ và tên</b></span>
                        <span> {{ q.fullname }}</span>
                    </span>

                    <span class="help-space">
                        <span style="color: grey;"><b>Số điện thoại</b></span>
                        <span>{{ q.phone }}</span>
                    </span>

                    <span class="help-space">
                        <span style="color: grey;"><b>Email</b></span>
                        <span> {{ q.email }}</span>
                    </span>

                    <span>
                        <span style="color: grey;">
                            <b>Câu hỏi</b>
                        </span>
                        <br>
                        <span class="ml-4">
                            {{ q.question }}
                        </span>
                    </span>
                </div>
                <div class="col-4">
                    <!-- <button class="icon-reply " @click="btnReply"v-if="selected === false"><i class="fa-solid fa-reply" style="color: #74C0FC; font-size: 35px;"></i></button> -->
                    <div v-if="q.reply.answer == ''" class="reply">
                        <textarea name="" id="" rows="3" class="form-control" placeholder="Trả lời"
                            v-model="answer[q._id]"></textarea>
                    </div>
                    <span v-if="q.reply.answer != ''">
                        <h6>Trả lời: {{ q.reply.answer }}</h6>
                    </span>
                    <span class="d-flex-right mt-2" v-else :key="q._id">
                        <button class=" btn btn-close-reply btn-dark" @click="btnReply">Hủy</button>
                        <button class=" btn btn-reply btn-success ml-2" @click="reply(q._id)">
                            Gửi
                        </button>
                    </span>
                </div>
                <div class="col-4" v-if="q.reply.answer != ''">
                    <div class="row profile-user ">
                        <div class="col-4 mt-2">
                            <template v-for="user in users" :key="_id ">
                                <template v-if="q.reply.userIdReply == user._id">
                                    <div>
                                        <img v-if="user.image !== ''"
                                            style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border: 0.5px solid black;"
                                            :src="'http://localhost:3005/' + user.image" alt="">
                                        <img v-else
                                            style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border: 0.5px solid black;"
                                            src="/src/assets/user.png" alt="">
                                    </div>
                                </template>
                            </template>
                        </div>
                        <div class="col-8 detail text-white mt-2">
                            <template v-for="user in users" :key="_id ">
                                <template v-if="q.reply.userIdReply == user._id">
                                    <span>{{ user.username }}</span>
                                    <br>
                                    <span>{{ user.fullname }}</span>
                                    <br>
                                    <span>{{ user.phone }}</span>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>profile-user

<script>
import helpService from '@/services/help.service';
import userService from '@/services/user.service';
import { showSuccessToast } from '../shared/Toast_Notification.vue';

export default {
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            questions: [],
            selected: false,
            userIdReply: "",
            answer: {},
            users: [],
        }
    },

    methods: {
        async fetchQuestions() {
            try {
                this.questions = await helpService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        btnReply() {
            this.selected = !this.selected;
        },

        async reply(id) {
            this.userIdReply = this.getUserId;
            const answer = this.answer[id];
            const payload =
            {
                'userIdReply': this.userIdReply,
                'answer': answer,
            };
            try {
                const message = await helpService.reply(id, payload);
                if (message) {
                    showSuccessToast("Bạn đã trả lời câu hỏi");
                    await this.fetchQuestions();
                }
            } catch (error) {
                console.error(error);
            }
        },

        async fetchUsers() {
            try {
                this.users = await userService.getAll();
            } catch (error) {
                console.error(error);
            }
        }
    },

    mounted() {
        this.fetchQuestions();
        this.fetchUsers();
    }

}

</script>

<style scoped>
.help {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.help-space {
    display: flex;
    justify-content: space-between;
}

.icon-reply {
    background: transparent;
    border: none;
    all: unset;
}

.d-flex-right {
    display: flex;
    justify-content: end;
}

.profile-user {
    height: 150px;
    width: 100%;
    background: rgb(78, 77, 78);
    background: radial-gradient(circle, rgba(78, 77, 78, 1) 1%, rgba(37, 41, 46, 1) 95%);
    /* display: flex;
    justify-content: space-between; */
}

/* .detail{
    background-color: black;
} */
</style>