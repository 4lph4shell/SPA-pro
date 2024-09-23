import HomePage from './pages/HomePage.js'
import LastVideos from './pages/LastVideos.js'
import LastPosts from './pages/LastPosts.js'

/**
 * A function to navigate to another page
 * @param {string} url - the url to navigate to
 */
const navTo = (url) => {
  // Push the new url to the browser history
  history.pushState(null, null, url)
  // Call the router function to render the new page
  router()
}

/**
 * The main router function
 */
const router = () => {
  /**
   * Array of objects with route info
   * @typedef {Object} Route
   * @property {string} path - the path to match
   * @property {Function} view - the function to render the page
   */
  const routes = [
    { path: '/', view: HomePage },
    { path: '/last-videos', view: LastVideos },
    { path: '/last-posts', view: LastPosts },
  ]

  /**
   * Create an array of route info objects with a new
   * property `isMatch` set to `true` if the route matches
   * the current location
   */
  const matchRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    }
  })

  /**
   * Find the first route that matches the current location
   */
  let match = matchRoutes.find((item) => {
    return item.isMatch
  })

  /**
   * If no route matches, set the default route
   */
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    }
  }

  /**
   * Render the page
   */
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
