/********
NOTES
{
	-use console.log() to debug
	-to disable a button such as $scrounge, use $('#scrounge').addClass('disabled');
	-Save() / Load() could be a problem in the future if you change the order of things pushed into inv, so... don't?
}
********/

//initialize variables
var gald = 0;
var inv = []; //[0 name, 1 #of, 2 initCost, 3 curCost, 4 income, //5 upgrades?]

//adding purchasable buildings
inv.push(["homeless", 0, 100, 100, .5]);
var defaultInv = jQuery.extend(true, {}, inv); //clone of inv for default load game

var inventory =
{
	"homeless": {
	numOf: 0,
	baseCost: 100,
	currentCost: 100,
	income: .5
	}
};
var defaultInventory = jQuery.extend(true, {}, inventory);
/* showing and hiding tabs - make this passive on startup, and change based on booleans?
$(document).on('click', '#scrounge', function () {
	if(gald > 10000)
        $('#gameTabs a:last').hide();
    });

window.setInterval(function()
{
        $('#gameTabs a:last').show();
        console.log("Let there be tab");
}, 5000); //The above fires once every 1000ms
*/
/*
var Students = 
{
	"Mark": {
	age: 23,
	hair_color: "brown",
	height: 1.78
	},
	"Tom": {
	age: 19,
	hair_color: "black",
	height: 1.74
	}
};

for(var i=0; i<Object.keys(Students).length; i++)
 	console.log(Object.keys(Students)[i] + " is " + Students[Object.keys(Students)[i]].age + " years old.");
 	//vs, if name was at 0, age at 1, console.log(Students[i][0] + " is " + Students[i][1] + " years old.");

for(var key in Students)
	console.log(key + " is " + Students[key].age + " years old.");

	console.log(Students["Mark"]);
	console.log(Students["Mark"].age);
*/


//main functions
/*
function tick()//REPLACE THIS WITH FUNCTION THAT ADDS BASED ON ANOTHER... VALUE IN THE MATRIX UP TOP?
{
	var income = 0;
		for(var i=0; i<inv.length; i++)
		{
			income += (inv[i][1]*inv[i][4]); // #of * income per
		}
	gald += income; //gald++ on function call
	document.getElementById("gald").innerHTML = clean(gald); //when the HTML file calls for gald, it'll return value of gald var
};
*/
function tick()//REPLACE THIS WITH FUNCTION THAT ADDS BASED ON ANOTHER... VALUE IN THE MATRIX UP TOP?
{
	var dosh = 0;
	for(var key in inventory)
	{
		dosh += (inventory[key].numOf*inventory[key].income); // #of * income per
	}
	gald += dosh; //gald++ on function call
	document.getElementById("gald").innerHTML = clean(gald); //when the HTML file calls for gald, it'll return value of gald var
};

// Increase gald every time produce-widget is clicked
$(document).on('click', '#scrounge', function () {
	gald += Math.floor((Math.random() * 30) + 5);; //remember *upper+lower bounds
	refresh();
});

/*function buyObject(object) //new cost = base cost(1.1^n) where n=num of object
{
	for(var i=0; i<inv.length; i++)
	{
		if(inv[i][0]==object)
		{
			if(gald >= inv[i][3]) //[3]=curCost, if can player afford object
			{
				inv[i][1] = inv[i][1]+1; //[1]=#of, object++
				gald = gald - inv[i][3]; //gald-curCost
				document.getElementById(inv[i][0]).innerHTML = inv[i][1]; //updates #of for user
				document.getElementById('gald').innerHTML = clean(gald); //same as above but for gald
				inv[i][3] = Math.floor(inv[i][2] * Math.pow(1.1,inv[i][1])); //computes cost of next object
				document.getElementById(inv[i][0]+'Cost').innerHTML = inv[i][3]; //updates object cost for user
			}
		}
	};
}; */

function buyObject(object) //new cost = base cost(1.1^n) where n=num of object
{
	for(var key in inventory)
	{
		if(key==object)
		{
			if(gald >= inventory[key].currentCost) //[3]=curCost, if can player afford object
			{
				inventory[key].numOf++; //[1]=#of, object++
				gald = gald - inventory[key].currentCost; //gald-curCost
				document.getElementById(key).innerHTML = inventory[key].numOf; //updates #of for user
				document.getElementById('gald').innerHTML = clean(gald); //same as above but for gald
				inventory[key].currentCost = Math.floor(inventory[key].baseCost * Math.pow(1.1,inventory[key].numOf)); //computes cost of next object
				document.getElementById(key+'Cost').innerHTML = inventory[key].currentCost; //updates object cost for user
			}
		}
	};
};

//Save game function
/*function save()
{
	var saveFile = []; //creates the variable, which stores information we want to save
	for(var i=0; i<inv.length; i++) //clones contents of inv into saveFile
		saveFile.push(inv[i]);
	saveFile.push(gald);
	localStorage.setItem("saveFile",JSON.stringify(saveFile)); //JSON method turns info into a String
}*/

