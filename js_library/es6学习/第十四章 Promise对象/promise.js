/**
 * Promise：一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
 * Promise是一个对象，从它可以获取异步操作的消息。
 * 特点：1）Promise对象表示一个异步操作，有三种状态：pending（进行中），fulfilled（已成功）和Rejected（已失败）。只有异步操作的结果可以决定当前是哪一种状态。
 * 2）一旦状态改变就不会再变，任何时候都可以得到这个结果，且不可逆。无法取消。处于pending时，无法得知此时处于哪一个阶段。
 * promise新建后会立即执行，然后then中指定的回调函数将在当前脚本中任务完成回后才会被执行。
 */

// const promise = new Promise((reslove, reject) => {
//     setTimeout(() => {
//         console.log('i am here');
//         // reslove('success')
//         return reject('error!!!!') //resolve和reject中带的参数会传递给回调函数，一般调用resolve和reject后promise的使命就完成了，后续操作应该放在then方法里面。
//     }, 1000);
// }).then((value) => {
//     console.log(value);
// }, (error) => {
//     console.log(error);
// }).catch((error) => { //catch可以用到promise链的最后
//     console.log(error)
// })


/**
 * 用promise封装一个AJAX请求
 */

// const axios = function(url) {
//     const promise = new Promise((reslove, reject) => {
//         const client = new XMLHttpRequest();
//         client.open('GET', url);
//         client.onreadystatechange = handler;
//         client.responseType = 'json';
//         client.setRequestHeader('Accept', 'application/json');
//         client.send();

//         function handler() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 reslove(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         }
//     })

//     return promise;
// }

// axios('....').then((res) => {
//     console.log(res.data);
// }, (error) => {
//     console.log('chucuo')
// })

/**
 * Promise.prototype.then()方法返回的是一个新的Promise实例，因此可以采用链式写法
 */

// new Promise((reslove, reject) => {
//     console.log('1');
//     reslove('+');
// }).then((value) => {
//     return value + '2';
// }).then((value) => {
//     console.log(value)
// })

/**
 * Promise.prototype.catch()方法是.then(null,rejection)的别名，用于指定发生错误时的回调函数。
 * then方法中指定的回调函数如果在运行中抛出错误，也会被catch捕获
 * Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止。错误会被promise链上最后一个catch捕获
 * 一般来说不要在then 方法中定义rejectd状态的方法，而是使用catch方法。因为catch可以捕捉上一个then中的错误
 */
// const promise = new Promise((reslove, reject) => {
//     setTimeout(() => {
//         console.log('i am here');
//         return reject('error!!!!');
//     }, 1000);
// }).catch((error) => { //catch可以用到promise链的最后
//     console.log(error)
// })

/**
 * Promise.all()用于将多个Promise实例包装成一个新的Promise实例。参数是具有Iterator接口的对象。
 * 所有的实例状态变成Fulfilled，最终状态才会变成Fulfilled。
 * 只要有一个状态变成rejected，最终状态就是rejected。
 * 只有所有的实例的状态变成Fulfilled，或者其中一个变成rejected，才会调用Promise.all方法后面的回调函数。 
 */

// const p1 = new Promise((reslove, reject) => {
//     return reslove('hello')
// }).then((value) => {
//     return value;
// }).catch(e => e)

// //p2有自己的catch方法，该方法返回的是一个新的Promise实例，p2实际上指向的是这个实例。该实例执行完catch方法后也会变成resolved，因此Promise.all中的两个实例都会被resolved，
// //因此会调用它的then方法而不是catch方法
// const p2 = new Promise((reslove, reject) => {
//         // throw new Error('error!!!')
//         reject('error!')
//     })
//     .then(result => console.log(result))
//     .catch(e => e)

// Promise.all([p1, p2]).then(result => {
//     console.log(result);
// }).catch(e => console.log(e))

/**
 * Promise.race()方法同样是将多个Promise实例包装成一个新的Promise实例
 * 只要有一个实例率先改变状态，p的状态就跟着改变，那个率先改变的Promise实例的返回值就传递给p的回调函数。
 * Promise.resolve()将现有对象转换成Promise对象
 */

Promise.resolve('foo')

//等价于

new Promise((resolve) => {
    return resolve('foo')
})

/**
 * Promise.reject()返回一个新的Promise实例，状态为Rejected
 */

Promise.reject('error')

//等价于

new Promise((resolve, reject) => reject('error'))