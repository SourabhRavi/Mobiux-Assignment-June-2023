<template>
    <Bar :data="chartData" :options="options" />
</template>
  
<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { salesData } from '@/views/composables/salesData';
import { computed } from 'vue';
import moment from 'moment';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthlySkuRevenue = computed(() => {
    const items: { [month: string]: { [sku: string]: { sku: string, totalPrice: number, month: string } } } = {};

    salesData.forEach((sale) => {
        const month = moment(sale.date.toString(), 'YYYY-MM-DD').format("MMMM");
        const sku = sale.sku;
        const totalPrice = Number(sale.totalPrice);

        if (!items[month]) {
            items[month] = {
                [sku]: {
                    sku: sku,
                    totalPrice: totalPrice,
                    month: month
                }
            }
        } else {
            if (!items[month].sku) {
                items[month][sku] = {
                    sku: sku,
                    totalPrice: totalPrice,
                    month: month
                }
            } else {
                items[month].sku.totalPrice += totalPrice
            }
        }
    })

    return items;
})

console.log(monthlySkuRevenue.value);

const chartData = {
    labels: months,
    datasets: [
        {
            label: Object.values(monthlySkuRevenue.value.January)[0].sku,
            backgroundColor: '#f87979',
            data: [Object.values(monthlySkuRevenue.value.January)[0].totalPrice, Object.values(monthlySkuRevenue.value.February)[0].totalPrice, Object.values(monthlySkuRevenue.value.March)[0].totalPrice]
        },
        {
            label: Object.values(monthlySkuRevenue.value.January)[1].sku,
            backgroundColor: 'blue',
            data: [Object.values(monthlySkuRevenue.value.January)[1].totalPrice, Object.values(monthlySkuRevenue.value.February)[1].totalPrice, Object.values(monthlySkuRevenue.value.March)[1].totalPrice]
        },
        {
            label: Object.values(monthlySkuRevenue.value.January)[2].sku,
            backgroundColor: 'orange',
            data: [Object.values(monthlySkuRevenue.value.January)[2].totalPrice, Object.values(monthlySkuRevenue.value.February)[2].totalPrice, Object.values(monthlySkuRevenue.value.March)[2].totalPrice]
        },
        {
            label: Object.values(monthlySkuRevenue.value.January)[3].sku,
            backgroundColor: 'green',
            data: [Object.values(monthlySkuRevenue.value.January)[3].totalPrice, Object.values(monthlySkuRevenue.value.February)[3].totalPrice, Object.values(monthlySkuRevenue.value.March)[3].totalPrice]
        },
        {
            label: Object.values(monthlySkuRevenue.value.January)[4].sku,
            backgroundColor: 'purple',
            data: [Object.values(monthlySkuRevenue.value.January)[4].totalPrice, Object.values(monthlySkuRevenue.value.February)[4].totalPrice, Object.values(monthlySkuRevenue.value.March)[4].totalPrice]
        }
    ]
}

const options = {
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
        }
    }
}
</script>