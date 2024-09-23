import HomePage from './pages/HomePage.js'
import LastVideos from './pages/LastVideos.js'
import LastPosts from './pages/LastPosts.js'

const navTo = (url) => {
  history.pushState(null, null, url)
  router()
}

const router = () => {
  const routes = [
    { path: '/', view: HomePage },
    { path: '/last-videos', view: LastVideos },
    { path: '/last-posts', view: LastPosts },
  ]

  const matchRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    }
  })

  let match = matchRoutes.find((item) => {
    return item.isMatch
  })

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    }
  }

  document.querySelector('#app').innerHTML = match.route.view()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('[data-link]')) {
      event.preventDefault()
      navTo(event.target.href)
    }
  })

  router()
})
