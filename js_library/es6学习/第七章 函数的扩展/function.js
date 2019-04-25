/**
 * 默认值
 */
//es5的用法,不能识别对应的布尔值为false的值
function hi(x, y) {
    y = y || 1;
    return x + y;
}

console.log(hi(3))
console.log(hi(3, ''))

//es6 默认值直接写在参数定义的后边

function hi(x, y = 1) {
    return x + y;
}
console.log(hi(3))
console.log(hi(3, 0))

//与解构赋值默认值一起用
function foo({ x, y = 5 }) {
    console.log(x, y)
}
foo({})
foo({ x: 1 })
foo({ x: 1, y: 3 })

// //双重默认值
function fecth(url, { method = 'GET' } = {}) {
    console.log(method);
}
fecth('http://hello.com')

//两种双重默认值的区别

function m1({ x = 0, y = 0 } = {}) {
    console.log([x, y])
}

function m2({ x, y } = { x: 0, y: 0 }) {
    console.log([x, y])
}

/**
 * rest参数，用于获取函数的多余参数，不需要使用arguments对象，
 * rest参数搭配的变量是一个数组，该变量将多余的参数放入其中
 * rest参数之后不能再有其他参数
 */

function add(...rest) {
    let sum = 0;
    for (let item of rest) {
        sum += item;
    }
    return sum;
}

console.log(add(1, 2, 3, 4, 5, 6))

/**
 * 箭头函数
 * 如果箭头函数不需要参数或需要多个参数，就用圆括号代表参数部分
 */

const f = () => 'helloworld';
console.log(f());

//如果箭头函数的代码块多于一条语句，就是用大括号将其括起来并使用return 返回

const sum = (a, b) => {
    const add = a + b;
    return add;
}

console.log(sum(1, 1));

//如果箭头函数直接返回一个对象

const obj = () => ({ a: 1, b: 2 })

console.log(obj());

//箭头函数可以简化回调函数
const arr = [1, 2, 3].map(x => x * x)
console.log(arr);

/**
 * 箭头函数使用时的注意事项
 * 1）它的this对象为定义时所在的对象，而不是使用时所在的对象。在箭头函数中，this的指向是不可变的。这种特性有利于封装回调函数
 * this指向固定化的原因是，箭头函数没有自己的this，导致内部的this就是外层代码的this。正因为它没有自己的this，才不能用作构造函数。
 * 2）不可以当作构造函数，即不能使用new命令
 * 3）没有args对象，可以使用...rest
 * 4）不可以使用yield命令，因此不能用作Generator对象
 */
var id = 21;

function foo() {
    setTimeout(() => {
        console.log('id', this.id)
    }, 100)
}

function bar() {
    var that = this;
    setTimeout(function() {
        console.log('id', that.id)
    }, 100);
}

foo.call({ id: 42 });
bar.call({ id: 42 });