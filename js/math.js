function rotatePoint(x, y, theta) {
	var thetaRad = theta * (Math.PI / 180);
	var rotX = Math.cos(thetaRad) * x - Math.sin(thetaRad) * y;
	var rotY = Math.sin(thetaRad) * x + Math.cos(thetaRad) * y;

	return {
		x: rotX,
		y: rotY
	};
}

// distance from the center of a regular polygon to the middle of a side
function polygonApothem(radius, sides) {
	return radius * Math.cos(Math.PI / sides);
}

// distance from the center of a regular polygon to a vertex
function polygonRadius(apothem, sides) {
	return apothem / Math.cos(Math.PI / sides);
}

// length of a side of a regular polygon at the given apothem
function polygonSideWidth(apothem, sides) {
	return 2 * apothem * Math.tan(Math.PI / sides);
}

// angle (degrees, 0 = up) of the middle of the side a lane falls onto
function laneAngle(lane, sides) {
	return (360 / sides) * (1 - lane);
}

function randInt(min, max) {
	return Math.floor((Math.random() * max) + min);
}
