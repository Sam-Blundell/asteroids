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

export default wrapPosition;
