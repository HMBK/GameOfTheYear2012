
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
var inv = []; //[0 name, 1 #of, 2 initCost, 3 curCost]

//adding purchasable buildings
inv.push(["homeless", 0, 100, 100]);

//main functions
function cookieClick(number)//REPLACE THIS WITH FUNCTION THAT ADDS BASED ON ANOTHER... VALUE IN THE MATRIX UP TOP?
{
	gald = gald + number; //gald++ on function call
	document.getElementById("gald").innerHTML = gald; //when the HTML file calls for gald, it'll return value of gald var
};

// Increase gald every time produce-widget is clicked
$(document).on('click', '#scrounge', function () {
	gald += Math.floor((Math.random() * 30) + 5);; //remember *upper+lower bounds
	refresh();
});

function buyObject(object) //new cost = base cost(1.1^n) where n=num of object
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
				document.getElementById('gald').innerHTML = gald; //same as above but for gald
				inv[i][3] = Math.floor(inv[i][2] * Math.pow(1.1,inv[i][1])); //computes cost of next object
				document.getElementById(inv[i][0]+'Cost').innerHTML = inv[i][3]; //updates object cost for user
			}
		}
	};
};

//Save game function
function save()
{
	var saveFile = []; //creates the variable, which stores information we want to save
	for(var i=0; i<inv.length; i++) //clones contents of inv into saveFile
		saveFile.push(inv[i]);
	saveFile.push(gald);
	localStorage.setItem("saveFile",JSON.stringify(saveFile)); //JSON method turns info into a String
}

//Load game function
function load() //saveFile stores inv[i, i+1, i+2...] as [i, i+1, i+2...] and gald as the last entry
{
	var savegame = JSON.parse(localStorage.getItem("saveFile")); //decrypts String; converts into values via savegame.gald etc
	gald=savegame[savegame.length-1]; //gald becomes last entry of savegame
	for(var i=0; i<inv.length; i++) //runs for the current length of inv
		for(var x=0; x<inv[i].length; x++) //runs for the length of array at i
			inv[i][x] = savegame[i][x]; //each value at x in array i for inv becomes the matching value from savegame
	console.log("Loaded!");
	refresh();
}

//Erase save function
function erase()
{
	localStorage.removeItem("saveFile"); //removes the save from clientside storage
	gald=0;
	inv[0]=["homeless",0,100,100]; //make this a for loop too; inv[i] at 0 & 2 can stay the same, 1="0" and 3=2
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
	for(var i = 0; i<Object.keys(inv).length; i++)
	{
		cookieClick(clean(inv[i][1]/2)*1); //clicks for # of i /2 (twice a second) * 1 (currently 1 per unit; change this)
	}
}, 500); //The above fires once every 1000ms

//THE SAVE LOOP
/*
window.setInterval(function()
{
	save(); 
	console.log("Saved.");
}, 30000); //The above fires once every 1000ms
*/
window.addEventListener("beforeunload", function() {
    save();
});

//Refreshes displayed values in the HTML file
function refresh()
{
	document.getElementById('gald').innerHTML = gald;
	for(var i=0; i<inv.length; i++)
	{
		document.getElementById(inv[i][0]).innerHTML = inv[i][1];
		document.getElementById(inv[i][0]+'Cost').innerHTML = inv[i][3];
	}
	console.log("Refreshed!");
}


