//链式调用then,then返回一个promise，resolve这个回调函数执行时执行then链中的方法
//有一种特殊情况，如果promise中直接resolve，会直接执行
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('success1')
//     resolve('success2')
//   }, 2000);
// }).then((res) => {
//   console.log('resolve1')
//   console.log(res)
//   throw new Error('报错了')
// }).then((res) => {
//   console.log('resolve2')
//   console.log(res)
// }, error => {
//   console.log('reject')
//   console.log(error)
// }).catch(error => {
//   console.log('catch')
//   console.log(error)
// })

// new Promise((resolve, reject) => {
//   // setTimeout(() => {
//   console.log('hello')
//   resolve(p1)
//   // }, 1000);
// }).then(res => {
//   return function () {
//     console.log('p1')
//   }
// }).then(res => {
//   res()
// })

console.log('test')

// new Promise((resolve, reject) => {
//   resolve('resolve')
//   // }, 1000);
// }).then(res => {
//   return 'resolve2'
// }).then(res => {
//   console.log(res)
// })

// new Promise((resolve, reject) => {
//   resolve('resolve')
//   // }, 1000);
// }).then(res => {
//   console.log(res)
//   // return 'resolve2'
// }).then(res => {
//   console.log(res)
// })

const p1 = new Promise((resolve, reject) => {
  resolve('resolve')
  // }, 1000);
}).then('not func').then(res => {
  console.log(res)
})

console.log(typeof p1)

// new Promise((resolve, reject) => {
//   reject('reject')
//   // }, 1000);
// }).then('not func', 'notfunc2').then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })



function resolvePromise (promise2, x, resolve, reject) {
  let self = this;
  //PromiseA+ 2.3.1
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'));
  }
  if (x && typeof x === 'object' || typeof x === 'function') {
    let used; //PromiseA+2.3.3.3.3 只能调用一次
    try {
      //x是promise
      let then = x.then;
      if (typeof then === 'function') {
        //PromiseA+2.3.3
        then.call(x, (y) => {
          //PromiseA+2.3.3.1
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          //PromiseA+2.3.3.2
          if (used) return;
          used = true;
          reject(r);
        });

      } else {
        //PromiseA+2.3.3.4
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      //PromiseA+ 2.3.3.2
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    //PromiseA+ 2.3.3.4
    resolve(x);
  }
}
