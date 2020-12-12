const rules = require("./day6-data").data;
const rulesArray = rules.split("\n");
const rulesMap = new Map();

rulesArray.forEach(rule => {
  const splitRule = rule.split("contain").map(rp => rp.trim());
  const leftPart = splitRule[0].split(" bag").map(p => p.trim())[0];
  rulesMap.set(leftPart, splitRule[1]);
});

const parseRule = rule => {
  const ruleParts = rule
    .split(",")
    .map(p => p.trim())
    .map(rulePart => {
      const splitRulePart = rulePart.split(" bag").map(p => p.trim());
      return splitRulePart[0];
    });
  return ruleParts.map(miniRule => {
    const number = Number(miniRule[0]);
    const color = miniRule.slice(1).trim();
    if (isNaN(number)) {
      console.log("is NaN returning 0");
      return { number: 0, color: false };
    }
    console.log(`returning ${number}`);
    return {
      number,
      color
    };
  });
};

const getNumberOfBagsForColor = ({ count = 0, bagColor }) => {
  const rule = rulesMap.get(bagColor);
  const colorsAndNumbers = parseRule(rule);

  const res = colorsAndNumbers.reduce((sum, c) => {
    if (c.color) {
      console.log({ count });
      return sum + c.number + c.number * getNumberOfBagsForColor({ count, bagColor: c.color });
    }

    return sum + c.number;
  }, count);

  // console.log({ colorsAndNumbers, count });
  return res;
};

console.log(getNumberOfBagsForColor({ bagColor: "shiny gold" }));

const part2 = () => {};
