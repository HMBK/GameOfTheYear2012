
//initialize variables
var cookies = 0;
var cursors = 0;

//main functions
function cookieClick(number)
{
    cookies = cookies + number; //cookies++ on function call
    document.getElementById("cookies").innerHTML = cookies; //when the HTML file calls for cookies, it'll return value of cookies var
};

function buyCursor()
{
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};


//THE GAME LOOP
window.setInterval(function()
{
cookieClick(cursors);
}, 1000); //The above fires once every 1000ms