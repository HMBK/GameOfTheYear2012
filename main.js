
/********
NOTES
{
	use console.log() to debug
	to disable a button such as $scrounge, use $('#scrounge').addClass('disabled');

}
********/

//initialize variables
var gald = 0;
var inv = []; //[name, #of, initCost, curCost]
inv.push(["homeless", 0, 100, 100]);

//main functions
function cookieClick(number)//REPLACE THIS WITH FUNCTION THAT ADDS BASED ON ANOTHER... VALUE IN THE MATRIX UP TOP?
{
	gald = gald + number; //gald++ on function call
	document.getElementById("gald").innerHTML = gald; //when the HTML file calls for gald, it'll return value of gald var
};

// Increase numWidgets every time produce-widget is clicked
$('#scrounge').on('click', function () {
    gald += 100;
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
	var save = //creates the variable, which stores information we want to save
	{
		gald: gald,
		homeless: inv[0][1]
	}
	localStorage.setItem("save",JSON.stringify(save)); //JSON method turns info into a String
}

//Load game function
function load()
{
	var savegame = JSON.parse(localStorage.getItem("save")); //same as above but reverse
	//above var should now contain info via savegame.gald, etc
	if (typeof savegame.gald !== "undefined") gald = savegame.gald; //If a past save didn't have a new mechanic,
	if (typeof savegame.homeless !== "undefined") inv[0][1] = savegame.homeless; //load it. Else, it'll start at 0.
	inv[0][3] = Math.floor(inv[0][2] * Math.pow(1.1,inv[0][1])); //sets prices based on #of loaded; MAKE A FOR LOOP
	console.log("Loaded!");
	refresh();
}

//Erase save function
function erase()
{
		localStorage.removeItem("save");
		gald=0;
		inv[0]=["homeless",0,100,100];//make this a for loop too; inv[i] at 0 & 2 can stay the same, 1=0 and 3=2
		refresh();
	console.log("Erased!");
	return;
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
save();//Autosaves every fire
for(var i = 0; i<Object.keys(inv).length; i++)
{
	cookieClick(clean(inv[i][1]/2)*1); //clicks for # of i /2 (twice a second) * 1 (currently 1 per unit; change this)
}
}, 500); //The above fires once every 1000ms

//Refreshes displayed values in the HTML file
function refresh()
{
	document.getElementById('gald').innerHTML = gald;
	document.getElementById(inv[0][0]).innerHTML = inv[0][1];//NOTE replace this with a for : each once more things are in
	document.getElementById(inv[0][0]+'Cost').innerHTML = inv[0][3];
	console.log("Refreshed!");
}


