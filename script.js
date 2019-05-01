//all varible
//game
var ground = document.querySelector("#boad");
var boad = ground.getContext("2d");

//load all button
var start = document.querySelector("#start");
var pause = document.querySelector("#pause");
var reset = document.querySelector("#restart");

//load img
var text1 = new Image();
text1.src = "img/text1.png";
var text2 = new Image();
text2.src = "img/text2.png";
var knight_stay = new Image();
knight_stay.src = "img/knight_stay.png";
var knight_charge = new Image();
knight_charge.src = "img/knight_charge.png";
var door = new Image();
door.src = "img/ground.png";
var wall = new Image();
wall.src = "img/wall.png";
var door2 = new Image();
door2.src = "img/ground2.png";

//load sound
var slash = new Audio();
slash.src = "audio/slash.mp3";

//button in game
var next = "key";

//set interval
var starter;
var run;
var set;

//random type of people
var position = 0;
var random_p = Math.floor(Math.random()*3);
var random_r = Math.floor(Math.random()*3);

//list of people
var list_p = [];
for(var i=0;i<3;i++){
	list_p[i] = new Image();
	list_p[i].src = "img/people"+(i+1)+".png";
}
var religion = ["Protestant", "None", "Catholic"];

// object of people
var object = [];
object[0] = {people:list_p[random_p], direct:-30, walk:550, hp:religion[random_r], time:50};

//movement knight
var sword = "stay";
var damage = -1;

//count and time
var round = 0;
var game_time = 0;
var end = 0;

// spawn bot
var spawn = -1;
var all_spawn = 0;

//function start

function start_but(){
	start.style.display = "none";
	ground.style.display = "block";
	reset.style.display = "block";
	starter = setInterval(startgame, 100);
}

// function pause/play
function pause_but(){
	clearInterval(run);
	clearInterval(starter);
	pause.innerText = "Resume";
	pause.setAttribute("onclick", "resume_but()");
}

function resume_but(){
	run = setInterval(game_1, 100);
	pause.innerText = "Pause";
	pause.setAttribute("onclick", "pause_but()");
}

//function restart
function restart(){
	clearInterval(run);
	clearInterval(starter);
	clearInterval(set);
	pause.style.display = "none";
	round = 0;
	position = 0;
	random_p = Math.floor(Math.random()*3);
 	random_r = Math.floor(Math.random()*3);
 	object[0] = {people:list_p[random_p], direct:-30, walk:550, hp:religion[random_r], time:50};
 	spawn = -1;
 	damage = -1;
 	sword = "stay";
 	all_spawn = 0;
	end = 0;
	game_time = 0;
 	starter = setInterval(startgame, 100);
}

//function next or skip
function skip(e){
	if(e.keyCode==32){
		next = "next";
		round++;
	}
	else if(e.keyCode==13)
		next = "skip";
}

//function game
function startgame(){
	//add key
	document.addEventListener("keydown", skip);

	boad.drawImage(door2, 0, 0, 1280, 700);
	boad.drawImage(wall, 950, 630);
	boad.fillStyle = "white";
	boad.font = "30px calibri";
	boad.fillText("Next(Space)  Skip(Enter)", 960, 50);

	// discription
	if(next=="next"&&round==1){
		boad.drawImage(text1, 100, 550, 1000, 100);
		boad.fillStyle = "red";
		boad.font = "30px calibri";
		boad.fillText("Queen:", 110, 575);
		boad.fillStyle = "black";
		boad.font = "30px calibri";
		boad.fillText("You are my knigth.", 205, 575);
		boad.fillText("And you will have to change faith of people by hurt them.", 110, 605);
	}
	if(next=="next"&&round==2){
		boad.drawImage(text1, 100, 550, 1000, 100);
		boad.fillStyle = "red";
		boad.font = "30px calibri";
		boad.fillText("Queen:", 110, 575);
		boad.fillStyle = "black";
		boad.font = "30px calibri";
		boad.fillText("In time remain.", 205, 575);
		boad.fillText("And if you don't do it, you will be executed.", 110, 605);
	}
	if(next=="next"&&round==3){
		boad.drawImage(text2, 100, 550, 1000, 100);
		boad.fillStyle = "red";
		boad.font = "30px calibri";
		boad.fillText("Knight:", 110, 575);
		boad.fillStyle = "black";
		boad.font = "30px calibri";
		boad.fillText("Yes, Sir.", 205, 575);
		boad.fillText("Tutorial, \"Space\" is hit", 110, 605);
	}
	if(next=="next"&&round==4){
		boad.drawImage(text2, 100, 550, 1000, 100);
		boad.fillStyle = "red";
		boad.font = "30px calibri";
		boad.fillText("Knight:", 110, 575);
		boad.fillStyle = "black";
		boad.font = "30px calibri";
		boad.fillText("We must to change religion of people", 205, 575);
		boad.fillText("to Protestant.", 110, 605);
	}
	if(round>=5||next=="skip"){
		run = setInterval(game_1, 100);
		pause.style.display = "block";
		clearInterval(starter);
	}
}

