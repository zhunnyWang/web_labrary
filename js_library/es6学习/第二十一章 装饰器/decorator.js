/**
 * 修饰器是一个函数，用来修改类的行为
 * 例子：
 * @testable是一个修饰器，它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable
 * 修饰器本质上是编译时执行的函数
 * @decorator
 * classA{}
 * 等同于
 * classA{}
 * A= decorator(A) || A
 */

@testable
class MyTestableClass {
  constructor() {

  }
}
//target就是会被修饰的类
function testable (target) {
  target.isTestable = true
}

console.log(MyTestableClass.isTestable)

//添加实例属性
function testable (target) {
  target.prototype.isTestable = true
}

/**
 * 修饰器函数一共可以接受3个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象
 * 类似于Object.defineProperty
 * 修饰器不仅可以修饰类，还可以修饰类的属性
 * 例子：@log修饰器可以起到输出日志的作用。
 */
class Math {
  @log
  add (a, b) {
    return a + b
  }
}

function log (target, name, descriptor) {
  const oldValue = descriptor.value
  descriptor.value = function () {
    console.log(`Calling "${name}" with`, arguments)
    return oldValue.apply(null, arguments)
  }
  return descriptor
}
const math = new Math()
math.add(1, 2)

/**
 * 如果一个方法有多个修饰器，那么方法会从外到内进入修饰器，然后由内向外执行
 */
function dec (id) {
  console.log('evaluated', id)
  return (target, name, descriptor) => {
    console.log('executed', id)
  }
}

class Example {
  @dec(1)
  @dec(2)
  method () {
  }
}
/**
 * 修饰器只能用于类和类的方法，不能用于函数，因为存在变量提升
 * 类是不会被提升的，所以就没有这方面的问题
 */

/**
 * 修饰器的应用
 * 1）使用修饰器
 */