# self-lib-source
个人手写方法库加深对原理的了解
# [Promise](https://github.com/lishenjian/self-lib-source/blob/master/Promise/myPromise.js)

## Promise 对象
promise 是一个对象，因此 Promise 作为构造函数使用，参数是一个执行器，会立即执行调用。执行过程中通过执行器的两个参数：resolve 和 reject 来改变成功或失败状态。这两个为 Promise 对象的原型方法。

## 三种状态
- pending（等待）
- fulfilled （已成功）
- rejected （已失败）

> promise 的状态不受外界影响，一旦状态改变，就不会再次修改

## 原型方法（实例方法）

### resolve

### rejected

### then
then 接收两个回调方法，成功和失败
```js
 let promise = new Promise((resolve, rejected)=>{
    resolve('执行成功');
 });
 promise.then((res)=>{
   console.log('成功返回');
 }, (error)=>{
    console.log('失败返回');
 })
```

### catch
Promise.prototype.catch()方法是promise.then(null, rejection)或promise.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

### finally
```js
 let promise = new Promise((resolve, rejected)=>{
    resolve('执行成功');
 });
 promise.then((res)=>{
   console.log('成功返回');
 }, (error)=>{
    console.log('失败返回');
 }).finally(()=>{
   console.log('这里始终会执行');
 })
```
## 静态方法

### all
Promise.all()执行多个 Promise 实例，返回一个新的 Promise 实例。参数是一个 Promise 数组。
```js
let pro = Promise.all([pro1, pro2, pro3]);
```

all 返回的Promise 对象的状态由参数中的 Promise 状态决定：
- pro1， pro2， pro3 都为fulfilled，pro 才为 fulfilled。pro 的回调参数为三个参数的返回值组成的数组；
- 如果三个参数中有一个 状态变为 rejected，pro 的状态则变为 rejected。pro 回调为第一个状态为 rejected 的返回值；

### race

```js
let pro = Promise.race([pro1, pro2, pro3]);
```
- 和 Promise.all() 用法相同，只不过只要 参数中只要有一个 状态改变，pro 的状态就会改变；

### allSettled

都返回时才返回

### any
只要有一个为 成功，就变成成功。都为失败才失败；

### resolve
将现有对象转为 Promise 对象

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

### reject
```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 
```