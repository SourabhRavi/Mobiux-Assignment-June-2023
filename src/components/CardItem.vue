<template>
    <div class="card-item">
        <p class="heading capitalize text-xl font-semibold mb-1 text-cyan-950">{{ props.heading }}</p>
        <p class="number font-bold 2xl:text-3xl xl:text-2xl lg:text-xl text-2xl text-cyan-950">INR {{ props.number?.toLocaleString() }}</p>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps({
    number: Number,
    heading: String
})
</script>
  