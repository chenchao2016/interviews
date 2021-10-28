Array.prototype.flat = function _flat() {
  return this.filter((v) => v !== undefined);
};
let p1 = new Promise(function (res, rej) {
  rej("111");
});
let p2 = new Promise(function (res, rej) {
  setTimeout(() => {
    res(2);
  }, 10);
});
let p3 = new Promise(function (res, rej) {
  res(3);
});

//题目：假设一下Promise其他所有函数都正常工作，但Promise.all功能失效了，我们现在就要为程序重写一个Promise.all。
function MyPromiseAll() {
  const args = Array.from(arguments)[0];
  const result = Array(args.length);
  return new Promise(function (res, rej) {
    args.forEach((p, index) => {
      p.then(function (v) {
        result[index] = v;
        // 等待所有的promise fulfulled后才去触发all的resolve
        if (result.flat().length === args.length) res(result);
      }).catch((r) => {
        rej(r);
      });
    });
  });
}
var myAll = MyPromiseAll([p1, p3, p2]);

myAll
  .then((r) => {
    console.log(r);
  })
  .catch((r) => {
    console.error(r);
  });

//题目：假设一下Promise其他所有函数都正常工作，但Promise.race功能失效了，我们现在就要为程序重写一个Promise.race。
function MyPromiseRace() {
  let isFulfilled = false;
  const args = Array.from(arguments)[0];
  return new Promise(function (res, rej) {
    args.forEach((p) => {
      p.then(
        (v) => {
          if (!isFulfilled) {
            res(v);
            isFulfilled = true;
          }
        },
        (r) => {
          if (!isFulfilled) {
            rej(r);
            isFulfilled = true;
          }
        }
      );
    });
  });
}

// var p = Promise.race([p3,p2,p1]);
// p.then(v => console.log(v)).catch(r => console.log(r));

var myPromiseRace = MyPromiseRace([p1,p3, p2]);
myPromiseRace.then((v) => console.log(v)).catch((r) => console.error(r));
