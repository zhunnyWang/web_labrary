/**
 * Class可以通过extends关键字来实现继承，这比ES5通过修改原型链实现继承更加清晰和方便
 * es5的继承实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面
 * es6继承实质是先创造父类的实例对象this（所以必须先调用super方法，只有super方法才能返回父类实例），然后再用子类的构造函数修改this
 */

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString () {
    return `(${this.x},${this.y})`
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y)
    this.color = color
  }
  toString () {
    return `color:${this.color},point:` + super.toString()
  }
}

const colorp = new ColorPoint(2, 3, 'red')
console.log(colorp.toString())

//Object.getPrototypeOf()方法可以用来从子类上获取父类
console.log(Object.getPrototypeOf(ColorPoint) === Point)

/**
 * super关键字可以被当作函数使用，也可以当作对象使用
 * 1）super作为函数调用时代表父类的构造函数
 * 2）super作为对象时在普通方法中指向父类的原型对象，定义在父类实例上的方法或属性是无法通过super调用的
 * 通过super调用父类时，super方法会绑定子类的this
 */

class A {
  constructor() {
    this.x = 1
  }
  print () {
    console.log(this.x)
  }
}

class B extends A {
  constructor() {
    super()
    this.x = 2
  }
  print () {
    super.print()
  }
}

const b = new B()
b.print()

let Animal = function () {
  this.superBreath = true;
  this.animals = ['cat', 'dog']
}
Animal.prototype.canBreath = function () {
  return this.superBreath;
}

let Cat = function () {
  Animal.call(this);
  this.subBreath = true;
  this.subAnimals = ['cat', 'dog', 'snakes']
}

Object.setPrototypeOf(Cat.prototype, Animal.prototype)
console.log(Animal.prototype.constructor == Animal);
console.log(Cat.prototype.constructor == Cat);
console.log('hello')
console.log(Object.getPrototypeOf(Cat) === Animal);

const kitty = new Cat();

console.log(kitty instanceof Animal);
console.log(kitty.canBreath());
console.log(kitty.subAnimals);

