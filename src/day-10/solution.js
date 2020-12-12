const data = require("./data");

let dataArray = data.split("\n").map(a => Number(a));
dataArray.sort((a, b) => a - b);
dataArray = [...dataArray, dataArray[dataArray.length - 1] + 3];
console.log({ dataArray });

const part1 = dataArray => {
  const differences = dataArray.reduce(
    (acc, current, index, arr) => {
      if (index === 0) {
        acc[current]++;
      } else {
        acc[current - arr[index - 1]]++;
      }
      return acc;
    },
    { 1: 0, 2: 0, 3: 0 }
  );

  console.log(differences[1] * differences[3]);
};

part1(dataArray);

part2 = dataArray => {
  const cache = new Map();
  const calculateIndex = ({ arr, index, cache }) => {
    if (cache.get(index)) {
      return cache.get(index);
    }
    if (index < 0) {
      return 0;
    }

    // we need to calculate 1 / 2 / 3 cells back (depends on the difference):
    let result = 0;
    for (let i = index - 3; i < index; i++) {
      if (arr[i] + 3 >= arr[index]) {
        const currIndexResult = calculateIndex({ arr, index: i, cache });
        cache.set(i, currIndexResult);
        result += currIndexResult;
      }
    }
    if (arr[index] <= 3) {
      result += 1;
    }
    return result;
  };
  let lastIndex = dataArray.length - 1;
  result = calculateIndex({ arr: dataArray, index: lastIndex, cache });
  console.log({ part2: result });
  return result;
};

/*
n(151) = n(148) = n(147) + n(146) + n(145)
n(147) = n(146)  + n(145)
n(146) = n(145)
n(145) = n(142)
n(142) = n(141) + n(140) + n(139)
n.... = n(1) + n(2)

n(3) = n(2) + n(1) + 1 //we can start from 3.
n(2) = n(1) + 1 //we can start from 2.
n(1) = 1
*/

part2(dataArray);
