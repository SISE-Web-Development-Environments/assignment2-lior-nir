var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var MonsterInterval;
var NumberOfMonsters=2;
var NumberOfdisqualifications = 5 ;
var NumberOfPointsForWin = 150 ;

class ball{
	constructor(Precentage ,color , points) {
		this.Precentage = Precentage ;
		this.color = color;
		this.points = points;
	}
}

var firstBallColor= new ball(60,"blue", 5);
var secondBallColor=  new ball(30,"green", 15);
var thirdBallColor=  new ball(10,"red", 25);

var ballAmount = 30 ;
var ballsMixedArray=[];
var monsters =[];

class Monster{
	constructor(row , column) {
		this.row = row;
		this.column = column;
	}
}

$(document).ready(function() {
	context = canvas.getContext("2d");
	mixBalls();
	Start();
});

function mixBalls() {
	let firstColorAmount = firstBallColor.Precentage / 100 * ballAmount ;
	let secondColorAmount = secondBallColor.Precentage / 100 * ballAmount ;
	let thirdColorAmount =  ballAmount - firstColorAmount - secondColorAmount ;
	for ( let i = 0 ; i < ballAmount ; i++){
		if(Math.random() < firstBallColor.Precentage/100){
			if(firstColorAmount>0){
				ballsMixedArray[i] = firstBallColor;
				firstColorAmount--;
			}else{
				i-- ;
			}
		}else if (Math.random() < (firstBallColor.Precentage+secondBallColor.Precentage)/100){
			if(secondColorAmount>0){
				ballsMixedArray[i] = secondBallColor;
				secondColorAmount--;
			}else{
				i-- ;
			}
		}else{
			if(thirdColorAmount>0){
				ballsMixedArray[i] = thirdBallColor;
				thirdColorAmount--;
			}else{
				i-- ;
			}
		}
	}
}
function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = ballAmount;
	var pacman_remain = 1;
	start_time = new Date();
	var nextBall=0;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = ballsMixedArray[nextBall];
					nextBall ++ ;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] =ballsMixedArray[nextBall];
					nextBall++;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = ballsMixedArray[nextBall] ;
		board[emptyCell[0]][emptyCell[1]] = 5 ; ////////////////////////////////////////////// fix later need to be not 5
		nextBall++;
		food_remain--;
	}
	for(let i = 0 ; i < NumberOfMonsters ; i ++) {
		var emptyCell = findRandomEmptyCell(board);
		monsters[i] = new Monster(emptyCell[0] , emptyCell[1]);
		//window.alert("r:"+monsters[i].row+" c:"+monsters[i].column);
		board[emptyCell[0]][emptyCell[1]] = 5 ; ////////////////////////////////////////////// fix later need to be not 5
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	MonsterInterval = setInterval(UpdateMonstersPosition, 750);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
	return 0;
}

function Draw(packmanSide) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				packmanDraw(packmanSide,center) ;
			}else if (board[i][j] instanceof ball) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = board[i][j].color; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();

			}
		}
	}

	for (let h = 0 ; h < NumberOfMonsters ; h ++ ){

		//window.alert("r:"+monsters[h].row+" c:"+monsters[h].column);
		let x = monsters[h].row * 60 + 30;
		let y = monsters[h].column * 60 + 30;
		context.beginPath();
		context.rect(x - 30, y - 30, 60, 60);
		context.fillStyle = "red"; //color
		context.fill();
	}
}

function UpdateMonstersPosition() {
	for(let h = 0 ; h<NumberOfMonsters ; h++){
		let X = value_limit(monsters[h].row - shape.i  , -1 , 1 );
		let Y = value_limit(monsters[h].column - shape.j , -1 ,1);
		if (monsters[h].row - X > -1 && monsters[h].row - X < 10  && board[monsters[h].row - X][monsters[h].column] != 4){
			monsters[h].row = monsters[h].row - X ;
		}
		if (monsters[h].column - Y > -1 && monsters[h].column - Y < 10 && board[monsters[h].row][monsters[h].column-Y] != 4){
			monsters[h].column = monsters[h].column - Y ;
		}
		if(board[monsters[h].row][monsters[h].column] == 2){
			window.clearInterval(interval);
			window.clearInterval(MonsterInterval);
			NumberOfdisqualifications -- ;
			if(NumberOfdisqualifications<1){
				window.alert("Game Over!");
			}else{
				window.alert("Number of stayed games:"+NumberOfdisqualifications);
				score = score - 10 ;
				if(score < 0 ){
					score = 0 ;
				}
				mixBalls();
				Start();
			}
		}
	}


}
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
//--------------------------
	if(board[shape.i][shape.j] instanceof ball){
		score=score+board[shape.i][shape.j].points;
	}



	//-----------------------------------------------------------
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= NumberOfPointsForWin) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(x);
	}
}
var PackmanstartAngle = 1.15;
var PackmanEndAngle = 0.85 ;
var PackmanEye = new Object();
PackmanEye.x = 5 ;
PackmanEye.y = -15;
function packmanDraw(side , center) {

	if(side == 2){
		PackmanstartAngle = 0.65;
		PackmanEndAngle=0.35;
		PackmanEye.x = 15 ;
		PackmanEye.y = 5;
	}else if(side == 1){
		PackmanstartAngle = 1.65;
		PackmanEndAngle=1.35;
		PackmanEye.x = 15 ;
		PackmanEye.y = -5;
	}else if(side ==4){
		PackmanstartAngle = 0.15;
		PackmanEndAngle=1.85;
		PackmanEye.x = 5 ;
		PackmanEye.y = -15;
	}else if (side == 3 ){
		PackmanstartAngle = 1.15;
		PackmanEndAngle=0.85;
		PackmanEye.x = -5 ;
		PackmanEye.y = -15;
	}
	context.beginPath();
	context.arc(center.x, center.y, 30, PackmanstartAngle * Math.PI, PackmanEndAngle * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + PackmanEye.x, center.y + PackmanEye.y, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function value_limit(val, min, max) {
	return val < min ? min : (val > max ? max : val);
}