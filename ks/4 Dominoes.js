// 40分钟
const dominoesCase1 =
  "(1, 2), (5, 3), (3, 1), (1, 2), (2, 4), (1, 6), (2, 3), (3, 4), (5, 6)";
const dominoesCase2 = "(2,1),(2,3),(1,3),(2,2),(7,3)";

function dominoes(inputDominoesString) {
  const dominoesMap = {};
  let dominoesSetLength = 0;
  const generateOrderedMap = () => {
    const unorderedDominoesList = inputDominoesString
      .replace(/\s*/g, "")
      .match(/\(\d,\d\)/g);
    dominoesSetLength = unorderedDominoesList.length;
    unorderedDominoesList.map((data, index) => {
      const set = data.match(/\d/g);
      dominoesMap[index] = {
        visited: !index, // 第一个设置为true
        set,
      };
    });
  };
  generateOrderedMap();
  const firstDominoe = dominoesMap[0];
  const sortedSets = [firstDominoe.set];
  const getMinimumSet = (sets) => {
    let [minimunSet] = sets;
    sets.forEach((data) => {
      if (minimunSet.set.join("") > data.set.join("")) minimunSet = data;
    });
    return minimunSet;
  };
  const handleSortSets = (item) => {
    const [, end] = item.set;
    const matchedSubSets = [];
    Object.keys(dominoesMap).forEach((key) => {
      if (dominoesMap[key].visited) return;
      const { set } = dominoesMap[key];
      const indexValue = set.indexOf(end); // 0 正序，1逆序
      if (indexValue > -1) {
        matchedSubSets.push({
          key,
          set: indexValue ? set.reverse() : set,
        });
      }
    });
    if (!matchedSubSets.length) return;
    // 从匹配集合中找最小值，同理，也可以找最大值
    const minimumSet = getMinimumSet(matchedSubSets);
    dominoesMap[minimumSet.key].visited = true;
    sortedSets.push(minimumSet.set);
    handleSortSets({ ...dominoesMap[minimumSet.key] });
  };
  handleSortSets(firstDominoe);
  const outputDominoesString = sortedSets
    .map((set) => `(${set.join(",")})`)
    .join(",");
  const [firstHead] = sortedSets[0];
  const [, lastEnd] = sortedSets[sortedSets.length - 1];
  if (firstHead !== lastEnd) {
    throw new Error(
      `For stones ${inputDominoesString}, the resulting chain is not valid: ${outputDominoesString}'s first and last numbers are not the same. ${lastEnd}!==${firstHead}.`
    );
  } else if (sortedSets.length !== dominoesSetLength) {
    throw new Error(
      `For stones ${inputDominoesString}, the resulting chain's length is not equal with ${outputDominoesString}'s. `
    );
  } else {
    return outputDominoesString;
  }
}

const r = dominoes(dominoesCase1);
console.log(r);
