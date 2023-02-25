import { Coordinates } from './collisiondetection.js';

const wrapPosition = (screenWidth, screenHeight, coordinate, width, height = width) => {
    const wrappedCoordinate = new Coordinates(coordinate.x, coordinate.y);
    if (coordinate.x < (width / 2)) {
        wrappedCoordinate.x = screenWidth + (width / 2);
    } else if (coordinate.x > (screenWidth + (width / 2))) {
        wrappedCoordinate.x = width / 2;
    }
    if (coordinate.y < -height / 2) {
        wrappedCoordinate.y = screenHeight + (height / 2);
    } else if (coordinate.y > (screenHeight + (height / 2))) {
        wrappedCoordinate.y = -height / 2;
    }

    return wrappedCoordinate;
};

const notInMiddle = (spaceObject) => spaceObject.coordinate.x < 400
    || spaceObject.coordinate.x > 600
    || spaceObject.coordinate.y < 300
    || spaceObject.coordinate.y > 500;

const getShipVertices = (ship) => {
    // get starting upright vertices
    const currentX = ship.coordinate.x;
    const currentY = ship.coordinate.y;
    let front = new Coordinates(
        currentX,
        currentY - (ship.height / 2),
    );
    let left = new Coordinates(
        currentX - (ship.height / 2),
        currentY + (ship.width / 2),
    );
    let right = new Coordinates(
        currentX + (ship.height / 2),
        currentY + (ship.width / 2),
    );

    // translate to the origin, rotate to the direction, translate back into place.
    front = front.subtract(ship.coordinate).rotate(ship.direction).add(ship.coordinate);
    left = left.subtract(ship.coordinate).rotate(ship.direction).add(ship.coordinate);
    right = right.subtract(ship.coordinate).rotate(ship.direction).add(ship.coordinate);

    return [front, left, right];
};

export { wrapPosition, notInMiddle, getShipVertices };
