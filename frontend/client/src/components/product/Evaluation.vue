<template>
    <h5><b>ĐÁNH GIÁ SẢN PHẨM</b></h5>
    <div class="pd-divider"></div>
    <div class="row mt-2">
        <template v-for="(eva, index) in evaluations" :key="eva._id">
            <template v-if="eva.incognito === false">
                <div class="col-2" v-if="index === 0">
                    <div class="pd-rate">
                        <h4 class="rate"> {{ avgEva.toFixed(1) }} /5

                        </h4>
                        <span class="font-weight-bold">
                            ({{ evaluations.length }} đánh giá)
                        </span>
                        <br>
                        <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= avgEva }">
                            ★
                        </span>

                    </div>
                </div>
                <div class="col-2" v-else="index !== 0">
                </div>
                <div class="col-10">
                    <div class="row mb-2">
                        <div class="col-1 pd-avatar">
                            <template v-for="u in allUsers" :key="_id">
                                <template v-if="u._id == eva.userId">
                                    <img v-if="u.image != ''"
                                        style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border:0.5px solid black;"
                                        :src="'http://localhost:3005/' + u.image" class="img-fluid" alt="">
                                    <img v-else src="/src/assets/image/homepage/user.png" class="img-fluid" alt="">
                                </template>
                            </template>
                        </div>
                        <div class="col-11">
                            <span class="pd-space">
                                <template v-for="u in allUsers" :key="_id">
                                    <template v-if="u._id == eva.userId">
                                        <span>
                                            <b>{{ u.username }}</b>
                                        </span>
                                    </template>
                                </template>

                                <span style="margin-right: 200px;">
                                    <template v-if="eva.like.includes(getUserId)">
                                        <i style="font-size: 25px; color: blue;" class="fa-solid fa-thumbs-up"
                                            @click="handleLike(eva._id)"></i> Hữu ích ({{ eva.like.length }})
                                    </template>
                                    <template v-else>
                                        <i style="font-size: 25px; color: gray;" class="fa-regular fa-thumbs-up"
                                            @click="handleLike(eva._id)"></i> Hữu ích ({{ eva.like.length }})
                                    </template>
                                </span>
                            </span>
                            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= eva.rate }">
                                ★
                            </span>
                            <h6 class="font-italic"> {{ eva.date }} | Phân loại hàng: <b>{{ eva.colorItemName }}</b>,
                                <b>{{ eva.sizeName }}</b>
                            </h6>
                            <span> {{ eva.content }}</span>
                            <div class="image-comment mt-2 ml-2 mb-4">
                                <h6 class="font-weight-bold">Ảnh</h6>
                                <template v-for="image in eva.images">
                                    <img style="width: 120px; height: 160px; object-fit: contain; border: 1px solid black; margin-right: 5px;"
                                        :src="'http://localhost:3005/' + image" alt="">
                                </template>
                            </div>

                        </div>

                    </div>
                </div>


            </template>

            <template v-if="eva.incognito === true">
                <div class="col-2" v-if="index === 0">
                    <div class="pd-rate">
                        <h4 class="rate"> {{ avgEva.toFixed(1) }}/5
                            <br>
                            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= avgEva }">
                                ★
                            </span>
                        </h4>

                    </div>
                </div>
                <div class="col-2" v-else="index !== 0">
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-1 pd-avatar">
                            <img src="/src/assets/image/homepage/user.png" class="img-fluid" alt="">
                        </div>
                        <div class="col-11">
                            <span class="pd-space">
                                <span>
                                    <b>Không tên</b>
                                </span>
                                <span style="margin-right: 200px;">
                                    <template v-if="eva.like.includes(getUserId)">
                                        <i style="font-size: 25px; color: blue;" class="fa-solid fa-thumbs-up"
                                            @click="handleLike(eva._id)"></i> Hữu ích ({{ eva.like.length }})
                                    </template>
                                    <template v-else>
                                        <i style="font-size: 25px; color: gray;" class="fa-regular fa-thumbs-up"
                                            @click="handleLike(eva._id)"></i> Hữu ích ({{ eva.like.length }})
                                    </template>
                                </span>
                            </span>
                            <span v-for="star in 5" :key="star" @click="rate(star)" class="star"
                                :class="{ filled: star <= eva.rate }">
                                ★
                            </span>
                            <h6 class="font-italic"> {{ eva.date }} | Phân loại hàng: <b>{{ eva.colorItemName }}</b>,
                                <b>{{ eva.sizeName }}</b>
                            </h6>
                            <span> {{ eva.content }}</span>
                            <div class="image-comment mt-2 ml-2 mb-4">
                                <h6 class="font-weight-bold">Ảnh</h6>
                                <template v-for="image in eva.images">
                                    <img style="width: 120px; height: 160px; object-fit: contain; border: 1px solid black; margin-right: 5px;"
                                        :src="'http://localhost:3005/' + image" alt="">
                                </template>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>

            </template>
        </template>
        <template v-if="evaluations.length === 0">
            <p class="font-weight-bold text-danger ml-4">Hiện tại chưa có đánh giá nào cho sản phẩm này</p>
        </template>
    </div>
</template>


<script>
import evaluationsService from '@/services/evaluations.service';
import userService from '@/services/user.service';
import Privacy_Policy from '@/views/footer/Privacy_Policy.vue';
import { isThisSecond } from 'date-fns';
import io from 'socket.io-client';
export default {
    props: {
        productId: {
            type: String,
            require: true,
        }
    },

    data() {
        return {
            evaluations: [],
            avgEva: 0.0,
            evaId: "",
            user: typeof (Object),
            allUsers: [],
        };
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    methods: {
        async fetchAllUser() {
            try {
                this.allUsers = await userService.getAllUsers();
                // alert(this.allUsers.length);
            } catch (error) {
                console.error(error);
            }

        },

        async fetchUser() {
            try {
                this.user = await userService.getId(this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchEvaluations() {
            try {
                this.evaluations = await evaluationsService.findEvaByProId(this.productId);
                let totalEva = 0.0;
                for (const eva of this.evaluations) {
                    totalEva = totalEva + Number(eva.rate);
                }
                this.avgEva = totalEva / this.evaluations.length;
                console.log(this.evaluations);
            } catch (error) {
                console.error(error);
            }
        },

        async btnLike(id) {

        },

        async handleLike(id) {
            this.evaId = id;
            // alert(this.evaId);
            try {
                const message = await evaluationsService.updateLike(this.getUserId, this.evaId);
                if (message) {
                    // alert("thành công");
                    await this.fetchEvaluations();
                }
            } catch (error) {
                console.error(error);
            }
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');
        socket.on('createEvaluation', async (data) => {
            console.log(data);
            await this.fetchAllUser();
            await this.fetchUser();
            await this.fetchEvaluations();
        });

    },

    async created() {
        await this.fetchAllUser();
        await this.fetchUser();
        await this.fetchEvaluations();
    }
}

</script>

<style>
.pd-rate {
    margin-left: 20px;
}

.rate {
    color: red;
    font-weight: bold;
}

.star {
    cursor: pointer;
    font-size: 24px;
    color: gray;
}

.star.filled {
    color: gold;
}

.pd-space {
    display: flex;
    justify-content: space-between;
}
</style>