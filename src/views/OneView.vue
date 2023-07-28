<template>
    <div class="scroll-wrap">
        <div class="bg-white backdrop-blur bg-opacity-90 p-5 rounded-xl lg:w-full w-max">
            <div class="section-heading capitalize 2xl:text-2xl text-xl font-bold text-cyan-950 2xl:mb-5 mb-3">1. Calculate the total revenue for each SKU (item) across all dates.</div>
            <div class="mb-8">
                <div class="header-table mb-3">
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">SKU</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Total revenue</div>
                </div>

                <template v-for="(item, index) in getTotalRevenue" :key="index">
                    <div class="p-4 text-white border-black border-2 border-opacity-5 rounded-lg mb-3 hover:bg-[#916f95] transition hover:bg-opacity-50 body-table cursor-pointer" :class="selectedMonth === index ? 'bg-[#916f95] bg-opacity-100 hover:bg-opacity-90' : 'bg-cyan-600 bg-opacity-60'">
                        <div class="font-semibold 2xl:text-lg text-sm capitalize">{{ item.sku ?? '-' }}</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">INR {{ item.totalPrice.toLocaleString() }}</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { type ISalesData, } from "@/views/composables/types";
import { salesData } from '@/views/composables/salesData';
import CardItem from '@/components/CardItem.vue';
import moment from 'moment';

const data = ref<ISalesData[]>(salesData);
const minPrice = ref<number>(0);
const MaxPrice = ref<number>(0);
const selectedMonth = ref<number>(1);
const totalSold = ref<number>(1);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getTotalRevenue = computed(() => {
    const items: { [sku: string]: { sku: string, totalPrice: number } } = {};

    salesData.forEach((sale) => {
        const sku = sale.sku;
        const totalPrice = sale.totalPrice

        if (!items[sku]) {
            items[sku] = { sku: sku, totalPrice: Number(totalPrice) }
        } else {
            items[sku] = { sku: sku, totalPrice: Number(totalPrice) + Number(sale.totalPrice) }
        }
    })

    return items;
})

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
  