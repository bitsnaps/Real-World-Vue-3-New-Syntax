<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

const props = defineProps(['page'])
const events = ref(null)
const page = computed(() => props.page)
const eventsPerPage = 2

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(eventsPerPage, page.value)
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })    
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <RouterLink
      :to="{ name: 'event-list', query: { page: page - 1}}"
      rel="prev"
      v-if="page != 1"
      >Prev Page</RouterLink>
    <RouterLink
      :to="{ name: 'event-list', query: { page: page + 1}}"
      rel="next"
      >Next Page</RouterLink>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
