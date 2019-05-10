/**
 * new MyVue({
 *  el:'#app',
 *  data:{
 *    name:'zhunny'
 *  }
 *  template:'',
 *  method:{},
 *  created(){
 *  }
 * })
 * 1）数据劫持
 * 2）依赖收集
 * 3）数据更新通知试图更新
 */
class MyVue {
  constructor(options) {
    this.$data = options.data;
    this.dataKidnap(this.$data);
    new Watcher();
    this.$data.text;
    new Watcher();
    this.$data.fruits.type;
  }

  dataKidnap (data) {
    if (!data || typeof data != 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.definReactive(data, key, data[key]);
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
  constructor() {
    //将当前watcher实例指向Dep的一个静态属性，每创建一个watcher，它就会更新
    Dep.target = this;
  }

  update () {
    console.log('需要更新视图了')
  }
}