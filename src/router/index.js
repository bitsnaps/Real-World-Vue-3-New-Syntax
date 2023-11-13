import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/event/layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({ page: parseInt(route.query.page) || 1})
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: "", // Empty path means this component will be loaded at the root path of the parent
          name: 'event-details',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      // path: '/event/:id', // Use this to apply redirect children
      redirect: (to) => {
        // return { name: 'event-details' } // Use this to apply redirect children
        return { path: `/events/${to.params.afterEvent}` }
      },
      /*/ Redirect path can have children too
      children: [
        { path: 'register', redirect: () => { name: 'event-register'}},
        { path: 'edit', redirect: () => { name: 'event-edit'}}
      ]*/
    },
    {
      path: '/about',
      name: 'about',
      alias: '/about-us',
      component: AboutView,
    },
  ],
})

export default router
