/********
NOTES
{
	-use console.log() to debug
	-to disable a button such as $scrounge, use $('#scrounge').addClass('disabled');
	-to add buttons to the game, specify a div with an id, then write something like:
		var str = "<div class='btn btn-primary btn-lg btn-block' id='scrounge'>Your Time</div>"
		document.getElementById("newButton").innerHTML += str;
}
********/
//initialize variables

//GAME LOOP & Interval
var tickInterval = 1000;
var gameLoop = setInterval(function(){tick()},tickInterval);
/*in order to change the refresh rate at which buildings tick,
	tickInterval = Math.pow(tickInterval, 0.99);
	clearInterval(gameLoop);
	gameLoop = setInterval(function(){tick()},tickInterval)
*/

function newGame(){
	var toReturn = {
		gald: 0,
		buildings: {
			homeless: {
				name: "homeless",
				numOf: 0,
				baseCost: 100,
				currentCost: 100,
				income: .5
			}//,
			//other buildings
		},
		resources: {
			wood: {
				name: "wood",
				amount: 0,
				maxAmount: 100
			},
			stone: {
				name: "stone",
				amount: 0,
				maxAmount: 100
			},
			fibers: {
				name: "flax",
				amount: 0,
				maxAmount: 100
			}
		}
	};
	return toReturn;
}

var game = newGame();

var playerIsHarvesting = "";

function setGather(resource)
{
	var btn = "";
	if(playerIsHarvesting !== "")
	{
		btn = playerIsHarvesting + "CollectBtn"
		//change btn text here
		console.log(btn);
		$('#'+btn).removeClass('disabled');
	}
	btn = resource + "CollectBtn";
	//change btn text here
	console.log(btn);
	$('#'+btn).addClass('disabled');
	playerIsHarvesting = resource;
}

function tick()
{
	var dosh = 0;
	for(var key in game.buildings)
	{
		dosh += (game.buildings[key].numOf*game.buildings[key].income); // #of * income per
	}
	game.gald += dosh; //gald++ on function call
	document.getElementById("gald").innerHTML = clean(game.gald); //when the HTML file calls for gald, it'll return value of gald var
};

// Increase gald every time scrounge is clicked
$(document).on('click', '#scrounge', function () {
	game.gald += Math.floor((Math.random() * 30) + 5);; //remember *upper+lower bounds
	refresh();
});

function buyObject(object) //new cost = base cost(1.1^n) where n=num of object
{
	for(var key in game.buildings)
	{
		if(key==object)
		{
			if(game.gald >= game.buildings[key].currentCost) //[3]=curCost, if can player afford object
			{
				game.buildings[key].numOf++; //[1]=#of, object++
				game.gald = game.gald - game.buildings[key].currentCost; //gald-curCost
				document.getElementById(key).innerHTML = game.buildings[key].numOf; //updates #of for user
				document.getElementById('gald').innerHTML = clean(game.gald); //same as above but for gald
				game.buildings[key].currentCost = Math.floor(game.buildings[key].baseCost * Math.pow(1.1,game.buildings[key].numOf)); //computes cost of next object
				document.getElementById(key+'Cost').innerHTML = game.buildings[key].currentCost; //updates object cost for user
				if(game.buildings[key].numOf == 10)
				{//checks if you have exactly 10 after the purchase; if so, creates an upgrade button to... give knives to the homeless iunno.
					var str = "<div class='btn btn-primary btn-lg btn-block' id='homelessUpgrade'>Give them knives???</div>"
					document.getElementById("newButton").innerHTML += str;
				}
			}
		}
	}
}

function save()
{
	var saveGame = jQuery.extend(true, {}, game); //creates the variable, which stores information we want to save
	localStorage.setItem("saveGame",JSON.stringify(saveGame)); //JSON method turns info into a String
}

function load() //saveFile stores inv[i, i+1, i+2...] as [i, i+1, i+2...] and gald as the last entry
{
	var saveGame = JSON.parse(localStorage.getItem("saveGame")); //decrypts String; converts into values via savegame.gald etc
	if(saveGame != null)//if save exists
	{
		game.gald=saveGame.gald; //gald becomes last entry of savegame
		for(var key in game) //runs for the current length of inv
				if(typeof game[key]===typeof saveGame[key]) //is the value in savegame WRONG, basically
					game[key] = saveGame[key]; //each value at x in array i for inv becomes the matching value from savegame
		console.log("Loaded!");
	}
	else
		console.log("No save detected!");
	refresh();
}

function erase()
{
	localStorage.removeItem("saveGame"); //removes the save from clientside storage
	game = newGame();
	refresh();
	console.log("Erased!");
}

//Function to prettify numbers & rogue decimals
function clean(input)
{
	var output = Math.round(input) // * 1000000)/1000000; cleans it up to like, 6? Decimals.
	return output;
}



//Interval for harvesting
window.setInterval(function()
{
	for(key in game.resources)
		if(game.resources[key].name == playerIsHarvesting)
		{
			var htmlBarName = "#" + playerIsHarvesting + "Bar";// sets as "#woodBar"
			if(game.resources[key].amount < game.resources[key].maxAmount)
			{
				var remainder = (game.resources[key].maxAmount - game.resources[key].amount);
				game.resources[key].amount++; //where num is increase value, maybe change it?
				document.getElementById(game.resources[key].name).innerHTML = game.resources[key].amount;// updates value of sent resource in the HTML file client side
				$(htmlBarName)
				.css("width", (game.resources[key].amount*100)/(game.resources[key].maxAmount) + "%") //note this is assuming it's always going to be out of 100
				.attr("aria-valuenow", game.resources[key].amount)
				//.text(Math.floor(remainder/60) + "min " + remainder%60 + "sec");
				//$("#" + playerIsHarvesting + "TimeLeft") = (Math.floor(remainder/60) + "min " + remainder%60 + "sec");
				refresh();
			}
		}
}, 1000);




window.addEventListener("beforeunload", function() {
    save();
});

function refresh()
{
	document.getElementById('gald').innerHTML = clean(game.gald);
	for(var key in game.buildings)
	{
		document.getElementById(key).innerHTML = game.buildings[key].numOf;
		document.getElementById(key+'Cost').innerHTML = game.buildings[key].currentCost;
	}
	console.log("Refreshed!");
}

/* ********** ********** Welcome to the OLD N BUSTED playground ********** **********
                where we store shit we're not quite ready to get rid of

///// showing and hiding tabs - make this passive on startup, and change based on booleans?
$(document).on('click', '#scrounge', function () {
	if(gald > 10000)
        $('#gameTabs a:last').hide();
    });
window.setInterval(function()
{
        $('#gameTabs a:last').show();
        console.log("Let there be tab");
}, 5000); //The above fires once every 1000ms


 ********** ********** Don't forget your belongings as you exit ********** **********


Changelog for funzies:
v0.001 - The world as we know it came to be.
... The Dark Ages; nothing was logged during this time.
v0.008 - Erase now dynamic; functions on a for loop.
v0.010 - buildings have values! dynamic tick! double support! default values! save checks for null values! dynamic loading! WHOA
v0.020 - completely redid inventory and -all- associated functions; changed from dynamic array to Object of Objects
v0.025 - would you believe I did it again? Changed inventory to game, and reworked save and load functions a la Trimps
v0.0275 - figured out colouring bootstrap bars, plus centering bar text. Added mockup combat page, <i>very</i> rough concept right now.
*/