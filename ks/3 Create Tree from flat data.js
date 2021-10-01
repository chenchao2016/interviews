// 25 分钟
let flatData = [
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 5, name: "i3", parentId: 2 },
  { id: 8, name: "i8", parentId: 7 },
];

function createTree(flatData) {
  const list = [...flatData];
  let tree = {};
  list.some((v) => {
    if (!v.parentId) {
      tree = v;
      return true;
    }
  });
  function toTree(root) {
    const children = list.filter((item) => {
      if (item.parentId === root.id) {
        toTree(item);
        return true;
      }
    });
    if (!children.length) return;
    root.chidren = children;
  }
  toTree(tree);
  return tree;
};

const r = createTree(flatData);
console.log(r);