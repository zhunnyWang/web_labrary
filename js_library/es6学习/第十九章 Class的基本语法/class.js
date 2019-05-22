/**
 * js语言的传统方法是通过构造函数定义并生成新对象
 * es6引入类这个概念作为对象的模版，可以将它看作一个语法糖，它的绝大部分功能，es5都可以做到。
 * 更像面向对象编程
 */
function Point (x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return `(${this.x},${this.y})`
}

const p1 = new Point(1, 2)
console.log(p1.toString())

//用类来改写

class Pointc {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString () {
    return this
  }
}

const p2 = new Pointc(1, 2)
console.log(p2.toString() === p2)


/**
 * es5中，原型对象中的方法是可以枚举的
 * es6中，原型对象的方法是不可枚举的
 */
console.log(Object.keys(p1))
console.log(Object.keys(Point.prototype))
console.log(Object.getOwnPropertyNames(Point.prototype))

console.log(Object.keys(p2))
console.log(Object.keys(Pointc.prototype))
console.log(Object.getOwnPropertyNames(Pointc.prototype))

/**
 * 类和模块内部默认使用严格模式
 * constructor方法类的默认方法，通过new命令生成对象实例时自动调用该方法。
 * 一个类必须有constructor方法，如果没有显示定义，也会给其添加一个默认的空的constructor方法
 * constructor方法默认返回实例对象，不过也可以指定返回另外一个对象
 */

class Foo {
  constructor() {
    return Object.create(null)
  }
}

console.log(new Foo() instanceof Foo) //false

/**
 * 实例对象，实例的属性除非显式的定义在对象本身（this对象），否则都是定义在原型上
 * 类的所有实例共享一个原型对象
 */

console.log(p2.hasOwnProperty('x')) //true
console.log(p2.hasOwnProperty('y')) //true
console.log(p2.hasOwnProperty('toString')) //false
console.log(Object.getPrototypeOf(p2).hasOwnProperty('toString')) //true

//class表达式 Me只在Class内部用 如果不用可以省略Me
const Myclass = class Me {
  getClassName () {
    return Me.name
  }
}

const c = new Myclass()
console.log(c.getClassName())

/**
 * 类不存在变量提升，类的使用在后，声明在前。这么规定的原因与继承有关，必须保证子类在父类后头定义
 */
/**
 * 私有方法和私有属性：es6不提供，只能通过变通方法来模拟实现，可以使用Symbol值
 * this的指向，可以在构造方法中使用bind绑定this，或者使用箭头函数，或者使用Proxy，都可以绑定指向实例的this，使它不会丢失
 */

//1)bind,此时printName是每个实例都独有的
// class Logger {
//   constructor() {
//     this.printName = this.printName.bind(this)
//   }
//   printName (name = 'there') {
//     this.print(`Hello ${name}`)
//   }
//   print (text) {
//     console.log(text)
//   }
// }

// const log = new Logger()

// const { printName } = log
// printName()
// console.log(Object.keys(log))
//2）箭头函数
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`)
    }
  }
  print (text) {
    console.log(text)
  }
}

const log = new Logger()

const { printName } = log
printName()

/**
 * 在类的内部可以使用get和set关键字对某个属性设置存值函数和取值函数。拦截该属性的存取行为
 */

class Descriptor {
  get prop () {
    return 'getter'
  }
  set prop (value) {
    console.log('setter:' + value)
  }
}
const des = new Descriptor()
des.prop = 'hi'
console.log(des.prop)

//prop是原型上的不可枚举的属性
console.log(Object.getOwnPropertyNames(Descriptor.prototype))
const dess = Object.getOwnPropertyDescriptor(Descriptor.prototype, 'prop')
console.log(dess)

/**
 * 类相当于实例的原型，所有在类中定义的方法都会被实例继承。如果在一个方法前加上static关键字，就表示该方法不会被实例继承，而是直接通过类调用。
 * 称为静态方法,父类的静态方法可以被子类继承
 * 静态属性指的是Class本身的属性，Class.propname。而不是定义在实例对象this上的属性，目前只有提案
 * 实例属性目前只能在constructor中定义，提案里可以用等式写在类中
 */

class Bar {
  static Hello () {
    console.log('Hello world')
  }
}
Bar.Hello()

/**
 * new.target属性，返回new命令所作用的构造函数
 * 可以保证构造函数只能通过new命令调用
 * 子类继承父类时new.target会返回子类
 */

function Person (name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例')
  }
}
