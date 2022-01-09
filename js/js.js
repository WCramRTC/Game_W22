/* UI Elements*/
let btnLorem;
let btnPTag;
let btnHeading;
let btnInline;
let btnList;
let display;

/* Game Variables */
let cps = 0;
let totalScore = 0;

/* Timer Variable */
var stop = false;
var frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;
let targetFps = 10;

window.onload = function() {
    setupEvents();
    startAnimating(targetFps);
}

function setupEvents() {
    btnLorem = document.getElementById('btnLorem');
    btnPTag = document.getElementById('btnPTag');
    btnHeading = document.getElementById('btnHeading');
    btnInline = document.getElementById('btnInline');
    btnList = document.getElementById('btnList');
    display = document.getElementById('display');

    btnLorem.addEventListener("click", function() { addValue(.1)});
    btnPTag.addEventListener("click", function() { addValue(5)});
    btnHeading.addEventListener("click", function() { addValue(25)});
    btnInline.addEventListener("click", function() { addValue(100)});
    btnList.addEventListener("click", function() { addValue(250)});
}

function addValue(value) {
    cps += value;
}

function changeValue(value) {
    addValue(value);
    displayUpdate(cps);
}

function displayUpdate(value) {
    display.textContent = value;
}

/* Timer */


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    console.log(startTime);
    animate();
} // startAnimating

function animate(newtime) {

    // stop
    if (stop) {
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = newtime;
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here


        // TESTING...Report #seconds since start and achieved fps.
        var sinceStart = now - startTime;
        var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        // display.textContent = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps." + " Score: " + totalScore;
        totalScore += cps  / targetFps;
        display.textContent = "Cps: " + cps + " - Total Score: " + totalScore;
    }
} // animate

// alert("this works");