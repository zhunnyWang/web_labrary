const vnodeType = {
  HTML: 'HTML', // 普通的element
  TEXT: 'TEXT',
  COMPONENT: 'COMPONENT'
}

// 遍历子元素时又能通过vnodeType知道子元素具体是什么类型
const childType = {
  EMPTY: 'EMPTY', // 没有子节点
  SINGLE: 'SINGLE', // 只有单个子节点
  MULTIPLE: 'MULTIPLE' // 有多个子节点
}

// 虚拟dom的新建，返回一个js对象
/**
 *
 * @param {*} tag
 * @param {*} attributes
 * @param {*} children
 */
function createElement (tag, attributes, children) {
  let flag
  if (typeof tag === 'string') {
    flag = vnodeType.HTML
  } else if (typeof tag === 'function') {
    flag = vnodeType.COMPONENT
  } else {
    flag = vnodeType.TEXT
  }

  // 为了在遍历时解决子节点的更新
  let childrenFlag
  if (children === null) {
    childrenFlag = childType.EMPTY
  } else if (Array.isArray(children)) {
    let len = children.length
    if (len === 0) {
      childrenFlag = childType.EMPTY
    } else {
      childrenFlag = childType.MULTIPLE
    }
  } else {
    // single直接就认为是文本节点
    childrenFlag = childType.SINGLE
    children = createTextVnode(children + '')
  }
  return {
    flag, // 返回的这个虚拟节点的类型，比如普通节点，文本节点和组件节点
    tag, // 标签名，如果是普通的element，就是div、p等等 文本节点的tag就是空，组件节点的tag可能就是function
    attributes,
    children,
    childrenFlag,
    el: null
  }
}

// 虚拟dom的渲染, react中的react-dom的render，newVue的时候的render函数
// 区分首次渲染和之后需要diff的渲染
function render (vnode, container) {
  if (container.vnode) {
    // 更新，diff
    console.log('i am here')
    patch(container.vnode, vnode, container)
  } else {
    // 首次，挂载
    mount(vnode, container)
  }
  container.vnode = vnode
}

function patch (prev, next, container) {
  const prevFlag = prev.flag
  const nextFlag = next.flag
  console.log(prevFlag)
  console.log(nextFlag)
  // 节点类型不同，直接替换
  if (prevFlag !== nextFlag) {
    repalceVnode(prev, next, container)
  } else if (nextFlag === vnodeType.HTML) {
    patchElement(prev, next, container)
  } else if (nextFlag === vnodeType.TEXT) {
    console.log('i am here')
    patchText(prev, next)
  }
}

function repalceVnode (prev, next, container) {
  container.removeChild(prev.el)
  mount(next, container)
}

function patchText (prev, next) {
  const el = (next.el = prev.el)
  if (next.children !== prev.children) {
    el.nodeValue = next.children
  }
}

function patchElement (prev, next, container) {
  // 标签名不一样直接替换
  console.log(prev.tag, next.tag)
  if (prev.tag !== next.tag) {
    repalceVnode(prev, next, container)
    return
  }
  const el = (next.el = prev.el)
  const prevAttributes = prev.attributes
  const nextAttributes = next.attributes
  // attributes更新完毕
  // 新增and替换
  nextAttributes &&
    Object.keys(nextAttributes).forEach(attr => {
      const prevVal = prevAttributes[attr]
      const nextVal = nextAttributes[attr]
      patchAttribute(el, attr, prevVal, nextVal)
    })
  // 删除老的里面有但新的里面没有的
  prevAttributes &&
    Object.keys(prevAttributes).forEach(attr => {
      const prevVal = prevAttributes[attr]
      if (prevVal && !nextAttributes.hasOwnProperty(attr)) {
        patchAttribute(el, attr, prevVal, null)
      }
    })
  // 开始更新子元素
  patchChildren(
    prev.childrenFlag,
    next.childrenFlag,
    prev.children,
    next.children,
    el
  )
}

