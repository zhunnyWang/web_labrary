const isFunction = handle => typeof handle === 'function'
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    this._value = undefined
    this._status = PENDING
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }
  _resolve (val) {
    if (this._status !== PENDING) return
    this._value = val
    this._status = FULFILLED
    this._fulfilledQueues.forEach(fn => fn());
  }
  _reject (err) {
    if (this._status !== PENDING) return
    this._value = err
    this._status = REJECTED
    this._rejectedQueues.forEach(fn => fn());
  }
  then (onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
    onRejected = isFunction(onRejected) ? onRejected : err => { throw err }
    const { _value, _status } = this
    const p2 = new MyPromise((resolve, reject) => {
      const fulfilled = (value) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(value)
            this._resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      const rejected = (err) => {
        setTimeout(() => {
          try {
            const x = onRejected(err)
            this._resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
  _resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle'));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
      if (x && typeof x === 'object' || typeof x === 'function') {
        let used; //PromiseA+2.3.3.3.3 只能调用一次
        try {
          let then = x.then;
          if (typeof then === 'function') {
            //PromiseA+2.3.3
            then.call(x, (y) => {
              //PromiseA+2.3.3.1
              if (used) return;
              used = true;
              this._resolvePromise(promise2, y, resolve, reject);
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
  }
}

// new MyPromise((resolve, reject) => {
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

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000);
}).then(res => {
  console.log(res)
})