/**
 * Proxy用于修改某些操作的默认行为，等同于在语言层面作出修改，所以属于一种元编程，即对编程语言进行编程
 * 可以理解为在目标对象前架设一个拦截层，外界对该对象的访问必须先通过这层拦截，因此提供了一种机制可以对外界的访问进行过滤和改写
 * Es6原生提供了Proxy构造函数，用于生成Proxy实例 var proxy = new Proxy(target, handler)
 * target参数表示要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为，生成的proxy就是一个带拦截器的新对象
 */

var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
})
console.log(proxy.name)

/**
 * Proxy可以拦截的行为：
 * 1）get(target,propKey,receiver) 拦截对象属性的读取
 * 可以实现链式使用函数名的效果，可以实现一个生成各种DOM节点的通用函数，拦截实现数组读取负数索引
 * 如果一个属性不可配置或不可写，则该属性不能被代理
 */

const dom = new Proxy({}, {
    get: function(target, propKey) {
        return (args = {}, ...children) => {
            const el = document.createElement(propKey);
            Object.keys(args).forEach(at => {
                el.setAttribute(at, args[at])
            })
            children.forEach((cd => {
                if (typeof cd === 'string') {
                    cd = document.createTextNode(cd)
                }
                //不论是什么类型节点，因此加入父节点
                el.appendChild(cd)
            }))
            return el
        }
    }
})
const el = dom.div({},
    'Hello,my name is',
    dom.a({ href: '//example.com' }, 'Mark'))

/**
 * 2）set(target,propKey,value,receiver)方法用于拦截某个属性的赋值操作，可以给某个属性值增加限定条件
 * set方法还可以实现数据绑定，会自动更新DOM
 */

const preson = new Proxy({}, {
    set: function(target, propKey, value, receiver) {
        if (propKey === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid')
            }
            target[propKey] = value
        }
    }
})

preson.age = 100;
preson.age = 300;

/**
 * 3)apply(target,object,args) 拦截Proxy实例，并将其作为函数调用的操作
 * 拦截函数的调用，call和apply操作 三个参数分别是目标对象，目标对象的上下文，目标对象的参数数组
 * target经常是一个函数，函数也是对象
 */

const newF = new Proxy(function() {
    return 'I am the target'
}, {
    apply() {
        return 'i am the proxy'
    }
})
console.log(newF()) //'i am the proxy'

/**
 * 4)has(target, propKey) 拦截HasProperty操作，判断某个对象是否具有某个属性时会生效
 * 拦截propKey in target 的操作，返回一个布尔值
 */
const handler = {
    has: function(target, propKey) {
        if (propKey[0] === '_') {
            return false
        }
        return propKey in target
    }
}
const target = {
    _prop: 'foo',
    prop: 'bar'
}
const proxy1 = new Proxy(target, handler)

//has拦截对for in循环不生效
for (let item in proxy1) {
    console.log(item)
}
console.log("_prop" in target) //true
console.log("_prop" in proxy1) //false
console.log(proxy1._prop) //get操作和set操作也可以设置拦截私有属性

/**
 * 5）construct(target, args) 方法用于拦截new命令，
 * target 为目标对象 args为构建函数的参数
 * construct 函数返回的必须是一个对象，否则会报错
 */

const p = new Proxy(function() {}, {
    construct(target, args) {
        console.log('called:' + args.join(', '))
        return { value: args[0] * 10 }
    }
})
console.log((new p(1)).value)

/**
 * 6)deletProperty(target,propKey)拦截delete target[propKey]的操作，返回一个布尔值
 * 如果这个方法返回false或者抛出错误，当前属性就不能被delete命令删除
 */

const handler = {
    deleteProperty(target, propKey) {
        if (propKey[0] === '_') {
            console.log("i am here")
            throw new Error(`Invaild attempt to delete private "${propKey}" property`)
        }
        return true
    }
}
const target = {
    _prop: 'foo',
    prop: 'bar'
}
const proxy = new Proxy(target, handler)
delete proxy.prop
console.log(proxy)
delete proxy._prop

/**
 * 7）defineProperty(target,propKey,propDesc) 拦截属性描述符的设置，返回一个布尔值
 * 8）getOwnPropertyDescriptor(target,propKey) 拦截Object.getOwnPropertyDescriptor方法，返回属性的描述对象
 * 9）getProptotypeOf(target) 拦截获取对象原型的方法，返回一个对象
 * 10）setProptotypeOf(target，proto) 拦截设置对象原型的方法，返回布尔值
 */

/**
 * 11）ownKeys(target) 拦截所有获取对象自身属性的方法
 */

const target = {
    a: 1,
    b: 2,
    c: 3
}
const handler = {
    ownKeys(target) {
        return ['a']
    }
}
const proxy = new Proxy(target, handler)

console.log(Object.keys(proxy))

/**
 * Proxy的this问题，在Proxy代理的情况下，目标对象内部的this关键字会指向Proxy代理
 * 有些原声对象内部属性只有通过正确的this才能获取，所以Proxy无法代理，若想代理，将this绑定原始对象
 */