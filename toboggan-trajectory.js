const fs = require('fs');

function convertMapTextToArray(textFile) {
    const map = fs.readFileSync(textFile);
    return map.toString().split('\n');
}

function countTreesHit(map, movesRight, movesDown) {
    let treesHit = 0;
    const mapWidth = map[0].length;
    for (let i=0, j=0; i<map.length; i=i+movesDown, j++) {
        let columnPosition = j*movesRight % mapWidth;
        if (map[i][columnPosition] == "#") {
            treesHit += 1;
        }
    }
    return treesHit;
}

const lines = convertMapTextToArray('./map.txt');
const routes = [
    [1,1], [3,1], [5,1], [7,1], [1,2]
]

let multiplied = 1;
routes.forEach(route => {
    multiplied *= countTreesHit(lines, route[0], route[1]);
})

console.log(multiplied);