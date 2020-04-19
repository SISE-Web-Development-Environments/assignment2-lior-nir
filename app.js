var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

$(document).ready(function() {
	//iniatate p
	/*var p = new Object();
	p.username = p;
	p.password = p;*/
	sessionStorage.setItem("p", "p");
	goToWelcome();
	$("#gameScreen").hide();
	$("#settings").hide();
	context = canvas.getContext("2d");
	//Start();
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
					alert("found the user "+username);
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

function goToGame(){
	hideAll();
	$("#gameScreen").show();
	Start();
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
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
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
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
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
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
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
