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
var RatInterval;
var tempTime;
var sound;


var NumberOfdisqualifications = 5 ;
var NumberOfPointsForWin ;



var BlueMonsterImage = new Image();
BlueMonsterImage.src = "images/blueMonster.gif";


var redMonsterImage = new Image();
redMonsterImage.src = "images/redMonster.png";

var orangeMonsterImage = new Image();
orangeMonsterImage.src = "images/orangeMonster.png";

var pinkMonsterImage = new Image();
pinkMonsterImage.src = "images/pinkMonster.gif";

var ratImage = new Image();
ratImage.src = "images/rat2.gif";
var ratLocation=[0,0];
var booleanRatBeenEated = false
var booleanMedicineActivate = false;
var booleanCandieActivate = false;

var candieImage = new Image();
candieImage.src = "images/candy.gif";

var medicineImage = new Image();
medicineImage.src = "images/medicine2.gif";

var usernameToShow;


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

/*
	jQuery.validator.addMethod("containsNumAndLetters", function(value, element) {
		var letterNumber = /(?:[A-Za-z].*?\d|\d.*?[A-Za-z])/;
		return  (letterNumber.test(value));
	}, "Password must contain numbers and letters");

	jQuery.validator.addMethod("notContainsNumbers", function(value, element) {
		var noNumbers = /^([^0-9]*)$/		;
		return  (noNumbers.test(value));
	}, "Must not contain numbers");*/

	/*$("#registration").validate({
		//$("form[name='registration']").validate({
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
			}});*/
	// context = canvas.getContext("2d");
	// context.drawImage(redMonsterImage,0,0,60,60);
	// score = 0 ;
	// GameTime = new Date();
	// mixBalls();
//	Start();
});
function validationSetUp(){

	
	//$("#registration").submit(function(e) {
	//	e.preventDefault();}).validate({
	/*	$("#registration").validate({
	//$("form[name='registration']").validate({
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
		}
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		/*submitHandler: function(form, event) {
			event.preventDefault();
			// form.submit();
			//var user = new Object();
			//user.username = username.value;
			//user.password = password.value;
			sessionStorage.setItem($("#username").val(), $("#password").val());
			alert("Successful registration. Welcome "+$("#firstname").val()+"!");
			$('#registration')[0].reset();
			goToWelcome();
			//alert($("#username").val());
		}*/
	//});

//	$("#registration").submit(function(e) {

	/*	if($("#registration").valid()){
			sessionStorage.setItem($("#username").val(), $("#password").val());
			alert("Successful registration. Welcome "+$("#firstname").val()+"!");
			$('#registration')[0].reset();
			goToWelcome();
		}*/
//	});
	/* $("#registration").submit(function(event) {
       alert( "Handler for .submit() called." );
       event.preventDefault();
	 });*/
	 sessionStorage.setItem($("#username").val(), $("#password").val());
	 alert("Successful registration. Welcome "+$("#firstname").val()+"!");
			$('#registration')[0].reset();
			goToWelcome();
	 return false;
}

function hideAll(){
	$("#welcome").hide();
	$("#login").hide();
	$("#register").hide();
	$("#gameScreen").hide();
	$("#settings").hide();
	endGame();
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
	//validationSetUp();
}

function goToLogin(){
	hideAll();
	$("#login").show();
	//alert("validation2");
	//loginToGame();
}

function processForm(){
	alert("click");
}

function loginToGame(){
	//$("#logination").submit(function(e) {
	//	alert("here");
	//	e.preventDefault();//})//.validate({
	//$("form[name='logination']").validate({
	//	submitHandler: function(form,event) {
		//	event.preventDefault();
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
					usernameToShow = username;
					goToSettings();
				}
			}
			if(found == false){
				alert("user name or password incorrect");
			}
			//$('#logination')[0].reset();
		//});
		return false;
	//});

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
	if(id === "up"){
		upKeyCode = event.which;
	}
	if(id === "down"){
		downKeyCode = event.which;
	}
	if(id === "left"){
		leftKeyCode = event.which;
	}
	if(id === "right"){
		rightKeyCode = event.which;
	}
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
	upKeyCode = 38;
	downKeyCode = 40;
	leftKeyCode = 37;
	rightKeyCode = 39;
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

var columns = 23;
var rows = 10;

var firstBallColor= new ball(60,"blue", 5 ,3); //last param is size in pixels
var secondBallColor=  new ball(30,"green", 15, 5 );
var thirdBallColor=  new ball(10,"red", 25, 8 );

var medicineStartPos = [];
var candieStartPos = [];



