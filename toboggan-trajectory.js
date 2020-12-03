const fs = require('fs');

function convertMapTextToArray(textFile) {
    const map = fs.readFileSync(textFile);
    return map.toString().split('\n');
}

function makeMapRequiredWidth(mapArray, movesRight, movesDown) {
    const mapLength = mapArray.length;
    const requiredWidth = (mapLength * movesRight)/movesDown;

    let entireMapArray = []; 
    mapArray.forEach(line => {
        for (let i=0; line.length<=requiredWidth; i++) {
            line += line[i];
        }
        entireMapArray.push(line);
    });

    return entireMapArray;
}

function countTreesHit(map, movesRight, movesDown) {
    let treesHit = 0;

    for (let i=0, j=0; i<map.length; i=i+movesDown, j++) {
        if (map[i][j*movesRight] == "#") {
            treesHit += 1;
        }
    }
    return treesHit;
}

function mapTobogganRouteAndCountTreesHit(mapArray, movesRight, movesDown) {
    const entireMapArray = makeMapRequiredWidth(mapArray, movesRight, movesDown);
    return countTreesHit(entireMapArray, movesRight, movesDown);
}

const lines = convertMapTextToArray('./map.txt');
// const entireMapArray = makeMapRequiredWidth(lines, 3, 1);
// const treesHit = countTreesHit(entireMapArray, 3, 1);
const route1 = mapTobogganRouteAndCountTreesHit(lines, 1, 1);
const route2 = mapTobogganRouteAndCountTreesHit(lines, 3, 1);
const route3 = mapTobogganRouteAndCountTreesHit(lines, 5, 1);
const route4 = mapTobogganRouteAndCountTreesHit(lines, 7, 1);
const route5 = mapTobogganRouteAndCountTreesHit(lines, 1, 2);

const multiplied = route1 * route2 * route3 * route4 * route5;
console.log(multiplied);