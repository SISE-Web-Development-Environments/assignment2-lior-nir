class ball{
	constructor(Precentage ,color , points, sizeInPixels ) {
		this.Precentage = Precentage ;
		this.color = color;
		this.points = points;
		this.sizeInPixels = sizeInPixels;
	}
}
class Monster{
	constructor(row , column , image) {
		this.row = row;
		this.column = column;
		this.image = image ;
	}
}


var monsters_TIME_OUT = 750 ;


var context;
var shape = new Object();
var board;
var score ;
var pac_color;
var start_time  ;
var pause_time ;
var time_elapsed;
var interval;
var MonsterInterval;
var tempTime;

var NumberOfdisqualifications = 5 ;
var NumberOfPointsForWin = 150 ;



var BlueMonsterImage = new Image();
BlueMonsterImage.src = "images/blueMonster.png";


var redMonsterImage = new Image();
redMonsterImage.src = "images/redMonster.png";




var ballsMixedArray=[];
var monsters =[];



$(document).ready(function() {
	//iniatate p
	/*var p = new Object();
	p.username = p;
	p.password = p;*/
	sessionStorage.setItem("p", "p");
	goToWelcome();
	//$("#gameScreen").hide();
	$("#settings").hide();
	// context = canvas.getContext("2d");
	// context.drawImage(redMonsterImage,0,0,60,60);
	// score = 0 ;
	// GameTime = new Date();
	// mixBalls();
//	Start();
});
function validationSetUp(){

	jQuery.validator.addMethod("containsNumAndLetters", function(value, element) {
		var letterNumber = /(?:[A-Za-z].*?\d|\d.*?[A-Za-z])/;
		return  (letterNumber.test(value));
	}, "Password must contain numbers and letters");

	jQuery.validator.addMethod("notContainsNumbers", function(value, element) {
		var noNumbers = /^([^0-9]*)$/		;
		return  (noNumbers.test(value));
	}, "Must not contain numbers");

	$("form[name='registration']").validate({
		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			username: "required",
			firstname: {
				required: true,
				notContainsNumbers: true
			},
			lastname: {
				required: true,
				notContainsNumbers: true
			},
			date: "required",
			email: {
				required: true,
				// Specify that email should be validated
				// by the built-in "email" rule
				email: true
			},
			password: {
				required: true,
				minlength: 6,
				containsNumAndLetters: true
			}
		},
		// Specify validation error messages
		messages: {
			username: "Please enter your user name",
			firstname: {required: "Please enter your first name"},
			lastname:{required: "Please enter your last name"},
			date: "Please enter your birth date",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long"
			},
			email: "Please enter a valid email address"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function(form) {
			// form.submit();
			//var user = new Object();
			//user.username = username.value;
			//user.password = password.value;
			sessionStorage.setItem($("#username").val(), $("#password").val());
			alert("Successful registration. Welcome "+$("#firstname").val()+"!");
			$('#registration')[0].reset();
			//alert($("#username").val());
		}
	});

	/* $("#registration").submit(function(event) {
       alert( "Handler for .submit() called." );
       event.preventDefault();
     });*/
}

function hideAll(){
	$("#welcome").hide();
	$("#login").hide();
	$("#register").hide();
	$("#gameScreen").hide();
	$("#settings").hide();
}

function goToWelcome(){
	hideAll();
	$("#welcome").show();
}

function goToRegiser(){
	hideAll();
	$("#register").show();
	$( function() {
		$( "#datepicker" ).datepicker();
	} );
	validationSetUp();
}

function goToLogin(){
	hideAll();
	$("#login").show();
	loginToGame();
}

function processForm(){
	alert("click");
}

function loginToGame(){
	$("form[name='logination']").validate({
		submitHandler: function(form) {
			let username = $("#usernameLog").val();
			let password = $("#passwordLog").val();
			//check if exists in the system
			let found = false;
			for (var i = 0; i < sessionStorage.length && found == false; i++){
				let item = (sessionStorage.getItem(sessionStorage.key(i)));
				if(sessionStorage.key(i) == username & item == password){
					//found user, successful login
					found = true;
					alert("Welcome back, "+username);
					goToSettings();
				}
			}
			if(found == false){
				alert("user name or password incorrect");
			}
			$('#logination')[0].reset();
		}
	});

}

function goToSettings(){
	hideAll();
	$("#settings").show();
}

/*for settings inputs */
function settingsKey(event, id){
	let keyChosen = event.key;
	$("#"+id).val(keyChosen);
	$("#"+id).prop('disabled', true);
}

