/**js允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的Unicode码点 范围\u0000 - \uFFFF
 * 超过这个范围用双字节表示，es6可以将码点放入大括号
 */
// console.log('\u0061')
// console.log('\uD842\uDFB7') //4字节存储
// console.log('\u{20BB7}')

// let s = '𠮷'
// console.log(s.length) //4字节字符长度会被误判
// console.log(s.codePointAt(0)) //codePointAt第一个会返回正确的十进制码点，它是测试一个字符是由2个字节还是4个字节组成的最简单方法
// console.log(s.codePointAt(1))

//String.fromCodePoint刚好与codePointAt相对，反向解码
// console.log(String.fromCodePoint(0x20bb7))

/**
 * es6为字符串添加了遍历器接口，使得字符串可以由for...of循环遍历，可以遍历4字节字符，而普通的for循环不可以
 */

// for (let code of 'hel𠮷lo') {
//     console.log(code)
// }

// let str = 'hel𠮷lo'
// for (i = 0, length = str.length; i < length; i++) {
//     console.log(str[i])//有乱码
// }

/**
 * charAt和at,at方法只是提案，charAt没办法识别4字节字符，at可以
 */

// let str = 'hello'
// console.log(str.charAt(0))
// console.log(str.at(0))

/**
 * es5只有indexOf方法可以来确定一个字符串是否包含于另一个字符串之中，返回第一个匹配的位置
 * es6新增了 includes startWith endWith 都返回布尔值 还可以设置第二个参数
 */
// const str = 'hihellohi'
// console.log(str.indexOf('hi')) //0
// console.log(str.includes('hi')) //true
// console.log(str.startsWith('hi')) //true
// console.log(str.endsWith('hi')) //true
// console.log(str.includes('hi', 2)) //true
// console.log(str.startsWith('hi', 2)) //false
// console.log(str.endsWith('hi', 2)) //true

/**
 * repeat方法,将原字符串重复n次
 */

// console.log('x'.repeat(3))

/**
 * 模版字符串，增强版的字符串，用反引号标识，可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量，
 * 大括号内可以放置任意的js表达式，也可以进行计算，以及引用对象属性，还可以调用函数
 */

// const name = 'zhunny'
// console.log(`my name is ${name}`)

// console.log(typeof `my name is zhunny`)
// console.log(`my name is zhunny,
// i love you`) //引号的字符串就无法这样写

// function func() {
//     return 'hello world'
// }
// console.log(`hi, ${func()}`)