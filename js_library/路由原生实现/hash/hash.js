// 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
window.addEventListener('DOMContentLoaded', onLoad)
//onhashchange 事件在当前 URL 的锚部分(以 '#' 号为开始) 发生改变时触发 。
window.addEventListener('hashchange', onHashChange)

let routeView = null

function onLoad () {
  console.log('iamhere')
  routeView = document.getElementById('routeView')
  console.log(routeView)
  onHashChange()
}
function onHashChange () {
  switch (location.hash) {
    case '#/home':
      routeView.innerHTML = '<h3>Home</h3>'
      return
    case '#/index':
      routeView.innerHTML = '<h3>Index</h3>'
      return
    default:
      routeView.innerHTML = '<h3>zhuye</h3>'
      return
  }
}