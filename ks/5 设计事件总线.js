// 20分钟
const utils = {
  isArray(array) {
    return Object.prototype.toString.call(array).indexOf("Array") > -1;
  },
  isFunction(fn) {
    return Object.prototype.toString.call(fn).indexOf("Function") > -1;
  },
};
function Bus() {
  this.events = {};
}

Bus.prototype.listen = function (eventType, cb) {
  if (!utils.isFunction(cb))
    throw new Error(" params callback must be a function!");
  if (!this.events[eventType]) {
    this.events[eventType] = [cb];
    return;
  }
  let duplicateIndex = null;
  this.events[eventType].some((fn, index) => {
    if (fn === cb) {
      duplicateIndex = index;
      return true;
    }
  });
  if (duplicateIndex !== null) this.events[eventType].splice(duplicateIndex, 1);
  this.events[eventType].push(cb);
};

Bus.prototype.off = function (eventType, cb) {
  if (cb) {
    this.events[eventType] = this.events[eventType].filter((fn) => fn !== cb);
  } else {
    this.events[eventType] = [];
  }
};

Bus.prototype.trigger = function (eventType, args) {
  if (utils.isArray(this.events[eventType])) {
    this.events[eventType].forEach((eventCb) => {
      eventCb.call(this, args);
    });
  }
};

var bus = new Bus();

bus.listen("event1", function (params) {
  console.log("event1 in", params);
  this.trigger("event2", "from event1");
  console.log("event1 out", params);
});
bus.listen("event2", function name(params) {
  console.log("event2 enter", params);
});

bus.trigger("event1", '事件总线-方案二');
