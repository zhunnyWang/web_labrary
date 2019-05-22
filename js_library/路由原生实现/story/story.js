//history就是历史记录
window.addEventListener('DOMContentLoaded', onLoad)
window.addEventListener('popstate', onPopState)

let routeView = null

function onLoad () {
  routeView = document.getElementById('routeView')
  onPopState()

  const linkList = document.querySelectorAll('a[href]')
  Array.from(linkList).forEach(el => el.addEventListener('click', function (e) {
    e.preventDefault()
    history.pushState(null, '', el.getAttribute('href'))
    onPopState()
  }))
}

function onPopState () {
  switch (location.pathname) {
    case '/home':
      routeView.innerHTML = '<h3>Home</h3>'
      return
    case '/index':
      routeView.innerHTML = '<h3>Index</h3>'
      return
    default:
      routeView.innerHTML = '<h3>zhuye</h3>'
      return
  }
}