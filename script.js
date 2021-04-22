var canvas;
var ctx;
var starttime;

function pad(n, l)
{
    var s = ("000" + n);
    return s.substr(s.length - l);
}


function getms()
{
    return Date.now() - starttime
}


function getTimeString()
{
    let v = getms();
    
    //Extract milliseconds
    ms = v % 1000;
    
    //Convert to seconds
    v -= ms;
    v /= 1000;
    
    //Extract seconds
    let s = v % 60;
    v -= s;

    //Convert to minutes
    v /= 60;
    
    //extract minutes
    let m = v % 60;
    v -= m;
    
    //Convert to hours
    v /= 60;
    
    //extract hours
    let h = v % 60;
    v -= h;
    
    //Convert to days
    let d = v / 24;
    
    return d.toString() + ":" + pad(h.toString(), 2) + ":" + pad(m.toString(), 2) + ":" + pad(s.toString(), 2) + "." + pad(ms.toString(), 3);
}

var step = 0;
let stepheight = 130;

var last_ms = 0;
function update()
{
    let y = ((step * stepheight) % window.innerHeight); 
    //getms() * 3 % window.innerHeight
        
    //Clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, y, window.innerWidth, stepheight);
    
    ctx.fillStyle = "black";
    ctx.fillText(getTimeString(), window.innerWidth/2 - 300, y + 100);

    step += 2;
    if(step * stepheight > window.innerHeight)
    {
        step = 0;
    }
    setTimeout(update, 33);
}

window.onload = (event) => {
    canvas = document.getElementById("canvas");    
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.font = "bold 80px Arial";
    starttime = Date.now();
    update();
};

