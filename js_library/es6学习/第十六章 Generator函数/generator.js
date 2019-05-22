/**
 * Generator函数是ES6提供的一种异步编程解决方案，执行Generator函数会返回一个遍历器对象。
 * 它除了是一个状态机，封装了多个内部状态。还是一个遍历器对象生成函数。返回的遍历器对象可以依次遍历Generator函数内部的每一个状态。
 */

function* helloGenerator() {
    yield 'hello';
    yield 'world';
    return 'end'
}

//gen是一个iterator对象
/**
 * Generator函数返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
 * value属性表示当前的内部状态的值，是yeild语句后面那个表达式的值，done属性是一个布尔值，表示是否遍历结束。
 * 只有调用next方法且内部指针指向该语句时才会执行yield语句后面的表达式。
 */
const gen = helloGenerator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

/**
 * 由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使该对象具有Iterator接口
 */
const myIterator = {};
myIterator[Symbol.iterator] = function*() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'd';
}

for (let item of myIterator) {
    console.log(item);
}

/**
 * next方法的参数
 * next方法可以带有一个参数，该参数会被当作上一条yeild语句的返回值。
 * 通过next就可以在Generator函数开始运行后继续向函数体内部注入值。可以在Generator函数开始运行后继续向函数体内部注入值。
 * 可以在gen函数运行的不同阶段从外部向内部注入不同的值，从而调整函数的行为。
 */

function* compute(x) {
    const y = (yield(x + 1));
    const z = (yield(y * 2));
    return (x + y + z);
}

const ger = compute(5);
console.log(ger.next());
console.log(ger.next(10));
console.log(ger.next(3));

/**
 * for of循环自动遍历Generator函数生成Iterator对象
 * 此时不再需要调用next方法,一旦next返回对象的done属性为true，for of循环就会种植，且不包含该返回对象。
 */
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
const fooger = foo()
for (let item of fooger) {
    console.log(item)
}

/**
 * 普通对象没有Iterator接口，所以无法使用for of遍历，可以通过Generator函数为其加上这个接口
 * 还可以将Generator函数加到对象的Symbol.iterator属性上
 */

const myObj = {
    name: 'zhunny',
    age: 17,
    sex: 'female'
}

function* objectEntries(obj) {
    const propKeys = Reflect.ownKeys(obj);
    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

for (let [key, value] of objectEntries(myObj)) {
    console.log(`${key}:${value}`)
}

/**
 * Gernerator.prototype.throw ,该函数返回的遍历器对象又一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。
 * 可以在函数体外抛出错误，然后在Generator函数体内捕获
 * Gernerator.prototype.return ，可以返回给定的值，并终结Generator函数的遍历
 * yield* :在Generator中调用另一个Generator函数,yield*后面的Generator函数不过是for...of的一种简写方式
 */

function* inner() {
    yield 'inner1';
    yield 'inner2';
}

function* outter() {
    yield 'outer1';
    yield* inner();
    yield 'outer2';
}
const star = outter();
console.log(star.next())
console.log(star.next())
console.log(star.next())
console.log(star.next())
console.log(star.next())


/**
 * Generator函数的异步应用
 * 异步：一个任务不是连续完成，可以理解为任务被分成两段，先执行第一段，然后转而执行其他任务，等做好准备后再回头执行第二段
 * 回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务时便直接调用这个函数。回调地狱。
 * promise：回调函数的改进，使用then方法以后，异步任务的两段执行更清晰了，控制反转再反转。问题是代码冗余，then的堆积。
 * Generator：yield命令是异步两个阶段的分界线，遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续向后执行。代码的写法非常像同步操作，如果去掉yield，几乎一模一样。
 * Generator函数将异步操作表示的很简洁，但是流程管理不方便，Thunk函数可以自动执行Generator函数。前提是跟yield命令后面的必须是Thunk函数，这是回调函数模式。
 * 也可以将异步操作包装成Promise对象，用then方法教回执行权。即Promise对象的自动执行器。
 */