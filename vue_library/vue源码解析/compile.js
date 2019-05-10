class Compile {
  constructor(el, vm) {
    //要遍历的宿主节点
    this.$el = document.querySelector(el);
    this.$vm = vm;

    if (this.$el) {
      //转换内部内容为片段
      this.$fragment = this.node2Fragment(this.$el);
      this.compile(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }
  node2Fragment (node) {
    const frag = document.createDocumentFragment();
    //将node中所有子元素移动到frag中
    let child;
    while (child = node.firstChild) {
      frag.appendChild(child);
    }
    return frag;
  }
  compile (node) {
    const childNodes = node.childNodes;
    Array.from(childNodes).forEach(cd => {
      if (this.isElement(cd)) {
        const nodeAtrrs = cd.attributes;
        Array.from(nodeAtrrs).forEach(attr => {
          const attrName = attr.name;
          const attrVal = attr.value;
          if (this.isDirctive(attrName)) {
            const dir = attrName.substring(2);
            //model, text
            this[dir] && this[dir](cd, this.$vm, attrVal);
          } else if (this.isEvent(attrName)) {
            const dir = attrName.substring(1); // @click
            this.eventHandler(cd, this.$vm, attrVal, dir);
          }
        })
      } else if (this.isInterpolation(cd)) {
        // console.log('编译文本' + cd.nodeName);
        this.compileText(cd);
      }

      if (cd.childNodes && cd.childNodes.length > 0) {
        this.compile(cd)
      }
    });
  }

  text (node, vm, exp) {
    this.update(node, vm, exp, 'text');
  }

  compileText (node) {
    console.log(RegExp.$1);
    // node.textContent = this.$vm.$data[RegExp.$1]
    this.update(node, this.$vm, RegExp.$1, 'text')
  }

  update (node, vm, exp, dir) {
    const updateFn = this[dir + 'Updater'];
    updateFn && updateFn(node, vm[exp]);
    new Watcher(vm, exp, function (value) {
      updateFn && updateFn(node, value);
    })
  }
  //   双绑
  model (node, vm, exp) {
    // 指定input的value属性
    this.update(node, vm, exp, "model");

    // 视图对模型响应
    node.addEventListener("input", e => {
      vm[exp] = e.target.value;
    });
  }

  modelUpdater (node, value) {
    node.value = value;
  }

  html (node, vm, exp) {
    this.update(node, vm, exp, "html");
  }

  htmlUpdater (node, value) {
    node.innerHTML = value;
  }

  textUpdater (node, value) {
    //把内容更新到试图上
    node.textContent = value;
  }

  eventHandler (node, vm, exp, dir) {
    //   @click="onClick"
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm));
    }
  }

  isElement (node) {
    return node.nodeType === 1;
  }

  isInterpolation (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  isDirctive (attr) {
    return attr.startsWith('k-')
  }

  isEvent (attr) {
    return attr.startsWith('@')
  }
}