<template>
    <div class="scroll-wrap">
        <div class="bg-white backdrop-blur bg-opacity-90 p-5 rounded-xl lg:w-full w-max">
            <div class="section-heading capitalize 2xl:text-2xl text-xl font-bold text-cyan-950 2xl:mb-5 mb-3">Month wise sales</div>
            <div class="mb-8">
                <div class="header-table mb-3">
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Items</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Total revenue</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Contribution to revenue</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Cumulative Sum</div>
                </div>
                <!-- <template v-for="(month, index) in months">
                    <div v-if="index < 3" @click="() => { selectedMonth = index + 1 }" :key="month" class="p-4 text-white border-black border-2 border-opacity-5 rounded-lg mb-3 hover:bg-[#916f95] transition hover:bg-opacity-50 body-table cursor-pointer" :class="selectedMonth === index + 1 ? 'bg-[#916f95] bg-opacity-100 hover:bg-opacity-90' : 'bg-cyan-600 bg-opacity-60'">
                        <div class="font-semibold 2xl:text-lg text-sm capitalize">{{ itemsGeneratingMostRevenuePerMonth[(index + 1).toString()] ?? '-' }}</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">INR {{ getTotalRevenue(itemsGeneratingMostRevenuePerMonth[index + 1]).toLocaleString() }}</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">{{ getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index + 1]).toFixed(0) }}%</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">{{ (getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index]) + getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index + 1])).toFixed(0) }}%</div>
                    </div>
                </template> -->
                <!-- <template v-for="(month, index) in getRevenueOfAll" :key="index">
                    <div @click="() => { selectedMonth = index + 1 }" class="p-4 text-white border-black border-2 border-opacity-5 rounded-lg mb-3 hover:bg-[#916f95] transition hover:bg-opacity-50 body-table cursor-pointer" :class="selectedMonth === index + 1 ? 'bg-[#916f95] bg-opacity-100 hover:bg-opacity-90' : 'bg-cyan-600 bg-opacity-60'">
                        <div class="font-semibold 2xl:text-lg text-sm capitalize">{{ itemsGeneratingMostRevenuePerMonth[(index + 1).toString()] ?? '-' }}</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">INR {{ getTotalRevenue(itemsGeneratingMostRevenuePerMonth[index + 1]).toLocaleString() }}</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">{{ getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index + 1]).toFixed(0) }}%</div>
                        <div class="font-semibold capitalize 2xl:text-lg text-sm">{{ (getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index]) + getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index + 1])).toFixed(0) }}%</div>
                    </div>
                </template> -->

            </div>
            <div class="flex flex-col gap-3">
                <div class="header-table">
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Month</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Most Popular Item</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Most Revenue Generating Items</div>
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">Total Sales</div>
                </div>
                <div @click="() => { selectedMonth = index + 1 }" v-for="(month, index) in months" :key="month" class="p-4 text-white border-black border-2 border-opacity-5 rounded-lg hover:bg-[#916f95] transition hover:bg-opacity-50 body-table cursor-pointer" :class="selectedMonth === index + 1 ? 'bg-[#916f95] bg-opacity-100 hover:bg-opacity-90' : 'bg-cyan-600 bg-opacity-60'">
                    <div class="font-semibold capitalize 2xl:text-lg text-sm">{{ month }}</div>
                    <div class="font-semibold 2xl:text-lg text-sm capitalize">{{ mostPopularItemPerMonth[index + 1] ? mostPopularItemPerMonth[index + 1].sku : '-' }}</div>
                    <div class="font-semibold 2xl:text-lg text-sm capitalize">{{ itemsGeneratingMostRevenuePerMonth[(index + 1).toString()] ?? '-' }}</div>
                    <div class="font-semibold 2xl:text-lg text-sm capitalize">{{ salesData.filter((data) => moment(data.date.toString(), 'YYYY-MM-DD').format("MMMM") === month).map(data => data.totalPrice).reduce((acc, curr) => {
                        return Number(acc) + Number(curr);
                    }, 0).toLocaleString() === '0' ? '-' : `INR ${salesData.filter((data) => moment(data.date.toString(), 'YYYY-MM-DD').format("MMMM") === month).map(data => data.totalPrice).reduce((acc, curr) => {
                        return Number(acc) + Number(curr);
                    }, 0).toLocaleString()}` }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-wrap w-full 2xl:mb-5 mb-0 sidebar">
        <CardItem heading="Year Total Sales:" :number="totalSales" class="2xl:mb-5 mb-0" />
        <div class="card-item">
            <p class="heading capitalize text-xl font-semibold mb-1 text-cyan-950">Details For {{ months[selectedMonth - 1] }}:</p>

            <p class="number font-bold text-xl text-cyan-950">Min Order(s): {{ mostPopularSKU.length > 0 ? mostPopularSKU.reduce((acc, curr) => {
                return curr.quantity < acc.quantity ? curr : acc;
            }).quantity : 'No data' }}</p>

                    <p class="number font-bold text-xl text-cyan-950">Max Order(s): {{ mostPopularSKU.length > 0 ? mostPopularSKU.reduce((acc, curr) => {
                        return curr.quantity > acc.quantity ? curr : acc;
                    }).quantity : 'No data' }}</p>

                    <p class="number font-bold text-xl text-cyan-950">Avg Order(s): {{ mostPopularSKU.length > 0 ? ((mostPopularSKU).reduce((acc, curr) => { return acc + Number(curr.quantity) }, 0) / (salesData.filter((data) => Number(moment(data.date.toString(), 'YYYY-MM-DD').format("MM")) === selectedMonth && data.sku === mostPopularItemPerMonth[selectedMonth]?.sku)).length).toFixed(2) : 'No data' }}</p>
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

const totalSales = computed(() => data.value.map((data) => data.totalPrice).reduce((acc, curr) => {
    return Number(acc) + Number(curr);
}, 0))

const mostPopularItemPerMonth = computed(() => {
    const mostPopularItems: { [month: string]: { sku: string; quantity: number } } = {};

    salesData.forEach((sale) => {
        const month = Number(moment(sale.date.toString(), 'YYYY-MM-DD').format("MM"));
        const { sku, quantity } = sale;

        if (!mostPopularItems[month] || Number(quantity) > Number(mostPopularItems[month].quantity)) {
            mostPopularItems[month] = { sku: sku, quantity: Number(quantity) };
        }
    });

    return mostPopularItems;
});

const itemsGeneratingMostRevenuePerMonth = computed(() => {
    const items: { [month: string]: string } = {};

    salesData.forEach((sale) => {
        const month = Number(moment(sale.date.toString(), 'YYYY-MM-DD').format("MM"));
        const { sku, totalPrice } = sale;

        if (!items[month] || Number(totalPrice) > salesData.findIndex((item) => item.sku === items[month])) {
            items[month] = sku;
        }
    });

    return items;
});

// console.log(itemsGeneratingMostRevenuePerMonth.value);

const mostPopularSKU = computed(() => {
    return salesData.filter((data) => Number(moment(data.date.toString(), 'YYYY-MM-DD').format("MM")) === selectedMonth.value).filter((data) => data.sku === mostPopularItemPerMonth.value[selectedMonth.value]?.sku)
})

const getRevenueContribution = (value: string) => {
    return ((getTotalRevenue(value)) / totalSales.value) * 100;
}

const getTotalRevenue = (value: string) => {
    return data.value.filter((data) => data.sku === value).reduce((acc, curr) => {
        return Number(acc) + Number(curr.totalPrice);
    }, 0);
}

// const sortedContributionToRevenue = computed(() => {
//     return getRevenueContribution(itemsGeneratingMostRevenuePerMonth[index + 1]).toFixed(0)
// })

// const getRevenueOfAll = computed(() => {
//     const allItems: { [sku: string]: { sku: string; quantity: number } } = {};

//     salesData.forEach((sale, index) => {
//         const month = Number(moment(sale.date.toString()).format("MM"));
//         const { month, totalPrice } = sale;
        
//         if (!allItems[month]) {
//             allItems[month] = { month: sku, quantity: getRevenueContribution(totalPrice) };
//         }
//     });

//     return [allItems];
// });

// console.log(getRevenueOfAll.value.sort());

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
  