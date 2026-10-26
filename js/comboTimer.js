function drawTimer() {
	if(gameState==1){
		var leftVertexes = [];
		var rightVertexes = [];
		var sides = MainHex.sides;
	if(MainHex.ct - MainHex.lastCombo < settings.comboTime){
		for(var i=0;i<sides;i++){
			var done = (MainHex.ct -MainHex.lastCombo);
			if(done<(settings.comboTime)*(sides-1-i)*(1/sides)){
				leftVertexes.push(calcSide(i,i+1,1));
				rightVertexes.push(calcSide(-i,-i-1,1));
			}
			else{
				var fraction = 1-((done*sides)/settings.comboTime)%(1);
				leftVertexes.push(calcSide(i,i+1,fraction));
				rightVertexes.push(calcSide(-i,-i-1,fraction));
				break;
			}
		}
	}
		if(rightVertexes.length !== 0) drawSide(rightVertexes);
		if(leftVertexes.length !== 0) drawSide(leftVertexes);
	}
}

// point k of the outer polygon outline: even k are side midpoints, odd k are vertices,
// k = 0 is the bottom midpoint and positive k walk up the left side
function timerPoint(k) {
	var sides = MainHex.sides;
	var radius = outerBoundaryRadius();
	var dist = (k % 2 === 0) ? polygonApothem(radius, sides) : radius;
	var theta = k * (180 / sides) * (Math.PI / 180);
	return [trueCanvas.width/2 - Math.sin(theta) * dist, trueCanvas.height/2 + Math.cos(theta) * dist];
}

function calcSide(startVertex,endVertex,fraction){
	ctx.globalAlpha=1;
	ctx.beginPath();
	ctx.lineCap = "round";

	var start = timerPoint(startVertex);
	var end = timerPoint(endVertex);
	var startX = start[0];
	var startY = start[1];
	var endX = end[0];
	var endY = end[1];
		return [[startX,startY],[((endX-startX)*fraction)+startX,((endY-startY)*fraction)+startY]];
}
function drawSide(vertexes){
	if (gameState === 0) {
		ctx.strokeStyle = hexColorsToTintedColors[MainHex.lastColorScored];
	} else {
		ctx.strokeStyle = MainHex.lastColorScored;
	}
	ctx.lineWidth =4*settings.scale;
		ctx.moveTo(vertexes[0][0][0],vertexes[0][0][1]);
	ctx.lineTo(vertexes[0][1][0],vertexes[0][1][1]);
		for(var i=1;i<vertexes.length;i++){
			ctx.lineTo(vertexes[i][1][0],vertexes[i][1][1]);
			ctx.moveTo(vertexes[i][1][0],vertexes[i][1][1]);
		}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

}
