/**什么是解构赋值 es6允许按照一定模式从数组和对象中提取值，然后对变量进行赋值，这被称为解构 */
/**基本用法 这种写法类似于模式匹配，只要等号两边模式相同，左边的变量就会被赋予对应的值*/
// let [a, b, c] = [1, 2, 3]
// console.log(a)
// console.log(b)
// console.log(c)

// let { a, b, c } = { a: 1, b: 2, c: 3 }

// console.log(a)
// console.log(b)
// console.log(c)

// let [a, , c] = [1, 2, 3]
// console.log(a)
// console.log(c)

// let [a, ...c] = [2, 3, 4, 5, 5, 6]
// console.log(a)
// console.log(c)

//如果解构不成功，变量的值就为undefined
// let [a, b] = [1]
// console.log(a) //1
// console.log(b) //undefined
// let { foo } = {}
// console.log(foo) //undefined

//如果等号右边不是可遍历的结构，那么将会报错。
// let [foo] = 1 //1 is not iterable
// console.log(foo)

// let [a, b] = new Set(['1', '2', '1'])
// console.log(a)
// console.log(b)

/**解构赋值允许指定默认值 */
// let [a = 1] = []
// console.log(a)

// let [b, c = 2] = [3]
// console.log(b) //3
// console.log(c) //2

// function f() {
//     return 'a'
// }

// let [a = f()] = []
// console.log(a)

/**对象的解构赋值 数组和对象的结构的不同点：数组的元素按照次序排列，变量的取值是由它的位置决定的，而对象的属性没有次序，变量必须与属性同名才能取到正确的值*/
// let { foo, bar } = {
//     bar: 'aaa',
//     foo: 'bbb'
// }
// console.log(foo)
// console.log(bar)

//等价于
// let { foo:foo, bar:bar } = {
//     bar: 'aaa',
//     foo: 'bbb'
// }
// console.log(foo)
// console.log(bar)

//对象解构赋值的内部机制：先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者
// let { foo: baz } = {
//     foo: 'aaa'
// }
// console.log(baz) //'aaa'
// console.log(foo) //foo is not defined

// let obj = {
//     hi: [1, { a: 2 }]
// }
// let {
//     hi,
//     hi: [x, { a: y }]
// } = obj

// console.log(hi)
// console.log(x)
// console.log(y)

//对象的解构赋值也有默认值
// let { x = 3 } = {}
// console.log(x)

// let { max } = Math
// console.log(max(...[1, 2, 3]))

/**字符串的解构赋值 */
// const [a, b, c, d] = 'hello'
// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)

/**函数参数的解构赋值 */
// function add([x, y]) {
//     return x + y
// }
// console.log(add([1, 2]))

// console.log([
//     [1, 2],
//     [3, 7]
// ].map(([a, b]) => a + b))

/**解构赋值的作用
 * 1)不用临时变量交换两个变量的值
 */
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b)

console.log(2 ** 3);