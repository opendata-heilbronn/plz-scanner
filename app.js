const fs = require("fs");
const kdbush = require("kdbush");
const geokdbush = require('geokdbush');


const plzData = fs.readFileSync("PLZ.tab").toString("ascii");
const lines = plzData.split("\n");

const result = {};
const pointToPlz = {};

const points = [];
const plzs = [];

lines.forEach((line, index) => {
    if (index > 0) {
        const lineContent = line.split("\t");
        const plz = lineContent[1];
        const point = [lineContent[2], lineContent[3]];
        if (plz !== undefined) {
            points.push(point);
            plzs.push(plz);
            result[plz] = point;
            const pointKey = point.join("#");
            pointToPlz[pointKey] = plz;
        }
    }
});
const pointIndex = kdbush(points);

const targetPlz = "74072";
const targetPoint = result[targetPlz];

console.log("targetPoint: ", targetPoint);
var nearest = geokdbush.around(pointIndex, targetPoint[0], targetPoint[1], 1000, 5);

nearest.forEach(function (point) {
    const key = point.join("#");
    const plz = pointToPlz[key];
    console.log(plz);
});









