const data = require('./data');
const dataArray = data.split('\n').map(num => Number(num));

console.log({dataArray})

const preamble = 25;
let index = preamble;
let res = -1;

const part1 = (dataArray) => {
  while (preamble < dataArray.length) {
    let valid = false;
    for (let i= index - preamble; i < index-1 ; i++) {
      for (let j= i+1 ; j< index; j++) {
        if (dataArray[i] !== dataArray[j] && dataArray[i] + dataArray[j] === dataArray[index]) {
          console.log(`i = ${i} (${dataArray[i]}), j = ${j} (${dataArray[j]}), sum = ${dataArray[i] + dataArray[j]}, index = ${index}, val = ${dataArray[preamble]}`);
  
          valid = true;
        }
      }
    }
  
    if (!valid) {
      console.log('not valid');
      console.log({index, val: dataArray[index]})
      res = {val : dataArray[index], index};
    }
    if (res !== -1) {
      break;
    }
    index++;
  }

  return res;
}

console.log(part1(dataArray));

const sumRange = ({arr, left, right}) => {
  let sum = 0;
  for (let i = left; i<= right; i++) {
    sum += arr[i];
  }

  return sum;
}

const findSmallestAndLargestInRange = ({arr, left, right}) => {
  const relevantArray = arr.slice(left, right +1)
  return relevantArray.reduce((acc,curr) => {
    if (curr < acc.small) {
      return {...acc, small: curr}
    }

    if (curr > acc.big) {
      return {...acc, big: curr}
    }

    return acc;
  }, {small: Infinity, big: 0})
}



const part2 = () => {
  const {val, index} = part1(dataArray);
  let found = false;
  let left = 0, right=1, sum, currentSum;
  
  while (!found) {
    currentSum = sumRange({arr: dataArray, left, right});
    if (currentSum === val) {
      console.log({left, right});
      console.log({answer: findSmallestAndLargestInRange({arr:dataArray, left, right})});
      found = true;
    }
    console.log({currentSum});
    if (currentSum > val) {
      left++;
    } else if (currentSum < val) {
      right++
    }
  }
}

part2();
