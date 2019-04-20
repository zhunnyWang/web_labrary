/**
 * 属性的简洁写法
 */

// function func1(x, y) {
//     return { x, y }
// }

// function func2(x, y) {
//     return { x: x, y: y }
// }

// function func3(x, y) {
//     return { a: x, b: y }
// }

// console.log(func1(1, 2))
// console.log(func2(1, 2))
// console.log(func3(1, 2))

// //方法的简写
// const o = {
//     method() { //简写
//         console.log('hi')
//     },
//     greet: function() {
//         console.log('hello')
//     }
// }

//es6新增的定义对象方式,属性表达式如果是一个对象，默认情况下会将对象转为字符串

// let firstWord = "fw";
// let word = {
//     [firstWord]: 'word',
//     lastword: 'hello'
// }
// console.log(word['fw']);
// console.log(word[firstWord]);
// console.log(word.fw)

//Object.is()与===基本一致，只是改变了NaN等于NaN，而+0不等于-0

// console.log(Object.is(NaN, NaN));
// console.log(Object.is(+0, -0));

//Object.assign()将源对象的所有可枚举属性复制到目标对象target，第一个参数是目标对象，后面的参数都是源对象

// console.log(Object.assign({ a: 1, b: 1 }, { b: 2, c: 2 }, { c: 3 }))

//Object.assign()是浅复制

// let obj1 = { a: { b: 1 } };
// let obj2 = Object.assign({}, obj1);
// obj1.a.b  = 2;
// console.log(obj2.a.b)

//为对象添加属性

// class Point {
//     constructor(x, y) {
//         Object.assign(this, { x, y })
//     }
// }
// //相当于:
// class Point1 {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }

//属性描述符

// let obj = {
// foo: 123,
// bar: 456
// }


// //返回某个对象某个属性的描述对象
// console.log(Object.getOwnPropertyDescriptor(obj, 'foo'))
// Object.defineProperty(obj, 'baz', {
//         value: 1,
//         writable: true,
//         enumerable: true,
//         configurable: false
//     })
// Object.defineProperty(obj, 'bar', {
//     value: 4569,
//     writable: true,
//     enumerable: true,
//     configurable: true
// })
// console.log(obj)
// obj['baz'] = 3
// console.log(obj)
// delete obj.baz
// console.log(obj)
// Object.defineProperty(obj, 'baz', {
//     value: 2,
//     writable: false,
//     enumerable: true,
//     configurable: true
// })
// console.log(obj)

//     //返回对象的自身的所有属性
// console.log(Object.getOwnPropertyNames(obj))


/**
 * 原型方法
 * __proto__指向当前对象的prototype属性，虽然浏览器都部署了这个属性，但它毕竟是内部属性
 * 还是用Object.setPrototypeOf() 写操作 设置一个对象的prototype对象
 * Object.getPrototypeOf() 读操作
 * Object.create() 生成操作
 */

// let proto = { y: 1, z: 2 };
// let obj = { x: 10 }
// Object.defineProperty(obj, 'foo', {
//     value: 3,
//     writable: true,
//     enumerable: false,
//     configurable: false
// })
// Object.setPrototypeOf(obj, proto);

// console.log(obj.y, obj.z)
// Object.getOwnPropertyNames(obj).forEach(key => console.log(obj[key])) //['x']
//     // console.log(Object.getPrototypeOf(obj))
// console.log('+++++++++++++++++')
//     // //for in遍历和Object.keys的区别 for in 会遍历自身，继承，原型链中的属性 而Object.keys只会遍历自身的属性
// for (let key in obj) {
//     console.log(obj[key]);
// }
// console.log('+++++++++++++++++')
// Object.keys(obj).forEach(key => console.log(obj[key]))
// console.log('+++++++++++++++++')
// //解构赋值复制和Object.assign都是浅复制，且不会复制原型链中的属性，两者是等同的
// console.log(Object.assign({}, obj))
// let val = 2;
// let obj = {}
// let obj = {
//     get a() {
//         return val;
//     },
//     set a(newVal) {
//         if (val === newVal) {
//             return;
//         }
//         val = newVal * 2;
//     }
// }

// obj.a = 4;
// console.log(obj.a);
// obj.a = 3;
// console.log(obj.a);


// Object.defineProperty(obj, 'b', {
//     get: function() {
//         return val;
//     },
//     set: function(newVal) {
//         if (val === newVal) {
//             return;
//         }
//         val = newVal * 2;
//     }
// })
// obj.b = 4;
// console.log(obj.b);
// obj.b = 3;
// console.log(obj.b);

let myobj = {
    a: 1
}
let proto = {
    b: 2
}
Object.setPrototypeOf(myobj, proto);

console.log('a' in myobj);
console.log('b' in myobj);

console.log(myobj.hasOwnProperty('a'))
console.log(myobj.hasOwnProperty('b'))