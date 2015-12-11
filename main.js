
//initialize variables
var cookies = 0;
var cursors = 0;
var cursorCost = 10;

//main functions
function cookieClick(number)
{
    cookies = cookies + number; //cookies++ on function call
    document.getElementById("cookies").innerHTML = cookies; //when the HTML file calls for cookies, it'll return value of cookies var
};

function buyCursor()
{
    cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

//Save game function
function save()
{
    var save = { //creates the variable, which stores information we want to save
        cookies: cookies,
        cursors: cursors
    }
    localStorage.setItem("save",JSON.stringify(save)); //JSON method turns info into a String
}

//Load game function
function load()
{
    var savegame = JSON.parse(localStorage.getItem("save")); //same as above but reverse
    //above var should now contain info via savegame.cookies, etc
    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies; //If a past save didn't have a new mechanic,
    if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors; //load it. Else, it'll start at 0.
    refresh();
}

//Erase save function
function erase()
{
    if(confirm("Do you really want to erase your hard-earned fictional items?"))
    {
    localStorage.removeItem("save");
    cookies=0;
    cursors=0;
    cursorCost=10;
    refresh();
    }
    return;
}

//Function to prettify numbers & rogue decimals
function clean(input)
{
    var output = Math.round(input * 1000000)/1000000; //cleans it up to like, 6? Decimals.
    return output;
}

//THE GAME LOOP
window.setInterval(function()
{
save();//Autosaves every fire
cookieClick(cursors);
}, 1000); //The above fires once every 1000ms

//Refreshes displayed values in the HTML file
function refresh()
{
    document.getElementById('cookies').innerHTML = cookies;
    document.getElementById('cursors').innerHTML = cursors;
    document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1,cursors));

}


