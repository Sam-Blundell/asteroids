class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(p) {
        return new Coordinates(this.x + p.x, this.y + p.y);
    }

    subtract(p) {
        return new Coordinates(this.x - p.x, this.y - p.y);
    }

    rotate(angle) {
        return new Coordinates(
            (Math.cos(angle) * this.x) - (Math.sin(angle) * this.y),
            (Math.sin(angle) * this.x) + (Math.cos(angle) * this.y),
        );
    }
}

// Use Pythagoras theorem to return the length of the distance between
// one point (pA) and another point (pB).
const getLineLength = (pA, pB) => Math.sqrt((pA.x - pB.x) ** 2 + (pA.y - pB.y) ** 2);

// Checks whether the distance from the point to the centre of the circle is
// less than the radius of the circle.
const pointCircleCollision = (p, c, circleRad) => getLineLength(p, c) <= circleRad;

// Measures the distance between one end of the line (1A) and the point (p).
// Measures the distance between the other end of the line (1B) and the point (p).
// If the sum of those two distances is the same as the length of the line
// then the point is on the line.
const linePointCollision = (lA, lB, p) => {
    const lineLength = getLineLength(lA, lB);
    const distance1 = getLineLength(lA, p);
    const distance2 = getLineLength(lB, p);

    // Tolerance value is necessary since the value is rarely exactly the same at
    // a particular moment in time.
    const tolerance = 5;
    if (
        distance1 + distance2 >= lineLength - tolerance
        && distance1 + distance2 <= lineLength + tolerance
    ) {
        return true;
    }
    return false;
};

// finds the closest point on the line to the point.
// checks that the closest point on the line is part of the
// line segment that we're examining.
// Returns true if the distance between the point and the
// lines closest point is less than the radius of the circle.
const lineCircleCollision = (pA, pB, c, circleRad) => {
    // check if either ends of the line are inside the circle.
    const pointAInside = pointCircleCollision(pA, c, circleRad);
    const pointBInside = pointCircleCollision(pB, c, circleRad);
    if (pointAInside || pointBInside) return true;

    const lineLen = getLineLength(pA, pB);

    const dot = (((c.x - pA.x) * (pB.x - pA.x)) + ((c.y - pA.y) * (pB.y - pA.y))) / lineLen ** 2;

    const closestX = pA.x + (dot * (pB.x - pA.x));
    const closestY = pA.y + (dot * (pB.y - pA.y));

    const onSegment = linePointCollision(pA, pB, new Coordinates(closestX, closestY));
    if (!onSegment) return false;

    const distance = getLineLength(new Coordinates(closestX, c.x), new Coordinates(closestY, c.y));

    if (distance <= circleRad - 5) {
        return true;
    }
    return false;
};

// const polygonPointCollision = (vertices, p) => {
//     const collision = false;

//     // loop through vertices of the polygon
//     let next = 0;
//     for (let curr = 0; curr < vertices.length; curr++) {
//         // Get the next vertex in list. If we're finished then wrap around.
//         next = curr + 1;
//         if (next === vertices.length) next = 0;

//         const cV = vertices[curr];
//         const nV = vertices[next];

//         // compare position, flip 'collision' variable back and forth
//         if (
//             // Jordan Curve Theorem test.
//             ((cV.y >= p.y && nV.y < p.y) || (cV.y < p.y && nV.y >= p.y)) &&
//             (p.x < (nV.x-cV.x)*(p.y-cV.y) / (nV.y-cV.y)+cV.x)
//         ) {
//             collision = !collision;
//         }
//     }
//     return collision;
// }

// Carries out lineCircle collision detection on each line
// of the polygon.
const polygonCircleCollision = (vertices, circle, circleRadius) => vertices.some((vertex, i) => {
    const next = (i + 1) % vertices.length;
    const cV = vertex;
    const nV = vertices[next];
    return lineCircleCollision(cV, nV, circle, circleRadius);
});

export {
    Coordinates, getLineLength, pointCircleCollision, polygonCircleCollision,
};
