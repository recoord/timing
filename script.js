var canvas;
var ctx;
var starttime;
var laststep;

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

let msstep = 1000/60;

var last_ms = 0;
var audio;
var last_audio = 0;
var audio_interval = 3000;

function update()
{
    let n = Date.now();
    
    let y = ((step * stepheight) % window.innerHeight); 
    //getms() * 3 % window.innerHeight
        
    let dobeep = n - last_audio > audio_interval;
    if(dobeep)
    {
        last_audio = n;
    }
    
    if(dobeep)
    {
        ctx.fillStyle = "white";
        audio.play();
    }
    else
    {    
        ctx.fillStyle = "black";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    if(!dobeep)
    {
        ctx.fillStyle = "white";
    }
    else
    {    
        ctx.fillStyle = "black";
    }
    
    let blocksize = 100;
    let blocklevel = 0;
    let d = audio_interval - (n - last_audio);    
    

    ctx.fillRect(window.innerWidth/2 - d - blocksize , blocklevel, blocksize, blocksize);    
    ctx.fillRect(window.innerWidth/2 + d,              blocklevel, blocksize, blocksize);    
    
    

    if(dobeep)
    {
        ctx.fillStyle = "black";
    }
    else
    {
        ctx.fillStyle = "white";
    }
    ctx.fillRect(0, y, window.innerWidth, stepheight);    
    let deltastep = n - laststep;
    ctx.fillText(deltastep.toString(), 10, window.innerHeight);

    
    if(!dobeep)
    {
        ctx.fillStyle = "black";
    }
    else
    {
        ctx.fillStyle = "white";
    }
    
    ctx.fillText(getTimeString(), window.innerWidth/2 - 300, y + 100);
    step += 1;
    if(step * stepheight > window.innerHeight)
    {
        step = 0;
    }
    laststep = n;
    //setTimeout(update, msstep);
    window.requestAnimationFrame(update);
}

window.onload = (event) => {
    canvas = document.getElementById("canvas");    
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.font = "bold 80px Arial";
    starttime = Date.now();
    laststep = starttime;
    audio = new Audio('beep.wav');
    audio.play();
    window.requestAnimationFrame(update);
    //update();
};

