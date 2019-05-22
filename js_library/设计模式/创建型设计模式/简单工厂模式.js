/**
 * 简单工厂模式，又叫静态工厂方法，由一个工厂对象决定创建够一种产品对象类的实例。主要用于创建同一类对象
 * 简单工厂类模式的理念就是创建对象，对不同的类实例化，还可以用来创建相似对象
 * 简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。
 * 但是在函数内包含了所有对象的创建逻辑（构造函数）和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。
 * 当我们的对象不是上面的3个而是30个或更多时，这个函数会成为一个庞大的超级函数，便得难以维护。
 * 所以，简单工厂只能作用于创建的对象数量较少，对象的创建逻辑不复杂时使用。
 */

//对不同的类实例化，通过类实例化对象创建

let UserFactory = function (role) {
  function SuperAdmin () {
    this.name = "超级管理员",
      this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
  }
  function Admin () {
    this.name = "管理员",
      this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
  }
  function NormalUser () {
    this.name = '普通用户',
      this.viewPage = ['首页', '通讯录', '发现页']
  }

  switch (role) {
    case 'superAdmin':
      return new SuperAdmin();
    case 'admin':
      return new Admin();
    case 'user':
      return new NormalUser();
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user');
  }
}

//调用
let superAdmin = UserFactory('superAdmin');
let admin = UserFactory('admin')
let normalUser = UserFactory('user')

//优化
let UserFactory = function (role) {
  function User (opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  switch (role) {
    case 'superAdmin':
      return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
    case 'admin':
      return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
    case 'user':
      return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user')
  }
}

//调用
let superAdmin = UserFactory('superAdmin');
let admin = UserFactory('admin')
let normalUser = UserFactory('user')


//es6写法
//User类
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance (role) {
    switch (role) {
      case 'superAdmin':
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
//创建一个新对象然后包装增强其属性和功能来实现

function createBall (type, intro, member) {
  const o = new Object()
  o.type = type
  o.intro = intro
  o.getMembers = function () {
    console.log(`每个队伍需要${member}`)
  }
  return o
}

const basketb = createBall('basketball', '篮球盛行于美国', '五个人')
console.log(basketb.intro)
basketb.getMembers()