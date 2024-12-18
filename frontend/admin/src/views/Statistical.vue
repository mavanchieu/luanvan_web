<template> 
    <Statistical />
    <Inventory />
</template>

<script>

import Inventory from "@/components/statistical/Inventory.vue";
import Statistical from "@/components/statistical/Statistical.vue";

export default {
    components: {
        Statistical,
        Inventory
    }
}
</script>

<style scoped>

</style>