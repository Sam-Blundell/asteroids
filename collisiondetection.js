const pointCircleCollision = (pointX, pointY, circleX, circleY, radius) => {
    const distanceX = pointX - circleX;
    const distanceY = pointY - circleY;
    const distance = Math.sqrt(distanceX**2 + distanceY**2);
    return distance < radius;
}

export { pointCircleCollision, };