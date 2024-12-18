<template>
    <div class="help">
        <div class="" v-if="selected === true">
            <form action="" class="form question-form border p-4" @submit.prevent="addQuestion">
                <h5 class="text-center"> <span style="border-bottom: 1px solid black;">Điền Thông Tin</span></h5>
                <div class="form-group">
                    <label for="fullname"><b>Họ Và Tên</b></label>
                    <input type="text" id="fullname" placeholder="Vui lòng nhập họ và tên" class="form-control"
                        v-model="content.fullname">
                </div>
                <div class="form-group">
                    <label for="phone"><b>Số điện thoại</b></label>
                    <input type="text" id="phone" placeholder="Vui lòng nhập số điện thoại" class="form-control"
                        v-model="content.phone">
                </div>
                <div class="form-group">
                    <label for="email"><b>Email</b></label>
                    <input type="text" id="email" placeholder="Vui lòng nhập email liên hệ" class="form-control"
                        v-model="content.email">
                </div>
                <div class="form-group">
                    <label for="question"><b>Câu hỏi?</b></label>
                    <textarea name="" id="question" rows="3" class="form-control" v-model="content.question"></textarea>
                </div>
                <span class="d-flex-right">
                    <button class="btn btn-sent-question btn-dark mr-2" @click="openQuestionForm">Hủy</button>
                    <button class="btn btn-sent-question btn-success" type="submit">Gửi</button>
                </span>
            </form>
        </div>
        <span class="help-space">
            <span class="font-weight-bold question">Các câu hỏi bạn đã hỏi</span>
            <span><button class="add-question" @click="openQuestionForm"><span class="p-4">Thêm câu
                        hỏi</span></button></span>
        </span>

        <template v-if="questions.length != 0">
            <template v-for="(q, index) in questions" :key="q._id">
                <span>
                    <span class="text-primary font-weight-bold">Câu {{ index + 1 }}:</span> <b>{{ q.question }} ?</b>
                    <br>
                    <span class="ml-4 font-italic"> <span>Trả lời: </span>{{ q.reply.answer }}</span>
                </span>
                <br>
            </template>
        </template>
        <template v-if="questions.length === 0">
            <h5 class="text-center mt-4">Hiện tại bạn không có câu hỏi nào</h5>
        </template>
        <br>
        <span class="ml-4"></span>
    </div>
</template>

<script>
import helpService from '@/services/help.service';
import { showSuccessToast } from '../shared/Toast.vue';


export default {
    computed: {
        getUserId() {
            return localStorage.getItem('userId');
        }
    },

    data() {
        return {
            selected: false,
            content: {
                userId: "",
                phone: "",
                fullname: "",
                email: "",
                question: "",
                reply: {
                    userIdReply: "",
                    answer: "",
                },
            },

            questions: [],
        }
    },
    methods: {
        openQuestionForm() {
            this.selected = !this.selected;
        },

        async addQuestion() {
            try {
                this.content.reply = "";
                this.content.userId = this.getUserId;
                const message = await helpService.create(this.content);
                if (message) {
                    showSuccessToast("Bạn đã đặt câu hỏi thành công");
                    this.selected = false;
                    this.fetchQuestions();
                }
            } catch (error) {
                console.error(error);
            }
        },

        async fetchQuestions() {
            try {
                this.questions = await helpService.getByUserId(this.getUserId);

                console.log(this.questions);
            } catch (error) {
                console.error(error);
            }
        },
    },

    async mounted() {
        await this.fetchQuestions();
    }
}

</script>

<style scoped>
.help {
    width: 70%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 20px;
}

.help .question {
    font-size: 22px;
}

.question-form {
    margin: 0 auto;
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.add-question {
    all: unset;
    background: transparent;
    border: 0.5px solid black;
}

.help-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.d-flex-right {
    display: flex;
    justify-content: end;
}
</style>