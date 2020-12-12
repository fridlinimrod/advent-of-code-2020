const dataArray = require("./data").split("\n");

// console.log({ dataArray });

const EMPTY_SEAT = "L";
const TAKEN_SEAT = "#";

const isSeatTaken = ({ dataArray, row, col }) => {
  if (row < 0 || row > dataArray.length - 1 || col < 0 || col > dataArray[row].length - 1) {
    return 0;
  }

  // console.log({ row, col, val: dataArray[row][col] });

  if (dataArray[row][col] === TAKEN_SEAT) {
    return 1;
  }

  return 0;
};

const whatSeeTopLeft = ({ matrix, row, col, cache }) => {
  let i = row - 1,
    j = col - 1;

  if (i < 0 || j < 0) {
    cache.set({ row, col }, EMPTY_SEAT);
    // console.log({ i, j, EMPTY_SEAT });

    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    // console.log({ i, j, TAKEN_SEAT });

    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    // console.log({ i, j, EMPTY_SEAT });
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }
  if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      // console.log({ i, j, res: cache.get({ row: i, col: j }) });

      return cache.get({ row: i, col: j });
    }
    // console.log({ i, j, res: whatSeeTopLeft({ matrix, row: i, col: j, cache }) });
    return whatSeeTopLeft({ matrix, row: i, col: j, cache });
  }
};

const whatSeeTop = ({ matrix, row, col, cache }) => {
  let i = row - 1,
    j = col;

  if (i < 0) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      return cache.get({ row: i, col: j });
    }
    return whatSeeTop({ matrix, row: i, col: j, cache });
  }
};

const whatSeeTopRight = ({ matrix, row, col, cache }) => {
  let i = row - 1,
    j = col + 1;

  if (i < 0 || j >= row.length) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      const res = cache.get({ row: i, col: j });
      cache.set({ row, col }, res);
      return res;
    }
    return whatSeeTopRight({ matrix, row: i, col: j, cache });
  }
};

const whatSeeLeft = ({ matrix, row, col, cache }) => {
  let i = row,
    j = col - 1;

  if (col < 0) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      const res = cache.get({ row: i, col: j });
      cache.set({ row, col }, res);
      return res;
    }
    return whatSeeLeft({ matrix, row: i, col: j, cache });
  }
};

const whatSeeRight = ({ matrix, row, col, cache }) => {
  let i = row,
    j = col + 1;

  if (j >= row.length) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      const res = cache.get({ row: i, col: j });
      cache.set({ row, col }, res);
      return res;
    }
    return whatSeeRight({ matrix, row: i, col: j, cache });
  }
};

const whatSeeBottomLeft = ({ matrix, row, col, cache }) => {
  let i = row + 1,
    j = col - 1;

  if (j < 0 || i >= matrix.length) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      const res = cache.get({ row: i, col: j });
      cache.set({ row, col }, res);
      return res;
    }
    return whatSeeBottomLeft({ matrix, row: i, col: j, cache });
  }
};

const whatSeeBottom = ({ matrix, row, col, cache }) => {
  let i = row + 1,
    j = col;

  if (i >= matrix.length) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      const res = cache.get({ row: i, col: j });
      cache.set({ row, col }, res);
      return res;
    }
    return whatSeeBottom({ matrix, row: i, col: j, cache });
  }
};

const whatSeeBottomRight = ({ matrix, row, col, cache }) => {
  let i = row + 1,
    j = col + 1;

  if (i >= matrix.length || j >= row.length) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  }

  if (matrix[i][j] === TAKEN_SEAT) {
    cache.set({ row, col }, TAKEN_SEAT);
    return TAKEN_SEAT;
  } else if (matrix[i][j] === EMPTY_SEAT) {
    cache.set({ row, col }, EMPTY_SEAT);
    return EMPTY_SEAT;
  } else if (matrix[i][j] === ".") {
    if (cache.get({ row: i, col: j })) {
      const res = cache.get({ row: i, col: j });
      cache.set({ row, col }, res);
      return res;
    }
    return whatSeeBottomRight({ matrix, row: i, col: j, cache });
  }
};

const countTakenSeatsNearBy = ({ matrix, row, col, cache }) => {
  let counter = 0;
  if (whatSeeTopLeft({ matrix, row, col, cache: cache.topLeft }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeTop({ matrix, row, col, cache: cache.top }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeTopRight({ matrix, row, col, cache: cache.topRight }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeLeft({ matrix, row, col, cache: cache.left }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeRight({ matrix, row, col, cache: cache.right }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeBottomLeft({ matrix, row, col, cache: cache.bottomLeft }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeBottom({ matrix, row, col, cache: cache.bottomLeft }) === TAKEN_SEAT) {
    counter++;
  }

  if (whatSeeBottomRight({ matrix, row, col, cache: cache.bottomRight }) === TAKEN_SEAT) {
    counter++;
  }
  return counter;
};

const calculateNextMatrix = (matrix, cache) => {
  const matrixCopy = [...matrix].map(arr => [...arr]);
  console.log({ before: matrixCopy.map(a => a.join("")) });

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === TAKEN_SEAT) {
        const numOfTaken = countTakenSeatsNearBy({ matrix, row: i, col: j, cache });
        if (numOfTaken >= 5) {
          matrixCopy[i][j] = EMPTY_SEAT;
        }
      } else if (matrix[i][j] === EMPTY_SEAT) {
        const numOfTaken = countTakenSeatsNearBy({ matrix, row: i, col: j, cache });
        if (numOfTaken === 0) {
          matrixCopy[i][j] = TAKEN_SEAT;
        }
      }
    }
  }

  console.log({ after: matrixCopy.map(a => a.join("")) });
  return matrixCopy;
};

const areEqual = (m1, m2) => {
  let equal = true;
  for (let i = 0; i < m1.length; i++) {
    for (let j = 0; j < m1[i].length; j++) {
      if (m1[i][j] !== m2[i][j]) {
        equal = false;
      }
    }
  }

  console.log({ equal });
  return equal;
};

const part1 = matrix => {
  let cache = {
    topLeft: new Map(),
    top: new Map(),
    topRight: new Map(),
    left: new Map(),
    right: new Map(),
    bottomLeft: new Map(),
    bottom: new Map(),
    bottomRight: new Map()
  };

  let currMatrix = [...matrix].map(str => str.split(""));
  let nextMatrix = calculateNextMatrix(currMatrix, cache);
  // console.log({ currMatrix, nextMatrix });
  while (!areEqual(currMatrix, nextMatrix)) {
    currMatrix = nextMatrix;
    nextMatrix = calculateNextMatrix(nextMatrix, cache);
    // console.log({ curr: currMatrix.map(a => a.join("")), next: nextMatrix.map(a => a.join("")) });
  }
  // console.log({ currMatrix: currMatrix.map(a => a.join("")) });
  let counter = 0;
  for (i = 0; i < currMatrix.length; i++) {
    for (j = 0; j < currMatrix[i].length; j++) {
      if (currMatrix[i][j] === TAKEN_SEAT) {
        counter++;
      }
    }
  }

  console.log({ counter });
};

part1(dataArray);
/**
 * #.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
 */