function knight(e){
	if(e.keyCode==32){
		sword = "charge";
	}
}


function game_1(){

	//add key to boad
	document.addEventListener("keyup", knight);

	//draw boad background
	boad.drawImage(door, 0, 0, 1280, 700);

	//draw Time
	boad.fillStyle = "white";
	boad.font = "30px calibri";
	boad.fillText(Math.floor((1800-game_time)/600)+"."+Math.floor((1800-game_time)%600/10)+" Time Remain", 950, 70);

	//random spawn
	if(game_time<=1600&&spawn<=3){
		position = Math.floor(Math.random()*50);
	}
	else if(game_time>1600){
		position = 0;
	}

	boad.fillStyle = "white";
	boad.font = "30px calibri";
	boad.fillText(end+"/"+all_spawn, 1130, 122);

	// use sword
	if(sword=="stay"){
		boad.drawImage(knight_stay, 1130, 500, 120, 150);
	}
	if(sword=="charge"){
		boad.drawImage(knight_charge, 1130, 500, 120,150);
		damage = Math.floor(Math.random()*10);
		slash.play();
		sword = "stay";
	}

	// add people to object
	if(position==21&&spawn<=3){
		spawn++;
		random_p = Math.floor(Math.random()*3);
		random_r = Math.floor(Math.random()*3);
		object[spawn+1] = {people:list_p[random_p], direct:-30, walk:550, hp:religion[random_r], time:50};
		all_spawn += 1;
	}


	//spawn people to boad and set movment
	for(var i=0;i<=spawn;i++){
		object[i].walk = object[i].walk==550? 545:550;
		object[i].direct = object[i].direct!=1060||(object[i].hp=="Protestant"&&object[i].direct!=1280)||(object[i].time==0&&object[i].direct!=1280)? object[i].direct+10:object[i].direct;
		object[i].time = object[i].direct==1060&&object[i].time!=0? object[i].time-1:object[i].time;
		boad.drawImage(object[i].people, object[i].direct, object[i].walk, 100, 100);
		boad.fillStyle = "white";
    	boad.font = "35px calibri";
    	boad.fillText(object[i].hp, object[i].direct, object[i].walk-20);
    	boad.strokeText(object[i].hp, object[i].direct, object[i].walk-20);
    }

    // check damge of people
	if(spawn!=-1&&object[0].direct>=1060&&object[0].direct<=1160&&object[0].hp!="Protestant"&&damage==0){
		object[0].hp = "Protestant";
		end++;
	}

    // del people on boad and splice 0 
    if(object[0].direct>=1280){
    	object.splice(0, 1);
    	spawn--;
    }

    boad.drawImage(wall, 950, 630);

	//clear damage
	damage = -1;

	//count time
	game_time++;
	if(game_time==1800){
		clearInterval(run);
		set = setInterval(end_game, 100);
	}
}

function end_game(){
	boad.drawImage(door2, 0, 0, 1280, 700);
	boad.drawImage(wall, 950, 630);

	if(end>=1){
		boad.drawImage(text2, 100, 550, 1000, 100);
		boad.fillStyle = "red";
		boad.font = "30px calibri";
		boad.fillText("Knight:", 110, 575);
		boad.fillStyle = "black";
		boad.font = "30px calibri";
		boad.fillText("Outside, it looks like a peaceful society,", 205, 575);
		boad.fillText("but inside the heart of that society is offended", 110, 605);
	}
	if(end==0){
		boad.drawImage(text2, 100, 550, 1000, 100);
		boad.fillStyle = "red";
		boad.font = "30px calibri";
		boad.fillText("Knight:", 110, 575);
		boad.fillStyle = "black";
		boad.font = "30px calibri";
		boad.fillText("Sacrifice for freedom of religion", 205, 575);
		boad.fillText("is the beginning of a peaceful society.", 110, 605);
	}
}