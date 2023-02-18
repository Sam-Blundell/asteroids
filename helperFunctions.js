const wrapPosition = (screenWidth, screenHeight, coordinate, width, height) => {
    if (!height) height = width;
    if (coordinate.x < (width / 2)) {
        coordinate.x = screenWidth + (width / 2);
    } else if (coordinate.x > (screenWidth + (width / 2))) {
        coordinate.x = width / 2;
    }
    if (coordinate.y < -height / 2) {
        coordinate.y = screenHeight + (height / 2);
    } else if (coordinate.y > (screenHeight + (height / 2))) {
        coordinate.y = -height / 2;
    }
}

export { wrapPosition };
