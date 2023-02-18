class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Pythagoras
const getLineLength = (pA, pB) => {
    return Math.sqrt((pA.x - pB.x)**2 + (pA.y - pB.y)**2);
}

// Checks whether the distance from the point to the centre of the circle is
// less than the radius of the circle.
const pointCircleCollision = (pA, cA, circleRad) => {
    return (getLineLength(pA, cA) < circleRad);
}

const linePointCollision = (aX, aY, bX, bY, pointX, pointY) => {
    const lineLength = getLineLength(aX, aY, bX, bY);
    // distance from start point of line to point p.
    const dA = getLineLength(aX, aY, pointX, pointY);
    // distance from end point of line to point p.
    const dB = getLineLength(bX, bY, pointX, pointY);
    // Accuracy tolerance for line-point intersection. Without this the point
    // needs to be absolutely perfectly intersecting the line which can be buggy.
    const tolerance = 0.1
    // if the combined distances are the same as the line length (within tolerance)
    // then the point is intersecting the line.
    return (dA + dB) >= (lineLength - tolerance) && ((dA + dB) <= (lineLength + tolerance));
}

const circleLineCollision = (aX, aY, bX, bY, circleX, circleY, radius) => {
    // Quick return if either end of the line is inside the circle.
    const inside1 = pointCircleCollision(x1, y1, circleX, circleY, radius);
    const inside2 = pointCircleCollision(x2, y2, circleX, circleY, radius);
    if (inside1 || inside2) return true;

    // get length of line
    const length = getLineLength(x1, y1, x2, y2);
    // need to understand this part.
    const dot = ( ((circleX - aX)*(bX - aX)) + ((circleY - aY)*(bY - aY)) ) / length**2;
    const closestX = aX + (dot * (bX - aX));
    const closestY = aY + (dot * (bY - aY));
    const onSegment = linePointCollision(aX, aY, bX, bY, closestX, closestY);
    if (!onSegment) return false;

    const distance = getLineLength(closestX, closestY, circleX, circleY);
    return distance <= radius;
}

const polygonPointCollision = (vertices, pX, pY) => {
    let collision = false;
    // Vertices is an array of two-value arrays that each represent a vertex on
    // our polygon. We need to loop through the array and get each vertex;
    let next = 0;
    for (let i = 0; i < vertices.length; i++) {
        next = next === vertices.length ? 0 : next + 1;
        let currV = vertices[i];
        let nextV = vertices[next];

        if (((currV[1] >= pY && nextV[1] < pY) || (currV[1] < pY && nextV[1] >= pY)) &&
         (pX < (nextV[0] - currV[0])*(pY - currV[1]) / (nextV[1] - currV[1]) + currV[0])) {
            collision = !collision;
        }
    }
    return collision;
}

const trianglePointCollision = (aX, aY, bX, bY, cX, cY, pX, pY) => {
    const triangleArea = Math.abs( (bX - aX)*(cY - aY) - (cX - aX)*(bY - aY) );
    const area1 = Math.abs( (aX - pX)*(bY - pY) - (bX - pX)*(aY - pY) );
    const area2 = Math.abs( (bX - pX)*(cY - pY) - (cX - pX)*(bY - pY) );
    const area3 = Math.abs( (cX - pX)*(aY - pY) - (aX - pX)*(cY - pY) );

    return (area1 + area2 + area3) === triangleArea;
}

// const isoscelesTrianglePointCollision = (aX, aY, bX, bY, cX, cY, pX, pY) => {
//     return false;
//     const halfBaseLength = getLineLength(aX, aY, cX, cY) / 2;
// }

export { Coordinates, pointCircleCollision, };