function patchChildren (
  prevChildType,
  nextChildType,
  prevChildren,
  nextChildren,
  container
) {
  // 更新子元素
  /**
   * 1.老的子元素是空的
   * 2.老的子元素是单个
   * 3.老的子元素是多个
   * 1.新的子元素是空的
   * 2.新的子元素是单个
   * 3.新的子元素是多个
   * 两两搭配
   */
  console.log('i am in patchChildren')
  console.log(prevChildren, nextChildren)
  switch (prevChildType) {
    case childType.SINGLE:
      switch (nextChildType) {
        case childType.SINGLE:
          patch(prevChildren, nextChildren, container)
          break
        case childType.MULTIPLE:
          container.removeChild(prevChildren.el)
          nextChildren.forEach(child => {
            mount(child, container)
          })
          break
        case childType.EMPTY:
          container.removeChild(prevChildren.el)
          break
      }
      break
    case childType.MULTIPLE:
      switch (nextChildType) {
        case childType.SINGLE:
          prevChildren.forEach(child => {
            container.removeChild(child.el)
          })
          mount(nextChildren, container)
          break
        // 这是各家虚拟dom算法的优化点
        // 新老都是数组
        case childType.MULTIPLE:
          console.log('新老都是数组')
          break
        case childType.EMPTY:
          prevChildren.forEach(child => {
            container.removeChild(child.el)
          })
          break
      }
      break
    case childType.EMPTY:
      switch (nextChildType) {
        case childType.SINGLE:
          mount(nextChildren, container)
          break
        case childType.MULTIPLE:
          nextChildren.forEach(child => {
            mount(child, container)
          })
          break
        case childType.EMPTY:
          break
      }
      break
  }
}

function mount (vnode, container) {
  const { flag } = vnode
  if (flag === vnodeType.HTML) {
    mountElement(vnode, container)
  } else if (flag === vnodeType.TEXT) {
    mountText(vnode, container)
  }
}

function mountElement (vnode, container) {
  const { tag, attributes, children, childrenFlag } = vnode
  const elementNode = document.createElement(tag)
  // 存储一下该虚拟节点对应的真实dom
  vnode.el = elementNode
  // 挂载该节点上的属性 attributes
  attributes &&
    Object.keys(attributes).forEach(attr => {
      // 节点、属性名、老值、新值
      patchAttribute(elementNode, attr, null, attributes[attr])
    })
  if (childrenFlag !== childType.EMPTY) {
    if (childrenFlag === childType.SINGLE) {
      mount(children, elementNode)
    } else if (childrenFlag === childType.MULTIPLE) {
      children.forEach(child => {
        mount(child, elementNode)
      })
    }
  }
  container.appendChild(elementNode)
}

function mountText (vnode, container) {
  const { children } = vnode
  const textNode = document.createTextNode(children)
  container.appendChild(textNode)
}

function patchAttribute (el, attr, prev, next) {
  switch (attr) {
    case 'style':
      Object.keys(next).forEach(key => {
        el.style[key] = next[key]
      })
      prev &&
        Object.keys(prev).forEach(key => {
          if (!next.hasOwnProperty(key)) {
            el.style[key] = ''
          }
        })
      break
    case 'class':
      el.className = next
      break
    default:
      if (attr[0] === '@') {
        if (prev) {
          const eventName = attr.substring(1)
          el.removeEventListener(eventName, prev)
        }
        if (next) {
          const eventName = attr.substring(1)
          el.addEventListener(eventName, next)
        }
      } else {
        el.setAttribute(attr, next)
      }
  }
}

// 页面操作以后虚拟dom如何更新，涉及到diff和patch

// 创建一个文本类型的vnode
function createTextVnode (text) {
  return {
    flag: vnodeType.TEXT,
    tag: null,
    attributes: null,
    children: text,
    childrenFlag: childType.EMPTY,
    el: null
  }
}