function goToGame(){
	//initiate parameters from settings
	if($("#up").val() === ""){
		$("#up").val("ArrowUp");
		upKeyCode = 38;
	}
	
	if($("#down").val() === ""){
		$("#down").val("ArrowDown");
		downKeyCode = 40
	}
	
	if($("#left").val() === ""){
		$("#left").val("ArrowLeft");
		leftKeyCode = 37
	}
	
	if($("#right").val() === ""){
		$("#right").val("ArrowRight");
		rightKeyCode = 39
	}
	
	ballAmount = $("#ballsAmount").val();
	if(!(ballAmount >= 50 && ballAmount <= 90) ){
		settingRandomValue(randomIntFromInterval(50,90), "ballsAmount");
		ballAmount = $("#ballsAmount").val();
	}
	NumberOfMonsters = $("#monstersAmount").val();
	if(!(NumberOfMonsters >= 1 && NumberOfMonsters <= 4) ){
		settingRandomValue(randomIntFromInterval(1,4), "monstersAmount");
		NumberOfMonsters = $("#monstersAmount").val();
	}
	timeForGame = $("#gameTime").val();
	if(!(timeForGame >= 60) ){
		settingRandomValue(randomIntFromInterval(60,120), "gameTime");
		timeForGame = $("#gameTime").val();
	}
	firstBallColor.color = $("#smallBallColor").val();
	if(firstBallColor.color === "" || isColor(firstBallColor.color) == false){
		firstBallColor.color = "DarkMagenta";
	}
	secondBallColor.color = $("#mediumBallColor").val();
	if(secondBallColor.color === "" || isColor(secondBallColor.color)== false){
		secondBallColor.color = "GreenYellow";
	}
	thirdBallColor.color = $("#bigBallColor").val();
	if(thirdBallColor.color === "" || isColor(thirdBallColor.color)== false){
		thirdBallColor.color = "Peru";
	}
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
	window.clearInterval(interval);
	window.clearInterval(MonsterInterval);
	window.clearInterval(RatInterval);
	
	Start();
}

function isColor(strColor){ //helper function
	var s = new Option().style;
	s.color = strColor;
	return s.color == strColor;
  }

//called from the restart buttun in game
function restartGame(){
	window.clearInterval(interval);
	window.clearInterval(MonsterInterval);
	window.clearInterval(RatInterval);
	context = canvas.getContext("2d");
	score = 0 ;
//	GameTime = new Date();
	mixBalls();
	start_time = new Date();
	pause_time = new Date();
	tempTime = 0 ;
	NumberOfdisqualifications = 5 ;
	Start();
}

function endGame(){
	window.clearInterval(interval);
	window.clearInterval(MonsterInterval);
	window.clearInterval(RatInterval);
	sound =  document.getElementById( "gameSound" );
	sound.pause();
	sound.currentTime = 0;
	context = canvas.getContext("2d");
	score = 0 ;
	start_time = new Date();
	pause_time = new Date();
	tempTime = 0 ;
	NumberOfdisqualifications = 5 ;
}

