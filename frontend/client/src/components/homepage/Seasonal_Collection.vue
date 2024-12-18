<template>
    <div class="collection">
        <h4 class="coll-title">BỘ SƯU TẬP THEO MÙA</h4>
        <div class="row-container mt-4">
            <div class="container-coll" v-for="s in seasonalCollections" :key="s._id">
                <div class="container-coll-image">
                    <img :src="'http://localhost:3005/' + s.images[currentImageIndex[s._id] || 0]"
                        alt="Seasonal Collection">
                    <div class="text-overlay">
                        <p class="main-text"> {{ s.collectionName }}</p>
                    </div>
                    <div class="explore-button">
                        <button class="btn btn-explore">
                            <span>
                                <router-link :to="{ name: 'seasonal_collection', params: { 'id': s._id } }"
                                    style="all: unset;">Khám phá</router-link>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import collectionService from '@/services/collection.service';
import brandService from '@/services/brand.service';

export default {
    data() {
        return {
            seasonalCollections: [],
            brands: [],
            currentImageIndex: {}, // Lưu chỉ số ảnh hiện tại
        };
    },

    methods: {
        async fetchSeasonalCollections() {
            try {
                this.seasonalCollections = await collectionService.getAllSeasonalCollection();
                console.log(this.seasonalCollections);

                // Khởi tạo chỉ số ảnh cho mỗi bộ sưu tập
                this.seasonalCollections.forEach(s => {
                    if (s.images.length > 1) {
                        this.currentImageIndex[s._id] = 0;
                        this.startImageRotation(s._id, s.images.length);
                    }
                });
            } catch (error) {
                console.error('Error fetching seasonal collections:', error);
            }
        },

        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },

        startImageRotation(collectionId, imageCount) {
            setInterval(() => {
                // Cập nhật chỉ số ảnh hiện tại
                this.currentImageIndex[collectionId] =
                    (this.currentImageIndex[collectionId] + 1) % imageCount;
            }, 1000);
        },
    },

    async mounted() {
        await this.fetchBrands();
        await this.fetchSeasonalCollections();
    },
};
</script>

<style>
.collection {
    font-family: 'Courier New', Courier, monospace;
    width: 100%;
}

.coll-title {
    padding-left: 50px;
    padding-top: 30px;
    font-weight: bold;
}

.row-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 1200px;
    margin: auto;
}

.container-coll {
    flex: 1 1 calc(33.33% - 20px);
    max-width: calc(33.33% - 20px);
    box-sizing: border-box;
}

.container-coll-image {
    height: 400px;
    width: 100%;
    position: relative;
}

.container-coll-image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.text-overlay {
    position: absolute;
    bottom: 80px;
    left: 20px;
    color: white;
    font-size: 27px;
    font-weight: 900;
}

.explore-button {
    position: absolute;
    bottom: 30px;
    left: 20px;
    background-color: white;
    border-radius: 20px;
}

.btn-explore:hover {
    color: #ffffff;
    background-color: #000000;
}

.explore-button button span:hover {
    color: white;
}
</style>
