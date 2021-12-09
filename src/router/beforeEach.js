import store from '../store'

export default async (to, from, next) => {
  document.title = to.name
  console.log(to.name, to.meta.auth)

  if (to.name !== 'pages-login' && to.name !== 'pages-register' && !store.getters['auth/hasToken']) {
    try {
      console.log('ok')
      await store.dispatch('auth/ActionCheckToken')

      next({
        path: to.path,
      })
    } catch (error) {
      next({
        name: 'pages-login',
      })
    }
  } else if (to.name === 'pages-login' && store.getters['auth/hasToken']) {
    next({
      name: 'dashboard',
    })
  } else {
    next()
  }
}