function mixBalls() {
	let firstColorAmount = firstBallColor.Precentage / 100 * ballAmount ;
	let secondColorAmount = secondBallColor.Precentage / 100 * ballAmount ;
	let thirdColorAmount =  ballAmount - firstColorAmount - secondColorAmount ;
	for ( let i = 0 ; i < ballAmount ; i++){
		let rand = Math.random();
		if(rand < firstBallColor.Precentage/100){
			if(firstColorAmount>0){
				ballsMixedArray[i] = firstBallColor;
				firstColorAmount--;
			}else{
				i-- ;
			}
		}else if (rand < (firstBallColor.Precentage+secondBallColor.Precentage)/100){
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
var iterationUpdate=0;
function Start() {
	let sum = 0 ;
	for(let i=0 ; i < ballsMixedArray.length ; i ++){
		sum = sum + ballsMixedArray[i].points ;
	}
	NumberOfPointsForWin = Math.round(sum*0.8) ;
	$("#showUsername").text("Player: "+usernameToShow+". Score to win: "+NumberOfPointsForWin);
	iterationUpdate=0;
	ratLocation = [0,0];
	booleanRatBeenEated = false;
	booleanMedicineActivate = false;
	booleanCandieActivate = false;
	board = new Array();
	pac_color = "yellow";
	var cnt = rows*columns;
	var food_remain = ballAmount;
	var pacman_remain = 1;
//	start_time = new Date();
//window.alert(pause_time/1000);

	let now = new Date();
	tempTime = tempTime + (now-pause_time)/1000 ;
	var nextBall=0;
	for (var i = 0; i < columns; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < rows; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 12 && j == 7) ||
				(i == 13 && j == 7) ||
				(i == 14 && j == 7) ||
				(i == 15 && j == 7)||
				(i == 15 && j == 6)||
				(i == 15 && j == 5)||
				(i == 10 && j == 3)||
				(i == 11 && j == 3)||
				(i == 12 && j == 3)||
				(i == 2 && j == 8)||
				(i == 15 && j == 2)||
				(i == 19 && j == 2)||
				(i == 19 && j == 3)||
				(i == 20 && j == 3)||
				(i == 21 && j == 3)||
				(i == 22 && j == 3)||
				(i == 19 && j == 6)||
				(i == 20 && j == 6)||
				(i == 21 && j == 6)||
				(i == 22 && j == 6)||
				(i == 19 && j == 7)
			) {
				board[i][j] = 4;
			} else {
				let randomNum = Math.random();
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


	medicineStartPos = findRandomEmptyCell(board);
	board[medicineStartPos[0]][medicineStartPos[1]] = 7 ;

	candieStartPos = findRandomEmptyCell(board);
	board[candieStartPos[0]][candieStartPos[1]] = 6 ;

	locateCharactersAndAddListeners();
	//window.alert("done!");


}

function locateCharactersAndAddListeners() {
	sound =  document.getElementById( "gameSound" );
	sound.pause();
	sound.currentTime = 0;
	sound.play();

	if(board[shape.i][shape.j] == 2){
		board[shape.i][shape.j] = 0;
	}
	let pacmanStartPos = findRandomEmptyCellForPacman(board);
	shape.i = pacmanStartPos[0];
	shape.j = pacmanStartPos[1];

	let corners = [];
	corners[0] = [0,0] ;
	corners[1] = [0,rows-1];
	corners[2]=[columns-1,0];
	corners[3]=[columns-1,rows-1];
//	window.alert("hi!");
	for(let i = 0 ; i < NumberOfMonsters ; i ++) {
		let emptyCell = corners[i] ; //findRandomEmptyCell(board);
		let image = redMonsterImage;
		if(i==0){
			image =BlueMonsterImage;
		}
		if(i==1){
			image = orangeMonsterImage;
		}
		if(i==2){
			image = pinkMonsterImage;
		}

		monsters[i] = new Monster(emptyCell[0] , emptyCell[1] , image);
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
	MonsterInterval = setInterval(UpdateMonstersPosition, monsters_TIME_OUT);
	RatInterval = setInterval(UpdateRatLocation , monsters_TIME_OUT) ;
}
function findRandomEmptyCellForPacman(board) {
	let i = randomIntFromInterval(2, columns-3);
	let j = randomIntFromInterval(2, rows-3);
	//var i = Math.floor(Math.random() * (columns-1) + 1);
	//var j = Math.floor(Math.random() * (rows-1) + 1);
	while (board[i][j] != 0) {
		i = randomIntFromInterval(2, columns-3);
		j = randomIntFromInterval(2, rows-3);
	}
	return [i, j];
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (columns-1) + 1);
	var j = Math.floor(Math.random() * (rows-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() *  (columns-1) + 1);
		j = Math.floor(Math.random() * (rows-1) + 1);
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

var iterationsOfCandies=0;
var currentCandieIteratin=0;
let needDrawCandie = false;
var packmanSideTemp = 1;
function Draw(packmanSide) {
	if(packmanSide<1 || packmanSide>4){
		packmanSide = packmanSideTemp;
	}else{
		packmanSideTemp = packmanSide;
	}
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = Math.max(timeForGame - time_elapsed, 0).toFixed(2);
	lblLives.value = NumberOfdisqualifications;
	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {
			var center = new Object();
			center.x = i * 36 + 18;
			center.y = j * 36 + 18;
			if (board[i][j] == 2) {
				packmanDraw(packmanSide,center) ;
			}else if (board[i][j] instanceof ball) {
				context.beginPath();
				context.arc(center.x, center.y,  board[i][j].sizeInPixels, 0, 2 * Math.PI); // circle
				context.fillStyle = board[i][j].color; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 18, center.y - 18, 36, 36);
				context.fillStyle = "grey"; //color
				context.fill();

			}
		}
	}

	if(! booleanMedicineActivate){
		context.drawImage(medicineImage,medicineStartPos[0]*36, medicineStartPos[1]*36,36,36);

	}

	if( !booleanRatBeenEated){
		context.drawImage(ratImage ,ratLocation[0]*36 , ratLocation[1]*36 ,36,36);
	}

	if(currentCandieIteratin >= iterationsOfCandies || booleanCandieActivate){
		currentCandieIteratin=0;
		iterationsOfCandies = Math.round(Math.random()*28+12); // 3 - 10 sec appearence
		if(Math.random()<0.5){
			candieStartPos = findRandomEmptyCell(board);
			board[candieStartPos[0]][candieStartPos[1]]=6;
			needDrawCandie=true;
		}else {
			board[candieStartPos[0]][candieStartPos[1]]=0;
			needDrawCandie=false;
		}
		booleanCandieActivate = false;
	}else {
		currentCandieIteratin++;
	}
	if(needDrawCandie){
		context.drawImage(candieImage, candieStartPos[0]*36, candieStartPos[1]*36 ,36,36);
	}

	for (let h = 0 ; h < NumberOfMonsters ; h ++ ){

		let x = monsters[h].row * 36 ;
		let y = monsters[h].column * 36 ;
		context.drawImage(monsters[h].image , x, y,36,36);

	}

}


function UpdateRatLocation() {
	if(iterationUpdate > 1){
		let x = value_limit(Math.round(Math.random()*5-2),-1,1);
		let y = value_limit(Math.round(Math.random()*5-2),-1,1);
		while ( ratLocation[0]+x >= columns || ratLocation[0]+x<0 || ratLocation[1]+y<0 || ratLocation[1]+y>=rows || board[ratLocation[0]+x][ratLocation[1]+y]==4){
			x = value_limit(Math.round(Math.random()*6-2),-1,1);
			y = value_limit(Math.round(Math.random()*5-2),-1,1);
		}
		iterationUpdate=0;
		ratLocation = [ratLocation[0]+x ,ratLocation[1]+y] ;
	}else{
		iterationUpdate++;
	}

	///Draw(1111);
}
function UpdateMonstersPosition() {
	for(let h = 0 ; h<NumberOfMonsters ; h++){
		let X = value_limit(monsters[h].row - shape.i  , -1 , 1 );
		let Y = value_limit(monsters[h].column - shape.j , -1 ,1);
		if (monsters[h].row - X > -1 && monsters[h].row - X < columns  && board[monsters[h].row - X][monsters[h].column] != 4){
			monsters[h].row = monsters[h].row - X ;
		}
		if (monsters[h].column - Y > -1 && monsters[h].column - Y < rows && board[monsters[h].row][monsters[h].column-Y] != 4){
			monsters[h].column = monsters[h].column - Y ;
		}
		if(board[monsters[h].row][monsters[h].column] == 2){
		//	Draw(2);
			window.clearInterval(interval);
			window.clearInterval(MonsterInterval);
			window.clearInterval(RatInterval)
			NumberOfdisqualifications -- ;
			sound.pause();
			sound.currentTime = 0;
			if(NumberOfdisqualifications<1){
				window.alert("Loser!");
			}else{
				pause_time = new Date();
				score = score - 10 ;
				if(score < 0 ){
					score = 0 ;
				}
				window.alert("Lives remaining: "+NumberOfdisqualifications);
				locateCharactersAndAddListeners();
			}
		}
	}
//	Draw(1111);
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
		if (shape.j < rows-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { ///Left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) { //Right
		if (shape.i < columns-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	// if (board[shape.i][shape.j] == 1) {
	// 	score++;
	// }
//--------------------------
	if(board[shape.i][shape.j] instanceof ball){
		score=score+board[shape.i][shape.j].points;
		lblScore.value = score;
	}
	if(board[shape.i][shape.j] == 6 ){
		score = score + Math.round((Math.random()*40+1)) ;
		booleanCandieActivate = true;
		board[shape.i][shape.j] = 0 ;
		lblScore.value = score;
	}
	if(shape.i == medicineStartPos[0] && shape.j == medicineStartPos[1] && !booleanMedicineActivate){
		NumberOfdisqualifications++;
		board[shape.i][shape.j] = 0 ;
		booleanMedicineActivate = true;
	}

	if(shape.i == ratLocation[0] && shape.j==ratLocation[1] && !booleanRatBeenEated){
		score = score + 50 ;
		lblScore.value = score;
		booleanRatBeenEated = true ;
		board[shape.i][shape.j] = 0 ;
	}

	//-----------------------------------------------------------
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000 - tempTime;
	/*if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}*/
	lblScore.value = score;
	if (score >= NumberOfPointsForWin) {
		window.clearInterval(interval);
		window.clearInterval(MonsterInterval);
		window.clearInterval(RatInterval);
		lblTime.value = Math.max(timeForGame - time_elapsed, 0).toFixed(2);
		sound.pause();
		sound.currentTime = 0;
		window.alert("Winner!!! You reached the score to win. Well done.");
		score = 0;
	} else if(time_elapsed > timeForGame) { //time ended
		window.clearInterval(interval);
		window.clearInterval(MonsterInterval);
		window.clearInterval(RatInterval);
		lblTime.value = Math.max(timeForGame - time_elapsed, 0).toFixed(2);
		sound.pause();
		sound.currentTime = 0;
		if(score < 100){
			window.alert("You are better than "+score+" points!");
		}
		else{
			window.alert("Winner!!! You scored more than 100 points.");
		}
		score = 0;
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