<script setup>
import { inject } from "vue"
import { useRouter } from "vue-router"

const GStore = inject('GStore')

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const register = () => {
  // Call to API
  // If registered then redirect to event details
  GStore.flashMassage = 'You are successfully registered for ' + props.event.title
  setTimeout(() => {
    GStore.flashMassage = ''
  }, 3000)
  router.push({
    name: "event-details",
  })
}

</script>

<template>
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
</template>
