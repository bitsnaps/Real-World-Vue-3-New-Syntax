import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import NProgress from 'nprogress'
import EventListView from '@/views/EventListView.vue'
import EventLayout from '@/views/event/layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import AboutView from '@/views/AboutView.vue'
import NotFound from "@/views/NotFound.vue"
import NetworkError from "@/views/NetworkError.vue"


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
          // requireAuth is going to be inherited by child routes
          meta: { requireAuth: true}
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
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/404/:resource",
      name: "404Resource",
      component: NotFound,
      props: true,
    },
    {
      path: "/network-error",
      name: "NetworkError",
      component: NetworkError,
    },
  ],
})

router.beforeEach((to, from) => {
  const GStore = inject('GStore')
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized){
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'
    setTimeout(() => {
      GStore.flashMessage = ''
      NProgress.done()
    }, 3000)

    if (from.href){
      return false
    } else {
      return { path: '/'}
    }
  }
})

export default router