function resetSettingsKey(id){
	$("#"+id).prop('disabled', false);
	$("#"+id).val("");
	$("#"+id).focus();
}

/* Random ettings*/
function randomSettings(){
	settingsKeyRandom("ArrowUp", "up");
	settingsKeyRandom("ArrowDown", "down");
	settingsKeyRandom("ArrowLeft", "left");
	settingsKeyRandom("ArrowRight", "right");
	settingRandomValue(randomIntFromInterval(50,90), "ballsAmount");
	settingRandomValue(randomIntFromInterval(60,120), "gameTime");
	settingRandomValue(randomIntFromInterval(1,4), "monstersAmount");
	//for ball colors
	let colorsToPick = ['red', 'green', 'blue', 'orange', 'yellow', 'black','pink', 'brown'];
	let randomIndex = randomIntFromInterval(0,7);
	settingRandomValue(colorsToPick[randomIndex], "smallBallColor");
	colorsToPick.splice(randomIndex, 1);
	randomIndex = randomIntFromInterval(0,6);
	settingRandomValue(colorsToPick[randomIndex], "mediumBallColor");
	colorsToPick.splice(randomIndex, 1);
	randomIndex = randomIntFromInterval(0,5);
	settingRandomValue(colorsToPick[randomIndex], "bigBallColor");
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function settingsKeyRandom(keyChosen, id){
	$("#"+id).val(keyChosen);
	$("#"+id).prop('disabled', true);
}

function settingRandomValue(value, id){
	$("#"+id).val(value);
}

//Vars for game
var upKeyCode;
var downKeyCode;
var leftKeyCode;
var rightKeyCode;

var ballAmount = 30 ;
var NumberOfMonsters=2;
var timeForGame = 60 ;

var firstBallColor= new ball(60,"blue", 5 ,5); //last param is size in pixels
var secondBallColor=  new ball(30,"green", 15, 8 );
var thirdBallColor=  new ball(10,"red", 25, 11 );

var GameTime ;

function goToGame(){
	//initiate parameters from settings
	if($("#up").val() === "ArrowUp"){
		upKeyCode = 38;
	}
	else{
		upKeyCode = $("#up").val().charCodeAt(0) -32;
	}
	if($("#down").val() === "ArrowDown"){
		downKeyCode = 40
	}
	else{
		downKeyCode = $("#down").val().charCodeAt(0) -32;
	}
	if($("#left").val() === "ArrowLeft"){
		leftKeyCode = 37
	}
	else{
		leftKeyCode = $("#left").val().charCodeAt(0) -32;
	}
	if($("#right").val() === "ArrowRight"){
		rightKeyCode = 39
	}
	else{
		rightKeyCode = $("#right").val().charCodeAt(0) -32;
	}
	
	ballAmount = $("#ballsAmount").val();
	NumberOfMonsters = $("#monstersAmount").val();
	timeForGame = $("#gameTime").val();
	firstBallColor.color = $("#smallBallColor").val();
	secondBallColor.color = $("#mediumBallColor").val();
	thirdBallColor.color = $("#bigBallColor").val();
	//display settings in the side
	$("#sett1").text("Up Key: "+$("#up").val());
	$("#sett2").text("Down Key: "+$("#down").val());
	$("#sett3").text("Left Key: "+$("#left").val());
	$("#sett4").text("Right Key: "+$("#right").val());
	$("#sett5").text("Balls amount: "+ballAmount);
	$("#sett6").text("5-Points ball color: "+firstBallColor.color);
	$("#sett6").css("color",firstBallColor.color);
	$("#sett7").text("15-Points ball color: "+secondBallColor.color);
	$("#sett7").css("color",secondBallColor.color);
	$("#sett8").text("25-Points ball color: "+thirdBallColor.color);
	$("#sett8").css("color",thirdBallColor.color);
	$("#sett9").text("Game time: "+timeForGame+" seconds");
	$("#sett10").text("Monsters amount: "+NumberOfMonsters);

	hideAll();
	$("#gameScreen").show();
	context = canvas.getContext("2d");
	score = 0 ;
//	GameTime = new Date();
	mixBalls();
	start_time = new Date();
	pause_time = new Date();
	tempTime = 0 ;
	Start();
}

//called from the restart buttun in game
function restartGame(){ //Lior, Implement it!!!!

}

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
	pac_color = "yellow";
	var cnt = 180;
	var food_remain = ballAmount;
	var pacman_remain = 1;
//	start_time = new Date();
//window.alert(pause_time/1000);

	let now = new Date();
	tempTime = tempTime + (now-pause_time)/1000 ;
	var nextBall=0;
	for (var i = 0; i < 18; i++) {
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
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = ballsMixedArray[nextBall] ;
		board[emptyCell[0]][emptyCell[1]] = 5 ; ////////////////////////////////////////////// fix later need to be not 5
		nextBall++;
		food_remain--;
	}
//	window.alert("hi!");
	for(let i = 0 ; i < NumberOfMonsters ; i ++) {
		let emptyCell = findRandomEmptyCell(board);
		let image = redMonsterImage;
		if(i==0){
			image =BlueMonsterImage;
		}

		monsters[i] = new Monster(emptyCell[0] , emptyCell[1] , image);
		//window.alert("r:"+monsters[i].row+" c:"+monsters[i].column);
		board[emptyCell[0]][emptyCell[1]] = 5 ; ////////////////////////////////////////////// fix later need to be not 5
	}
	//window.alert("done!");

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
	MonsterInterval = setInterval(UpdateMonstersPosition, monsters_TIME_OUT);
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
	if (keysDown[upKeyCode]) { //Up
		return 1;
	}
	if (keysDown[downKeyCode]) { //Down
		return 2;
	}
	if (keysDown[leftKeyCode]) { //Left
		return 3;
	}
	if (keysDown[rightKeyCode]) { //Right
		return 4;
	}
	return 0;
}

