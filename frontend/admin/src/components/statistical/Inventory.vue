<template>
    <div class="divider">
    </div>
    <div class="inventory">
        <p>
        <h5 class="font-weight-bold"> THỐNG KÊ HÀNG TỒN KHO</h5>
        </p>
        <div class="row">
            <div class="col-4">
                <p class="text-danger font-weight-bold">Sản phẩm còn nhiều</p>
                <p class="space"><span>Áo thun nike</span> <span class="count">200</span></p>
            </div>
            <div class="col-4">
                <p class="font-weight-bold">Sản phẩm gần hết hàng</p>
                <p class="space"><span>Áo thun nike</span> <span class="count">200</span></p>
            </div>
            <div class="col-4">
                <p class="font-weight-bold">Lọc</p>
                <p class="space-end"> <input type="number" name="" id="" placeholder="Nhập số lượng"></p>
                <p class="space-end"> <button class="btn btn-dark">></button>
                    <button class="btn btn-dark ml-2">
                    </button>
                </p>
                <p class="space"><span>Áo thun nike</span> <span class="count">200</span></p>
            </div>
        </div>
    </div>
</template>

<style>
.divider {
    border: 0.5px solid black;
    margin: 10px;
}

.inventory {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.space {
    display: flex;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 10px;
}

.space-end {
    display: flex;
    justify-content: end;
    padding-right: 40px;
    padding-left: 10px;
}

.count {
    color: rgb(0, 114, 83);
    font-weight: bold;
}

input {
    border: 0.5px solid black;
    border-radius: 10px;
    height: 30px;
    padding-right: 40px;
}
</style>