class MyVue {
  constructor(options) {
    this.$data = options.data;
    this.dataKidnap(this.$data);
    this.$options = options;
    new Compile(options.el, this);

    if (options.created) {
      options.created.call(this);
    }
  }

  dataKidnap (data) {
    if (!data || typeof data != 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.definReactive(data, key, data[key]);
      this.proxyData(key);
    })
  }

  definReactive (obj, key, value) {
    this.dataKidnap(value);

    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get () {
        //每get一次就把watcher实例加入dep
        Dep.target && dep.addDep(Dep.target);
        return value;
      },
      set (newVal) {
        if (value === newVal) {
          return;
        }
        value = newVal;
        //通知所有watcher去更新
        dep.notify();
      }
    })
  }

  proxyData (key) {
    Object.defineProperty(this, key, {
      get () {
        return this.$data[key];
      },
      set (newval) {
        this.$data[key] = newval;
      }
    })
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep (dep) {//dep就是Wacther
    this.deps.push(dep);
  }

  notify () {
    this.deps.forEach(dep => dep.update());
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    //将当前watcher实例指向Dep的一个静态属性，每创建一个watcher，它就会更新
    Dep.target = this;
    this.vm[this.exp];
    Dep.target = null;
  }

  update () {
    this.cb.call(this.vm, this.vm[this.exp]);
  }
}