function save()
{
	var saveKeys = jQuery.extend(true, {}, inventory); //creates the variable, which stores information we want to save
	//for(var key in inventory) //clones contents of inv into saveFile
	//	$(myFunction).extend(key);
	var saveMoney = {dosh: gald};
	$.extend(saveKeys, saveMoney);
	localStorage.setItem("saveKeys",JSON.stringify(saveKeys)); //JSON method turns info into a String
}


//Load game function
/*function load() //saveFile stores inv[i, i+1, i+2...] as [i, i+1, i+2...] and gald as the last entry
{
	console.log((inv[0])+"start load");														////////////////////////////////
	var savegame = JSON.parse(localStorage.getItem("saveFile")); //decrypts String; converts into values via savegame.gald etc
	if(savegame != null)
	{
		gald=savegame[savegame.length-1]; //gald becomes last entry of savegame
		for(var i=0; i<inv.length; i++) //runs for the current length of inv
			for(var x=0; x<inv[i].length; x++) //runs for the length of array at i
				if(typeof savegame[i][x]===typeof defaultInv[i][x]) //is the value in savegame WRONG, basically
					inv[i][x] = savegame[i][x]; //each value at x in array i for inv becomes the matching value from savegame
				else
					inv[i][x] = defaultInv[i][x];
		console.log("Loaded!");
	}
	else
		console.log("No save detected!");
	console.log((inv[0])+"end load");														////////////////////////////////
	refresh();
}*/

function load() //saveFile stores inv[i, i+1, i+2...] as [i, i+1, i+2...] and gald as the last entry
{
	var saveKeys = JSON.parse(localStorage.getItem("saveKeys")); //decrypts String; converts into values via savegame.gald etc
	if(saveKeys != null)
	{
		gald=saveKeys.dosh; //gald becomes last entry of savegame
		delete saveKeys.dosh;
		for(var key in inventory) //runs for the current length of inv
				if(typeof inventory[key]===typeof saveKeys[key]) //is the value in savegame WRONG, basically
					inventory[key] = saveKeys[key]; //each value at x in array i for inv becomes the matching value from savegame
				else
					inventory[key] = defaultInventory[key]; 
		console.log("Loaded!");
	}
	else
		console.log("No save detected!");
	refresh();
}



//Erase save function
/*function erase()
{
	localStorage.removeItem("saveFile"); //removes the save from clientside storage
	gald=0;
	for(var i=0; i<inv.length; i++)
	{
		inv[i][1]=0; //# of object becomes 0
		inv[i][3]=inv[i][2]; //current cost becomes default cost
	}
	refresh();
	console.log("Erased!");
}*/

function erase()
{
	localStorage.removeItem("saveKeys"); //removes the save from clientside storage
	gald=0;
	//for(var key in inventory)
	//{
	//	inventory[key].n=0; //# of object becomes 0
	//	inv[i][3]=inv[i][2]; //current cost becomes default cost
	//}
	inventory = jQuery.extend(true, {}, defaultInventory);
	refresh();
	console.log("Erased!");
}

//Function to prettify numbers & rogue decimals
function clean(input)
{
	var output = Math.round(input) // * 1000000)/1000000; cleans it up to like, 6? Decimals.
	return output;
}

//THE GAME LOOP
window.setInterval(function()
{
	tick();
}, 1000); //The above fires once every 1000ms

window.addEventListener("beforeunload", function() {
    save();
});

//Refreshes displayed values in the HTML file
/*function refresh()
{
	document.getElementById('gald').innerHTML = clean(gald);
	for(var i=0; i<inv.length; i++)
	{
		document.getElementById(inv[i][0]).innerHTML = inv[i][1];
		document.getElementById(inv[i][0]+'Cost').innerHTML = inv[i][3];
	}
	console.log("Refreshed!");
}*/

function refresh()
{
	document.getElementById('gald').innerHTML = clean(gald);
	for(var key in inventory)
	{
		document.getElementById(key).innerHTML = inventory[key].numOf;
		document.getElementById(key+'Cost').innerHTML = inventory[key].currentCost;
	}
	console.log("Refreshed!");
}

/* ********** ********** Welcome to the OLD N BUSTED playground ********** **********
                where we store shit we're not quite ready to get rid of

//THE SAVE LOOP

window.setInterval(function()
{
	save(); 
	console.log("Saved.");
}, 30000); //The above fires once every 1000ms

//OLD GAME LOOP

for(var i = 0; i<Object.keys(inv).length; i++)
{
	//tick(clean(inv[i][1]  ));  // /2)*1); //clicks for # of i /2 (twice a second) * 1 (currently 1 per unit; change this)
}

 ********** ********** Don't forget your belongings as you exit ********** **********


Changelog for funzies:
v0.001 - The world as we know it came to be.
... The Dark Ages; nothing was logged during this time.
v0.008 - Erase now dynamic; functions on a for loop.
v0.010 - buildings have values! dynamic tick! double support! default values! save checks for null values! dynamic loading! WHOA
v0.020 - completely redid inventory and -all- associated functions; changed from dynamic array to Object of Objects
*/