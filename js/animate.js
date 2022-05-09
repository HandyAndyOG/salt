// Change colour of nav when scrolling //

$(window).scroll(function(){
    $('.scroll').toggleClass('scrolled', $(this).scrollTop() > 10);
});

/* Toggle mobile menu */

const menu = document.querySelector('.menu');
const toggle = document.querySelector('.toggle');
const sidenav = document.querySelector('.sidenav');
const scroll = document.querySelector('.scroll');
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");

        // adds the menu (hamburger) icon
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
        toggle.querySelector("i").style.color = "";
        document.querySelector(".sidenav").style.width = "0px";
        document.getElementById("main").style.marginRight = "0px";
        
        var x = document.querySelectorAll(".sidenav a");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].style.color = "";
        }
        document.body.style.overflow = "";
        document.body.style.height = "";

    } else {
        menu.classList.add("active");

        // adds the close (x) icon
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
        toggle.querySelector("i").style.color = "rgb(51, 51, 51)"
        document.querySelector(".sidenav").style.width = "250px";
        document.getElementById("main").style.marginRight = "250px";
        var x = document.querySelectorAll(".sidenav a");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].style.color = "rgb(51, 51, 51)";
        }
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    }
}

/* Event Listener */

toggle.addEventListener("click", toggleMenu, false);

var messageArray = ["<span><</span>" + '/salt>'];
var textPosition = 0;
var speed = 100;

typewriter = () => {
  document.querySelector("#message").
  innerHTML = messageArray[0].substring(0, textPosition) + "<span>\u25ae</span>";

  if(textPosition++ != messageArray[0].length)
    setTimeout(typewriter, speed);
}

window.addEventListener("load", typewriter);