/*let 块级作用域*/
// {
//     let a = 1;
//     var b = 2;
// }
// console.log(a);
// console.log(b); //ReferenceError: a is not defined

// var a = [];
// for (var i = 0; i < 10; i++) {
//     a[i] = function() {
//         console.log(i);
//     }
// }
// a[7]()

// let a = [];
// for (let i = 0; i < 10; i++) {
//     a[i] = () => {
//         console.log(i)
//     }
// }
// a[7]()

/*let不存在变量提升 */
// console.log(a);//undefined a已经声明 只是还没有赋值
// var a = 1;

// console.log(a);//ReferenceError: a is not defined
// let a = 1;


/**暂时性死区 在iftrue中，在let声明a之前都属于a的死区，减少运行时错误*/
// var a = 1;
// if (true) {
//     a = 2; //ReferenceError: a is not defined
//     let a;
//     a = 2;
//     console.log(a);
// }

/**let不能重复声明，但如果都是var就可以*/
// let a = 1;
// var a = 10;
// console.log(a) //Identifier 'a' has already been declared

// var a = 1;
// var a = 10;
// console.log(a)//10

/**es5只有全局作用域和函数作用域，let和const带来了块级作用域 */
//变量提升导致内部作用域的tmp覆盖外部作用域的tmp
// var tmp = 10;

// function func() {
//     console.log(tmp); //undefined
//     if (false) {
//         var tmp = 'hello world';
//     }
// }
// func()

//计数的循环变量泄漏为全局变量

// for (var i = 0; i < 10; i++) {
//     console.log(i);
// }
// console.log(i)


//块级作用域的出现使得立即执行匿名函数不再必要了
// function func() {
//     let a = 1;
//     if (true) {
//         let a = 2;
//         console.log(a); //2
//     }
//     console.log(a); //1
// }
// func()

//在es5时可以用立即执行匿名函数来模拟一个局部作用域
// var a = []
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         a[i] = function() {
//             console.log(i)
//         }
//     }(i))
// }
// a[7]()
// console.log(i)

//es6明确允许在块级作用中声明函数，在es6浏览器环境中函数声明类似于var，即会提升到全局作用域或函数作用域的头部。同时，函数声明函会提升到所在块级作用域的头部

/**const声明一个只读的常量，一旦声明就不能改变，这意味着一旦声明就必须立即初始化 ,对const只声明不赋值就会报错 其他的性质同let一样*/

// const a = 1;
// a = 2;//Assignment to constant variable.
// console.log(a)

/**const的本质，const保证的是变量指向的内存地址不可改变 而不是值 因此引用类型它保存的就一个指针，它不能保证它指向的数据结构不变 */

// const a = {};
// a.prop = 1;
// console.log(a); //{ prop: 1 }

/**es5只有两种声明变量的方法：var，function 而es6有六种： var，function，let const class import*/