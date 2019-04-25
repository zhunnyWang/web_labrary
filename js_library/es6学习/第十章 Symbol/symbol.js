/**
 * es6引入一种新的原始数据类型Symbol，表示独一无二的值
 * 可以为对象的属性名设置一个独一无二的值，因此属性名可能为字符串也可能为Symbol类型
 * 因为Symbol是原始数据类型，因此不能用new来调用它
 */

let s = Symbol();
console.log(s)

//Symbol()中可以加描述信息,为了在控制台显示或者转为字符串时比较容易区分
//Symbol的参数只是对当前symbol的一个描述，相同参数的symbol返回值是不一样的
let s1 = Symbol('foo')
let s2 = Symbol('bar')
console.log(s1.toString())
console.log(s2.toString())

let s3 = Symbol('foo')
console.log(s1 === s2);
console.log(s1 === s3);

//利用symbol作为属性名，可以避免不同模块重名的可能
let mySymbol = Symbol()

//1)
let obj = {
    [mySymbol]: 'hello'
}
console.log(obj[mySymbol])

//2) 因为obj.后面总是字符串，而mySymbol是一个Symbol类型的值
let obj = {};
obj[mySymbol] = 'hello'
console.log(obj[mySymbol])

//3)
let obj = {}
Object.defineProperty(obj, mySymbol, { value: 'hello' })
console.log(obj[mySymbol])

/**
 * Symbol属性名的遍历
 * getOwnPropertySymbols只返回对象属性名为Symbol类型的对象
 * Reflect.ownKeys返回对象自身的所有属性
 */

let obj = {}
let a = Symbol('a')
let b = Symbol('b')
obj[a] = 'Hello'
obj[b] = 'world'
Object.getOwnPropertySymbols(obj).forEach(v => {
    console.log(obj[v])
})

/**
 * Symbol.for可以使两个Symbol值相同,它生成的Symbol值会被登记到全局环境中供搜索
 * Symbol.keyFor方法返回一个已登记的Symbol类型值的key，只有登记过的Symbol值才会被搜索到
 */
let symbol1 = Symbol.for('same');
let symbol2 = Symbol.for('same');
console.log(symbol1 === symbol2)
console.log(Symbol.keyFor(symbol1))

/**
 * es6内置了11个Symbol值，指向语言内部使用的方法
 * 1）Symbol.hasInstance,foo instanceof Foo在语言内部实际调用的是Foo[Symbol.hasInstance](foo)
 * 2)Symbol.isConcatSpreadable表示该对象使用Array.prototype.concat()时是否能展开
 * 3)Symbol.species属性指向当前对象的构造函数
 * 4）Symbol.match macth方法检索一个正则表达式的匹配，或一个字符串。执行该方法时如果有该属性，则会调用它返回该方法的返回值
 * 5)Symbol.replace有两个参数，对一个是repalce方法正在作用的对象。
 * 6）Symbol.search 属性指向一个方法，当对象被String.prototype.search方法调用时会返回该方法的返回值
 * 7）Symbol.split属性指向一个方法，当对象被String.prototype.split方法调用时会返回该方法的返回值
 * 8）Symbol.iterator属性指向该对象的默认遍历器方法
 * 9）Symbol.toPrimitive属性指向一个方法，对象被转为原始类型的值时会调用这个方法，返回该对象的原始类型值。
 * 10）Symbol.toStringTag指向一个方法，在对象上调用Object.prototype.toString方法时，如果这个属性存在，其返回值会出现在toString方法
 * 返回的字符串中，表示对象的类型。这个属性可以用于定制[object Array]object后面的内容
 * 11）Symbol.unscopables属性指向一个对象，制定了使用with关键字是哪些属性会被with环境排除
 */

let arr = [1, 2, 3]
console.log(arr[Symbol.isConcatSpreadable])
console.log([4, 5].concat(arr))
arr[Symbol.isConcatSpreadable] = false;
console.log([4, 5].concat(arr))

console.log('1 plus 2 equal 3'.match(/\d+/g))

console.log('abc'.replace('a', 'x'))