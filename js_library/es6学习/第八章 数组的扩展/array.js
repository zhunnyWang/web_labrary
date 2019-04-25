/**
 * 扩展运算符
 * 它可以数组脱壳,将一个数组转为用逗号分隔的参数序列
 */
console.log(...[1, 2, 3])

//它可以代替apply方法,js不提供求数组最大元素的函数，所以只能套用Math.max函数将数组转为一个参数序列，然后求最大值

console.log(Math.max.apply(null, [1, 2, 3]))
console.log(Math.max(...[1, 2, 3]))


let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
arr1.push(...arr2)
console.log(arr1);

/**
 * 扩展运算符的应用
 * 1）合并数组 concat方法返回一个全新的数组，而上面的push方法则是在原有数组上添加元素
 */

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = arr1.concat(arr2);
console.log(arr1);
console.log(arr3);

//2）与解构赋值一起结合使用
const [first, ...second] = [1, 2, 3, 4, 5];
console.log(first);
console.log(second);

//3)扩展运算符可以将字符串转换为数组，与split方法类似

console.log([...
    'hello'
])

//4)任何Iterator接口的对象都可以用扩展运算符专为真正的数组。

let set = new Set([1, 2, 3]);
console.log([...set]);

/**
 * Array.from方法比扩展运算符功能更强大，它不仅可以将Iterator接口的对象转换为数组，还可以转换类似于数组的对象。
 * 类似于数组的对象本质特征只有一点，必须有length属性。
 * 他的第二个参数类似于map方法
 */

let arrAlike = {
    '0': 'a',
    '1': 'b',
    '2': 'f',
    length: 3
}

let arr1 = Array.from(arrAlike);
console.log(arr1)


let arr2 = Array.from(arrAlike, x => x + 'hi')
console.log(arr2)

//Array.of用于将一组值转换为数组

console.log(Array.of(1, 3, 8))

/**
 * 数组实例的一些方法
 */

//copyWithin，会改变原数组，参数为target，start = 0，end = this.length

console.log([1, 2, 3, 4, 5].copyWithin(0, 3))

//find 用于找到第一个符合条件的数组成员，他的参数是一个回调函数，所有数组成员依次执行该回调函数，找不到返回undefind

let res = [1, 4, -5, 10, 1].find(x => x < 0)
console.log(res)

//findIndex与find基本类似，返回的是第一个符合条件的位置
let res = [1, 4, -5, 10, 1].findIndex(x => x < 0)
console.log(res)

//fill() 向指定位置填充一个定值 修改原数组

let arr = ['a', 'b', 'c'];
arr.fill(7, 1, 2)
console.log(arr)

//entries,keys和values，他们返回一个遍历器对象，可以用for...of循环遍历

const arr1 = ['a', 'b']
for (let index of arr1.keys()) {
    console.log(index)
}

for (let index of arr1.values()) {
    console.log(index)
}

for (let [index, item] of arr1.entries()) {
    console.log(index, item)
}

//includes,判定某个数组是否包含给定的值。与字符串的includes方法类似，第二个参数表示搜索的起始位置
console.log([1, 2, 3].includes(2))