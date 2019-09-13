
var headButton = document.getElementsByClassName("head-button");
var areas = document.getElementsByClassName("area");
var clicks = 0;

// Getting the top scroll of the page
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

// Getting offset top of the areas
function elmYPosition(clickedId) {
  var areaOffset = document.getElementById("areaFor" + clickedId).offsetTop;
  return areaOffset;
}

// Smooth scrolling to the areas
function smoothScroll() {
  var startY = currentYPosition();
  var stopY = elmYPosition(this.id);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }

  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
}

// Filling the circle buttons with blue color
var btnFill = function() {
  for (i = 0; i < areas.length; i++) {
    var areaT = areas[i].getBoundingClientRect().top;
    var windowT = window.innerHeight;
    var areaY = Math.round((areaT * 100) / windowT);
    if (areaY > -50 && areaY < 50) {
      var btnId = areas[i].id.replace("areaFor", "");
      for (i in headButton) {
        headButton[i].style.backgroundColor = "#ffffff";
        document.getElementById(btnId).style.backgroundColor = "#0199ff";
      }
    }
  }
};

// Removing the down button when the page is scrolled to the bottom
var btnOut = function(){
  var scrollBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight;
  if(scrollBottom == 0){
    document.getElementById("downBtn").setAttribute("style","right:-100%;bottom:-100%")
    clicks = 0;
  }
  else{
    document.getElementById("downBtn").setAttribute("style","right:10px;bottom:10px")
  }
}

// Counting the click event of the down button
function clicksCount(){
  clicks += 1;
  if(clicks == 1){
    document.getElementById("BtnTwo").click();
  }
  else if(clicks == 2){
    document.getElementById("BtnThree").click();
  }
}

for (i = 0; i < headButton.length; i++) {
  headButton[i].addEventListener("click", smoothScroll);
}

window.addEventListener("load",btnFill)

window.addEventListener("scroll",btnFill)
window.addEventListener("scroll",btnOut)

document.getElementById("downBtn").addEventListener("click",clicksCount);
