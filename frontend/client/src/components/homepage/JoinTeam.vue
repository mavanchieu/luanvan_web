<template>
    <div class="jointeam mt-4">
        <span class="jt-space">
            <h4 class="jt-title">THAM GIA CHÚNG TÔI ĐỂ NHẬN NHIỀU ƯU ĐÃI</h4><span>
                <h5 class="jt-view-all">Xem tất cả</h5>
            </span>
        </span>
        <span class="jt-description">Bạn sẽ nhận nhiều ưu đãi với nhiều sản phẩm</span>
        <div class="row">
            <div class="jt-list">
                <div class="jt-image">
                    <div class="jt-image-price">
                        <img src="/src/assets/image/homepage/jt-jude-bellingham.png" alt="">
                    </div>
                    <h5 class="jt-name">Áo Khoát Nam</h5>
                    <h6 class="jt-brand">Nike</h6>
                    <h6 class="jt-buynow">MUA NGAY</h6>
                </div>
                <div class="jt-image">
                    <div class="jt-image-price">
                        <img src="/src/assets/image/homepage/jt-gird.png" alt="">
                    </div>
                    <h5 class="jt-name">Áo Thun Nữ</h5>
                    <h6 class="jt-brand">Nike</h6>
                    <h6 class="jt-buynow">MUA NGAY</h6>
                </div>
                <div class="jt-image">
                    <div class="jt-image-price">
                        <img src="/src/assets/image/homepage/jt-sneaker.png" alt="">
                    </div>
                    <h5 class="jt-name">Giày Nam</h5>
                    <h6 class="jt-brand">Nike</h6>
                    <h6 class="jt-buynow">MUA NGAY</h6>
                </div>
                <div class="jt-image">
                    <div class="jt-image-price">
                        <img src="/src/assets/image/homepage/jt-mono.png" alt="">
                    </div>
                    <h5 class="jt-name">Áo Thun Nam</h5>
                    <h6 class="jt-brand">Adidas</h6>
                    <h6 class="jt-buynow">MUA NGAY</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.jointeam {
    max-width: 100%;
    font-family: 'Courier New', Courier, monospace;
}

.jt-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.jt-title {
    padding-left: 50px;
    font-weight: bold;
}

.jt-description {
    padding-left: 50px;

}


.jt-view-all {
    padding-right: 50px;
    font-weight: bold;
    color: rgb(95, 92, 92);
}

.jt-view-all:hover {
    padding-right: 50px;
    font-weight: bold;
    color: rgb(0, 0, 0);
}

.jt-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
}

.jt-image {
    margin: 0 auto;
    width: 280px;
    height: 450px;
    margin-top: 15px;
    margin-left: 20px;
    object-fit: contain;
}

.jt-image-price {
    position: relative;

}

.jt-image div img {
    margin: 0 auto;
    width: 278px;
    height: 360px;
}

.jt-price {
    position: absolute;
    bottom: 7px;
    left: 20px;
    background-color: rgb(120, 120, 120);
    color: white;
    padding: 2px;
}


.jt-icon-heart {
    position: absolute;
    top: 10px;
    right: 10px;
}

.jt-name {
    margin-top: 5px;
    font-weight: bold;
}

.jt-brand {
    color: gray;
}

.jt-image:hover .jt-price {
    bottom: 15px;
}

.jt-image:hover {
    border: 1px solid black;
}


.jt-name,
.jt-brand {
    margin-left: 20px;
}

.jt-buynow {
    margin-top: 10px;
    margin-left: 20px;
    font-weight: bold;
}

.jt-buynow:hover {
    cursor: pointer;
    color: rgb(0, 79, 79);
}
</style>