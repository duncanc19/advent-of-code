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

const routes = [
    [1,1], [3,1], [5,1], [7,1], [1,2]
]

let multiplied = 1;
routes.forEach(route => {
    multiplied *= mapTobogganRouteAndCountTreesHit(lines, route[0], route[1]);
})

console.log(multiplied);