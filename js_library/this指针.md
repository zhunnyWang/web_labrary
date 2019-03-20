&emsp;&emsp;读了《你不知道的JavaScript（上）》之后总结一下this指针，this到底是什么？它到底指向什么？
#### 什么是this指针？  
&emsp;&emsp;想知道this指针是什么。首先需要明白执行上下文的概念以及结构。我先简单介绍一下执行上下文，具体的介绍会另写一章。  
&emsp;&emsp;执行上下文是当前所执行的代码的运行环境，而Js的运行环境包括：全局环境，函数环境和eval（已经不推荐使用）。在执行不同的代码时，会进入当前代码的执行上下文。因此在执行一段Js程序时必然会产生多个执行上下文，Js引擎会用栈（执行上下文栈）这个数据结构来装载它们。  
&emsp;&emsp;浏览器首次加载脚本，全局环境对应的执行上下文入栈，且它永远都在栈底，每进入一个不同的代码片段（不同的作用域），它的执行上下文就会入栈，当该段代码执行完之后就会将它的执行上下文出栈。而执行代码的顺序就又是另一个知识点了，涉及到event loop事件循环。  
&emsp;&emsp;一个执行上下文可以将它抽象的看作一个对象object，它包含一些属性，VO（变量对象），作用域链以及this。  
&emsp;&emsp;现在我们可以知道this就是执行上下文的一个属性，会在函数执行的过程中用到。
#### this的指向
&emsp;&emsp;首先抛出一个重要的结论：*this既不指向函数自身也不指向函数的词法作用域。this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。*  
&emsp;&emsp;确定this的指向，也可以称为决定this的绑定对象。需要找到函数的调用位置之后，判断需要应用以下哪四条绑定规则：  
##### 1. 默认规则  

&emsp;&emsp;独立函数调用（函数调用时没有任何修饰），该函数的this指针指向全局环境。  

&emsp;&emsp;ES5环境下的非严格模式：

```
var a = 1;

function thisTo() {
    var a = 2;
    console.log(this.a);
}

thisTo();
```
&emsp;&emsp;在chrome控制台下测试结果输出1。

&emsp;&emsp;ES6环境下自动采用严格模式：

```
const a = 1;

function thisTo() {
    const a = 2;
    console.log(this.a);
}

thisTo();
```
&emsp;&emsp;在chrome控制台下测试结果为undefined。即严格模式下this会绑定到undefined。

##### 2. 隐式绑定   

&emsp;&emsp;函数被调用时，某一个对象拥有该函数引用，则该函数的this指向该对象。

&emsp;&emsp;ES5和ES6的结果相同，不再附上ES6的代码：
```
var a = 1;

var obj = {
    a: 2,
    thisTo: thisTo
};

function thisTo() {
    var a = 3;
    console.log(this.a);
}

obj.thisTo();
```
&emsp;&emsp;在chrome控制台下测试结果输出2。  
&emsp;&emsp;隐式绑定规则又下个问题，被隐式绑定的函数可能会丢失它的绑定对象，这时它会使用默认规则，将this指向全局对象或者undefined。

```
var a = 1;

var obj = {
    a: 2,
    thisTo: thisTo
};

function thisTo() {
    var a = 3;
    console.log(this.a);
}

var loseThis = obj.thisTo;

loseThis();
```
&emsp;&emsp;在chrome控制台下测试结果输出1。  
&emsp;&emsp;虽然loseThis是obj.thisTo的一个引用，但实际上，它引用的是thisTo，相当于一次独立函数调用，应用了默认规则。
&emsp;&emsp;类似于`function(obj.thisTo)`或者`setTimeout(obj.thisTo,100)`都是实际上引用了thisTo，应用了默认规则，因此我们应该尽可能的明确this的指向，让它固定绑定的在某个上下文对象上，不会因为某个意外而改变指向。  

##### 3. 显式绑定  

&emsp;&emsp;调用函数的call和apply方法，让某个对象强制调用该函数，使得函数的this指向该对象。call和apply的第一个参数是一个对象，在调用函数时会将this绑定到该对象上。  

```
var a = 1;

var obj = {
    a: 2,
};

function thisTo() {
    var a = 3;
    console.log(this.a);
}

thisTo.call(obj);
```
&emsp;&emsp;在chrome控制台下测试结果输出2。  
&emsp;&emsp;显式绑定仍然无法解决丢失绑定的问题：

```
var a = 1;

var obj1 = {
    a: 2,
};
var obj2 = {
    a: 4,
};

function thisTo() {
    var a = 3;
    console.log(this.a);
}

thisTo.call(obj1);
thisTo.call(obj2);
thisTo();
```
&emsp;&emsp;在chrome控制台下测试结果输出2,4,1。this绑定的对象会变化，可能在某些回调函数时不经意修改了this的绑定对象，造成this指向丢失。显式绑定的一个变种可以解决这个问题，它的this指向一经绑定就不能再修改。

```
var a = 1;

var obj1 = {
    a: 2,
};
var obj2 = {
    a: 4,
};

function thisTo() {
    var a = 3;
    console.log(this.a);
}

var hard = thisTo.bind(obj1);

hard();
setTimeout(hard, 1000);

hard.call(obj2);

hard = thisTo.bind(obj2);
hard();
```
&emsp;&emsp;在chrome控制台下测试结果输出2,2,4,2。上面一种方式创建了函数hard，它的内部强制将thisTo的this绑定到obj1。无论之后如何调用修饰函数hard，它都会在obj1上调用thisTo。但是将函数hard重新赋值，在它内部重新将thisTo的this绑定到obj2上是可以的。  

##### 4. new绑定

&emsp;&emsp;调用构造函数之后新创建的实力对象会绑定到函数调用的this上。  

```
function Cat(name) {
    this.name = name;
    this.miaow = function() {
        console.log(this.name + "miaomiaomiao")
    }
}

var cat1 = new Cat('kitty');

console.log(cat1.name);
cat1.miaow();

var cat2 = new Cat('tom');

console.log(cat2.name);
cat2.miaow();
```
&emsp;&emsp;控制台输出：

```
kitty
kittymiaomiaomiao
tom
tommiaomiaomiao
```
&emsp;&emsp;使用new来调用函数，会自动执行以下操作：  

（1）创建一个实例对象。  
（2）这个对象的[[prototype]]属性会和原型对象关联。  
（3）这个对象会绑定到函数调用的this。  
（4）返回这个实例对象。

##### 优先级
&emsp;&emsp;new绑定>显示绑定>隐式绑定>默认绑定
##### this的例外
&emsp;&emsp;上述四条规则已经可以包含所有正常的函数。但是ES6的箭头函数是个例外。它不使用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this。

