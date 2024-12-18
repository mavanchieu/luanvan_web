<template>
    <div class="question">
        <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Bao lâu thì tôi mới có thể nhận được đơn hàng?
                    </button>
                </h2>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    Đơn hàng của bạn sẽ được lưu trong mục quản lý đơn hàng. Bạn có thể xem ngày nhận hàng ngay tại đơn hàng đó
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Tôi có thể trả lại đơn hàng khi nào?
                    </button>
                </h2>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                    Với các sản phẩm lỗi, bạn có thể trả lại đơn hàng thông qua việc vận chuyển, chi phí bạn sẽ chịu trách nhiệm. Xem chi tiết tại <a href="">Chính sách trao đổi hàng</a>
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Tôi muốn biết thông tin cá nhân của mình được bảo mật như thế nào?
                    </button>
                </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div class="card-body">
                    Thông tin cá nhân của bạn sẽ được lưu trữ an toàn nhất. Xem chi tiết <a href="">Chính sách bảo mật khách hàng</a>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.question{
    font-family: 'Courier New', Courier, monospace;
    width: 60%;
    padding-top: 10px;
    margin: 0 auto;
}

.btn-link{
    color: black;
}

.btn-link:hover{
    text-decoration: none;
    color: black;
    font-weight: bold;
}

</style>