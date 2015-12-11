
//initialize variables
var gald = 0;
//var cursors = 0;
//var cursorCost = 10;

//var inv = [];//[w,x,y,z] w = name, x = num of, y = base cost, z = current cost
//inv['homeless'] = [0,100,100];//added homeless to the item list
var inv = [];
inv.push(["homeless", 0, 100, 100]);
//main functions
function cookieClick(number)
{
	gald = gald + number; //gald++ on function call
	document.getElementById("gald").innerHTML = gald; //when the HTML file calls for gald, it'll return value of gald var
};

function buyObject(object)//homeless - new cost = base cost(1.1^n) where n=num of object
{
 /*   console.log(object);//homeless
	console.log(inv[object]);//[0,10]
	console.log(inv[object][0]);//0
	console.log(inv[object][1]);//10*/
	//console.log(object+'Cost'); homelessCost
	//var currentCost = Math.floor(inv[object][1] * Math.pow(1.1,inv[object][0]));     //works out the cost of this cursor
	for(var i=0; i<inv.length; i++)
		if(inv[i][0]==object)
		{
		//	var objLoc = i;//finds the location of given string
		if(gald >= inv[i][3]){                                   //checks that the player can afford the cursor
			inv[i][1] = inv[i][1]+1;                                   //increases number of homeless
			gald = gald - inv[i][3];                          //removes the gald spent
			document.getElementById(inv[i][0]).innerHTML = inv[i][1];  //updates the number of homeless for the user
			document.getElementById('gald').innerHTML = gald;  //updates the number of gald for the user
			inv[i][3] = Math.floor(inv[i][2] * Math.pow(1.1,inv[i][1]));        //works out the cost of the next cursor
			document.getElementById(inv[i][0]+'Cost').innerHTML = inv[i][3];  //updates the cursor cost for the user
			}
		};
};

//Save game function
function save()
{
	var save = { //creates the variable, which stores information we want to save
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
	inv[0][3] = Math.floor(inv[0][2] * Math.pow(1.1,inv[0][1]));
	console.log("Loaded!");
	refresh();
}

//Erase save function
function erase()
{
	if(confirm("Do you really want to erase your hard-earned fictional items?"))
	{
	localStorage.removeItem("save");
	gald=0;
	inv[0]=["homeless",0,100,100];
	refresh();
	}
	console.log("Erased!");
	return;
}

//Function to prettify numbers & rogue decimals
function clean(input)
{
	var output = Math.round(input) //* 10000000000000000)/10000000000000000; //cleans it up to like, 6? Decimals.
	return output;
}

//THE GAME LOOP
window.setInterval(function()
{
save();//Autosaves every fire
for(var i = 0; i<Object.keys(inv).length; i++)
		{
			cookieClick(clean(inv[i][1]/2)+1);
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


