<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

const router = useRouter()

const props = defineProps(['page'])
const events = ref(null)
const totalEvents = ref(0)
const page = computed(() => props.page)
const hasNextpage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})

const eventsPerPage = 2


onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(eventsPerPage, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      // console.log
      router.push({ name: 'NetworkError' })
    })    
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
    <RouterLink
      id="page-prev"
      :to="{ name: 'event-list', query: { page: page - 1}}"
      rel="prev"
      v-if="page != 1"
      >&#60; Prev</RouterLink>
    <RouterLink
    id="page-next"
      :to="{ name: 'event-list', query: { page: page + 1}}"
      rel="next"
      v-if="hasNextpage"
      >Next &#62;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
