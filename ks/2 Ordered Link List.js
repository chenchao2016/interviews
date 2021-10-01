// 1小时左右
const list1 = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 3, after: 1 },
  { id: 5, first: true },
  { id: 6, last: true },
  { id: 7, after: 8 },
  { id: 8 },
  { id: 9 },
];

function handleOrderLinkList(list = []) {
  const nodes = {};
  // 创建一个双链表
  list.forEach((item, index) => {
    const pre = index === 0 ? null : nodes[list[index - 1].id];
    const post =
      index === list.length - 1 ? null : (nodes[list[index + 1].id] = {});
    nodes[item.id] = Object.assign(nodes[item.id] || {}, {
      ...item,
      pre,
      post,
    });
  });

  const getPreOrPostId = function (isPre = true) {
    let id = null;
    Object.keys(nodes).some((key) => {
      if (nodes[key][isPre ? "pre" : "post"] === null) {
        id = key;
        return true;
      }
    });
    return id;
  };
  // 基于关键字调整顺序
  Object.keys(nodes).forEach((id) => {
    const { before, after } = nodes[id];
    let { first, last } = nodes[id];
    if (before !== undefined && before == getPreOrPostId()) first = true;
    if (after !== undefined && after == getPreOrPostId(false)) last = true;
    if (first) {
      const firstNodeid = before || getPreOrPostId();
      if (firstNodeid == id || firstNodeid === null) return;
      // 移出变动节点
      nodes[id].pre.post = nodes[id].post;
      if (nodes[id].post) nodes[id].post.pre = nodes[id].pre;
      // 更换位置
      nodes[id].pre = null;
      nodes[firstNodeid].pre = nodes[id];
      nodes[id].post = nodes[firstNodeid];
    } else if (last) {
      const lastNodeid = after || getPreOrPostId(false);
      if (lastNodeid == id || lastNodeid === null) return;
      // 移出变动节点
      if (nodes[id].pre) nodes[id].pre.post = nodes[id].post;
      nodes[id].post.pre = nodes[id].pre;
      // 更换位置
      nodes[id].post = null;
      nodes[id].pre = nodes[lastNodeid];
      nodes[lastNodeid].post = nodes[id];
    } else if (before !== undefined) {
      if (before == id) return;
      // 移出变动节点
      if (nodes[id].pre) nodes[id].pre.post = nodes[id].post;
      if (nodes[id].post) nodes[id].post.pre = nodes[id].pre;
      // 在before前插入节点
      nodes[before].pre.post = nodes[id];
      nodes[id].pre = nodes[before].pre;
      nodes[before].pre = nodes[id];
      nodes[id].post = nodes[before];
    } else if (after !== undefined) {
      if (after == id) return;
      // 移出变动节点
      if (nodes[id].pre) nodes[id].pre.post = nodes[id].post;
      if (nodes[id].post) nodes[id].post.pre = nodes[id].pre;
      // 在after前插入节点
      nodes[after].post.pre = nodes[id];
      nodes[id].post = nodes[after].post;
      nodes[id].pre = nodes[after];
      nodes[after].post = nodes[id];
    }
  });
  function printId(node) {
    if (!node) return;
    console.log(node.id);
    printId(node.post);
  }
  printId(nodes[getPreOrPostId()]);
  return nodes;
}

handleOrderLinkList(list1);