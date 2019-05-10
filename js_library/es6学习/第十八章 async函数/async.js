/**
 * async函数就是generator函数的语法糖
 * async函数将Generator函数的星号换成了async，将yield换成了await。
 * 改进：1）async自带执行器，执行看起来与普通函数一摸一样。2)更好的语义。
 * 3）更广的适用性，co模块规定，yeild后面只能是Thunk函数或Promise对象，await后面可以是Promise对象和原始类型的值。
 * 4）async函数的返回值是Promise对象，比Generator返回值是Iterator方便了许多。
 * async函数完全可以看作由多个异步操作包装成的一个Promise对象，而await命令就是内部then的语法糖。
 */

async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
    return 'end'
}

// asyncPrint('helloworld', 1000).then(v => console.log(v));


/**
 * 只要有一个await语句后面的Promise变成reject，那么整个async就会中断
 * 可以在await后面的Promise对象后添加一个catch方法，处理前面坑出现的错误，让async不要中断或者把所有的await语句放到try。。。catch中
 */

// async function text() {
//     await 1;
//     await Promise.resolve(2);
//     await Promise.reject('中断了');
//     await 3;
//     return 'end'
// }

// text().then(v => {
//     console.log(v)
// }).catch(e => {
//     console.log(e)
// })

// async function text2() {
//     await 1;
//     await Promise.resolve(2);
//     await Promise.reject('不会中断了').catch(e => console.log(e));
//     await 3;
//     return 'end'
// }

// text2().then(v => {
//     console.log(v)
// }).catch(e => {
//     console.log(e)
// })

async function text3() {
    try {
        await 1;
        await Promise.resolve(2);
        await Promise.reject('不会中断了')
        await 3;
    } catch (error) {
        console.log('error:' + error)
    }
    return 'end';
}

text3().then(v => {
    console.log(v)
}).catch(e => {
    console.log(e)
})


/**
 * async原理就是将Generator函数和自动执行器包装在一个函数里
 * 执行器就是自动next，直到next.done为true
 */

function run(genF) {
    const gen = genF();

    function step(nextF) {
        let next;
        try {
            next = nextF();
        } catch (e) {
            reject(e);
        }

        if (next.done) {
            return resolve(next.value);
        }
        Promise.resolve(next.value).then(function(v) {
            step(function() {
                return gen.next(v);
            })
        }, function(e) {
            step(function() {
                return gen.throw(e);
            })
        })
    }
    step(function() { return gen.next(undefined); })
}

function foo() {
    let a = 1;

    function bar() {
        a = a + 1;
        console.log(a)
    }
    bar();
    console.log(a)
}
foo()