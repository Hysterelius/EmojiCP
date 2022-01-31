// Gets the size that the should be canvas off the size control slider
let size = document.getElementById("SizeControl").value;

// Sets the canvas size
let c = document.getElementById("myCanvas");
c.setAttribute("width", size * 3);
c.setAttribute("height", size * 3);

// The two default colours for the gradient
let colour1 = "#858e96";
let colour2 = "#60696b";
prepareCanvas();

// Tells the program there is no current emoji
var currentEmoji = null;

// Add an event upon emoji selection to get 
document.querySelector("emoji-picker")
  .addEventListener("emoji-click", event => emojiPicker(event.detail));

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");
  
    range.addEventListener("input", () => {
      setBubble(range, bubble);
    });
    setBubble(range, bubble);
});
  
function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val * 3 + " px";
  
    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
  

async function emojiPicker(detail) {
    currentEmoji = detail;
    let x = detail["unicode"];
    let str = await twemoji.parse(x, {
        folder: 'svg',
        ext: '.svg'
      });
    let file = str.slice(
        str.indexOf("https:"),
        str.lastIndexOf(".svg") + 4,
    );

    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    getText(file).then(function(text){
        drawInlineSVG(ctx, text[0], function() {
        });
        currentEmoji["source"] = text[1];
    }

    );

}

function downloadCanvas() {
    let canvas = document.getElementById("myCanvas");
    // get canvas data  
    let image = canvas.toDataURL();

    // create temporary link  
    let tmpLink = document.createElement( "a" );
    if (currentEmoji) {
        tmpLink.download = `ContactPhoto-(${currentEmoji["emoji"]["annotation"].replaceAll(" ", "-")})-${size*3}px.png`; // set the name of the download file 
    } else {
        tmpLink.download = "image.png" // set the name of the download file 
    }
    tmpLink.href = image;  

    // temporarily add link to body and initiate the download  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}

async function getText(file) {
    let x = await fetch(file);
    let y = await x.text();
    let z = await editSVG(y);

    return [z, y];
}

function editSVG(svg) {
    let pos = svg.indexOf("svg") + 4;
    let newSVG = svg.slice(0, pos) + `width=\"${size}\" height=\"${size}\" ` + svg.slice(pos);
    return newSVG;
}



function drawInlineSVG(ctx, rawSVG, callback) {
    let svg = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"}),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        img = new Image;

    img.onload = function () {
        prepareCanvas(false);

        ctx.drawImage(this, size, size);
        domURL.revokeObjectURL(url);
        callback(this);
    };

    img.src = url;
}

function prepareCanvas(doUpdate) {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);

    let xpos = Math.floor(size*3/2);

    let grd = ctx.createLinearGradient(xpos, 0, xpos, size*3);
    grd.addColorStop(0, colour1);
    grd.addColorStop(1, colour2);
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, c.width, c.height);
    
    if (currentEmoji && doUpdate) {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");


        drawInlineSVG(ctx, editSVG(currentEmoji["source"]), function() {
        })

    }
}

function changeColour1() {
    colour1 = document.getElementById("Colour1").value;
    prepareCanvas(true);
}

function changeColour2() {
    colour2 = document.getElementById("Colour2").value;
    prepareCanvas(true);
}

function changeSize() {
    size = document.getElementById("SizeControl").value;
    let c = document.getElementById("myCanvas");
    c.setAttribute("width", size * 3);
    c.setAttribute("height", size * 3);
    prepareCanvas(true);
}