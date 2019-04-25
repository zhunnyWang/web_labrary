/**
 * Set 类似于数组 但是成员的值都是唯一的，没有重复
 */

const set1 = new Set([1, 2, 3, 1]);
console.log(set1)

const set2 = new Set();
//set的add方法向set中加入元素
[1, 1, 2, 3, 4, 1, 3].forEach(v => {
    set2.add(v);
})
for (let item of set2) {
    console.log(item)
}

//set的长度为size
console.log(set1.size)
    //set转换为数组的方法
console.log([...set1])

//一种数组去重的方式
console.log([...new Set([2, 5, 5, 4, 3, 2, 1])])
    /**
     * Set实例有两大类方法 操作方法和遍历方法
     * 操作方法：add，delete，has，clear
     */

//add
const set = new Set();
set.add(1).add(2).add(1);
console.log([...set])

//size
console.log(set.size);

//delete
set.delete(1)
console.log([...set]);

//has
set.add(3).add(4).add(7);
console.log(set.has(1))
console.log(set.has(2))
console.log(set.has(3))
console.log(set.has(4))
console.log(set.has(7))

//clear 清空set
set.clear()
console.log([...set])

//Array.from可以将set转换为数组，因此又提供一种数组去重的方式
console.log(Array.from(new Set([1, 2, 4, 2, 1, 3])))

/**
 * Set的遍历方法：keys，values，entries，forEach
 */

//因为set只有键值，所以keys方法和values方法行为一致
const set = new Set(['red', 'green', 'yellow'])

//默认的遍历器函数就是它的values方式，直接用let...of
for (let item of set) {
    console.log(item)
}
for (let key of set.keys()) {
    console.log(key)
}
for (let value of set.values()) {
    console.log(value)
}
for (let [key, value] of set.entries()) {
    console.log(key, value)
}
//forEach方式没有返回值，就是一个处理函数
set.forEach(v => {
        console.log(v + 'color')
    })
    //...内部使用for...of循环，因此也可以用于set结构，数组的map和filter方法也可用于set
    /**
     * WeakSet结构
     * 特点：
     * 1）成员只能是对象，而不能是其他的类型
     * 2）WeakSet中的对象都是弱引用，即垃圾回收机制不开绿WeakSet对该对象的引用
     * 因此WeakSet的成员不适合引用，WeakSet不可遍历
     * 因此WeakSet只有add，delete和has方法
     */
const ws = new WeakSet()
let a = [1, 2];
let b = [3, 4]
ws.add(a)
ws.add(b)

//ws没有iterator接口，所以不能遍历
// console.log([...ws]);
console.log(ws.has(a))
console.log(ws.has(b))

ws.delete(a);
console.log(ws.has(a))

/**
 * Map js的对象本质上是键值对的集合（Hash结构），但是只能用字符串或Symbol类型的值作为键
 * Map类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以当做键，是一种更完善的Hash结构实现
 */

const map = new Map(
    [
        [{ a: 1 }, { b: 1 }],
        ['name', 'wang']
    ]
)

//引用类型这样是取不出来的,只有对同一个对象的引用，Map结构才将其视为同一个键。
console.log(map.get({ a: 1 }))
console.log(map.get('name'))

const o = { p: "hello world" }
map.set(o, 'content')
console.log(map.get(o))

console.log(map.has(o))
map.delete(o)
console.log(map.has(o))

//任何具有Iterator接口且每个成员都是一个双元素数组的数据结构都可以当作map构造函数的参数，set和map都可以用来生成新的map

const set = new Set([
    ['foo', 1],
    ['bar', 2]
])
const m1 = new Map(set)
console.log(m1.get('foo'))

const m2 = new Map([
    ['baz', 3]
])
const m3 = new Map(m2)
console.log(m3.get('baz'))

/**
 * 同样对象的值的两个实例在Map结构中被视为两个键，他们和内存地址绑定，只要内存地址不一样就可以视为两个键，这就解决了同名属性碰撞问题
 */

const m4 = new Map()
const k1 = ['a']
const k2 = ['b']
m4.set(k1, 1)
m4.set(k2, 2)
console.log(m4.get(k1))
console.log(m4.get(k2))

/**
 * map的属性和操作方法：size，set，get，has，delete，has
 * 遍历方法：keys，values，entries和forEach
 */

const map = new Map([
    ['color', 'red'],
    ['age', 18],
    ['sex', 'girl']
])
for (let item of map.keys()) {
    console.log(item)
}
for (let value of map.values()) {
    console.log(value)
}
for (let [key, value] of map.entries()) {
    console.log(key, value)
}
//等同于entries()方法
for (let item of map) {
    console.log(item)
}

//结合数组的map，filter方法，可以实现map的遍历和过滤
const map = new Map().set(1, 'a').set(2, 'b').set(3, 'c')
const map1 = new Map([...map].filter(([k, v]) => k < 3))
console.log([...map1])
const map2 = new Map([...map].map(([k, v]) => {
    return [k * 2, '_' + v]
}))
console.log([...map2])

/**
 * WeakMap,特点：只接受对象作为键名，键名所指的对象不计入垃圾回收机制
 * WeakMap不能遍历，只有get，set，has，delete方法
 * 没有所有遍历方法和size属性
 */