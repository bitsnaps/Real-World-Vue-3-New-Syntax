<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

</script>

<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>
