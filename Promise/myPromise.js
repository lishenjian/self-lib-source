/* 
  1、Promise 是一个类，再执行这个类的时候需要传递一个执行器，执行器会立即执行
  2、Promise 中有三种状态（成功：fulfilled；失败：rejected；等待pending）。一旦状态确定就不能改变
  3、resolve 和 reject 函数式用来更改状态的
  4、then 方法中判断状态
    1）如果状态式成功则调用成功回调
    2）如果失败则调用失败回调
  5、处理异步任务情况
  6、then 方法会多次调用
*/

//使用常量代表状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECT = 'reject';

class MyPromise {
  constructor(performer) {  //步骤 1
    performer(this.resolve, this.reject);
  }
  //设置实例属性初始状态
  status = PENDING;       //步骤 2

  //resolve传参值
  successMsg = '';
  //reject 传参
  errorMsf = '';

  //成功回调 使用数组处理 then 的多次调用（步骤5/6）
  successCallback = [];
  //失败回调
  errorCallback = [];

  // 当调用静态或原型方法时没有指定 this 的值，那么方法内的 this 值将被置为 undefined;
  resolve = (value)=> {   //这里为了以后获取 this 使用箭头函数形式定义 resolve 原型方法   //步骤 3
    if(this.status !== PENDING)  return;   //如果状态不是等待，阻止程序执行
    this.status = FULFILLED;
    this.successMsg = value;

    //判断成功回调是否存在 （步骤5/6）
    // this.successCallback && this.successCallback(this.successMsg)
    while(this.successCallback.length) this.successCallback.shift()(this.successMsg)
  }

  //原型方法 reject
  reject = (value)=> {  //步骤 3
    if(this.status !== PENDING)  return;
    this.status = REJECT;
    this.errorMsf = value;

    //判断成功回调是否存在 （步骤5/6）
    // this.errorCallback && this.errorCallback(this.errorMsf)
    while(this.errorCallback.length) this.errorCallback.shift()(this.errorMsf)
  }
  then = (success, error)=>{        //步骤 4
    if(this.status === FULFILLED) {
      success(this.successMsg);
    }else if(this.status === REJECT) {
      error(this.errorMsf);
    }else {           //处理异步情况 （步骤5/6）
      //then会多次调用。将成功回调和失败回调存储起来，
      this.successCallback.push(success);
      this.errorCallback.push(error);
    }
  }
}

module.exports = MyPromise;