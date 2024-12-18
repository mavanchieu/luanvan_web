<template>
    <div class="explore mt-4">
        <h4 class="ex-title">KHÁM PHÁ</h4>
        <div class="ex-container">
            <div class="ex-image-row">
                <img class="ex-image-item" src="/src/assets/image/homepage/vinicius.png" alt="">
                <img class="ex-image-item" src="/src/assets/image/homepage/air_max.jpg" alt="">
                <img class="ex-image-item" src="/src/assets/image/homepage/bst_nike.png" alt="">
            </div>
        </div>
    </div>
</template>
<style>
.explore {
    max-width: 100%;
    font-family: 'Courier New', Courier, monospace;
}

.ex-title {
    padding-left: 50px;
    font-weight: bold;
}

.ex-container {
    display: flex;
    justify-content: center;
}

.ex-image-row {
    display: flex;
    gap: 20px;
}

.ex-image-item {
    width: 400px;
    height: 450px;
    object-fit: contain;
}
</style>