function Draw(packmanSide) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 18; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 45 + 20;
			center.y = j * 45 + 20;
			if (board[i][j] == 2) {
				packmanDraw(packmanSide,center) ;
			}else if (board[i][j] instanceof ball) {
				context.beginPath();
				context.arc(center.x, center.y,  board[i][j].sizeInPixels, 0, 2 * Math.PI); // circle
				context.fillStyle = board[i][j].color; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 45, 45);
				context.fillStyle = "grey"; //color
				context.fill();

			}
		}
	}

	for (let h = 0 ; h < NumberOfMonsters ; h ++ ){

		//window.alert("r:"+monsters[h].row+" c:"+monsters[h].column);
		let x = monsters[h].row * 60 + 30;
		let y = monsters[h].column * 60 + 30;
		context.drawImage(monsters[h].image , x, y,36,36);
		// context.beginPath();
		// context.rect(x - 30, y - 30, 60, 60);
		// context.fillStyle = "red"; //color
		// context.fill();
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
				window.alert("Loser!");
			}else{
				pause_time = new Date();
				score = score - 10 ;
				if(score < 0 ){
					score = 0 ;
				}
				window.alert("Number of stayed games:"+NumberOfdisqualifications);
				mixBalls();
				Start();
			}
		}
	}


}
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //Up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) { //Down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { ///Left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) { //Right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	// if (board[shape.i][shape.j] == 1) {
	// 	score++;
	// }
//--------------------------
	if(board[shape.i][shape.j] instanceof ball){
		score=score+board[shape.i][shape.j].points;
	}



	//-----------------------------------------------------------
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000 - tempTime;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= NumberOfPointsForWin) {
		window.clearInterval(interval);
		window.clearInterval(MonsterInterval);
		window.alert("Winner!!!");
	} else if(GameTime > timeForGame) {
		window.clearInterval(interval);
		window.clearInterval(MonsterInterval);
		window.alert("You are better than "+score+" points!");
	}else{
		Draw(x);
	}
}
var PackmanstartAngle = 1.15;
var PackmanEndAngle = 0.85 ;
var PackmanEye = new Object();
PackmanEye.x = 4 ; //was 5
PackmanEye.y = -12; // was -15
function packmanDraw(side , center) {

	if(side == 2){
		PackmanstartAngle = 0.65;
		PackmanEndAngle=0.35;
		PackmanEye.x = 12 ;
		PackmanEye.y = 4;
	}else if(side == 1){
		PackmanstartAngle = 1.65;
		PackmanEndAngle=1.35;
		PackmanEye.x = 12 ;
		PackmanEye.y = -4;
	}else if(side ==4){
		PackmanstartAngle = 0.15;
		PackmanEndAngle=1.85;
		PackmanEye.x = 4 ;
		PackmanEye.y = -12;
	}else if (side == 3 ){
		PackmanstartAngle = 1.15;
		PackmanEndAngle=0.85;
		PackmanEye.x = -4 ; //was -5
		PackmanEye.y = -12; // was 15
	}
	context.beginPath();
	context.arc(center.x, center.y, 18, PackmanstartAngle * Math.PI, PackmanEndAngle * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + PackmanEye.x, center.y + PackmanEye.y, 3, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function value_limit(val, min, max) {
	return val < min ? min : (val > max ? max : val);
}