/* 
  index.js 入口文件，负责测试手写代码是否正常运行
*/
let MyPromise = require('./Promise/myPromise.js');

let promise = new MyPromise((resolve, reject)=>{
  // resolve('执行成功');
  // reject('失败')
  setTimeout(()=>{
    resolve('执行成功');
    // reject('失败')
  }, 2000)
})

promise.then((res)=>{
  console.log(res);
}, (error)=>{
  console.log(error);
})

promise.then((res)=>{
  console.log(res);
}, (error)=>{
  console.log(error);
})

promise.then((res)=>{
  console.log(res);
}, (error)=>{
  console.log(error);
})