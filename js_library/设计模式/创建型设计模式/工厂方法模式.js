/**
 * 简单工厂模式遇到的问题是每添加一个类就要修改两处。工厂方法模式，每需要一个类，只需要添加这个类就可以。
 * 工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。
 * 但是在JavaScript中很难像传统面向对象那样去实现创建抽象类。
 * 所以在JavaScript中我们只需要参考它的核心思想即可。
 * 我们可以将工厂方法看作是一个实例化对象的工厂类。
 */

//安全模式 es5需要 es6 class必须new
function Demo () {
  if (!(this instanceof Demo)) {
    return new Demo()
  }
}

const demo = Demo()
console.log(demo instanceof Demo)

//安全模式创建的工厂方法函数
let UserFactory = function (role) {
  if (this instanceof UserFactory) {
    var s = new this[role]();
    return s;
  } else {
    return new UserFactory(role);
  }
}

//工厂方法函数的原型中设置所有对象的构造函数
UserFactory.prototype = {
  SuperAdmin: function () {
    this.name = "超级管理员",
      this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
  },
  Admin: function () {
    this.name = "管理员",
      this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
  },
  NormalUser: function () {
    this.name = '普通用户',
      this.viewPage = ['首页', '通讯录', '发现页']
  }
}

//调用
let superAdmin = UserFactory('SuperAdmin');
let admin = UserFactory('Admin')
let normalUser = UserFactory('NormalUser')

/**
 * 工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。
 * 但是JavaScript的abstract是一个保留字，并没有提供抽象类，所以之前我们只是借鉴了工厂方法模式的核心思想。
 * 虽然ES6也没有实现abstract，但是我们可以使用new.target来模拟出抽象类。
 * new.target指向直接被new执行的构造函数，我们对new.target进行判断，如果指向了该类则抛出错误来使得该类成为抽象类。下面我们来改造代码。
 */
class User {
  constructor(name = '', viewPage = []) {
    if (new.target === User) {
      throw new Error('抽象类不能实例化!');
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create (role) {
    switch (role) {
      case 'superAdmin':
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理']);
      case 'admin':
        return new UserFactory('普通用户', ['首页', '通讯录', '发现页']);
      case 'user':
        return new UserFactory('普通用户', ['首页', '通讯录', '发现页']);
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');