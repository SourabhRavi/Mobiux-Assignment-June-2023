<template>
    <div class="scroll-wrap">
        <BarChart />
    </div>
</template>

<script setup lang="ts">
import BarChart from '@/views/BarChart.vue';

</script>
  
<style scoped>
.header-table {
    padding: 10px 16px;
    @apply bg-cyan-950 rounded-lg text-white;
}

.header-table,
.body-table {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px
}
</style>
  