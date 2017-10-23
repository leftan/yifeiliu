var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var ff = navigator.userAgent.indexOf('Firefox') > 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
if (iOS) document.body.classList.add('iOS');

var fireworks = (function() {

  var getFontSize = function() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  var canvas = document.querySelector('.fireworks');
  var ctx = canvas.getContext('2d');
  var numberOfParticules = 24;
  var distance = 200;
  var x = 0;
  var y = 0;
  var animations = [];

  var setCanvasSize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  var updateCoords = function(e) {
    x = e.clientX || e.touches[0].clientX;
    y = e.clientY || e.touches[0].clientY;
  }

  // var colors = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99'];
  var colors = ["#FFFC2B", "#00b3fe", "#2980B9", "#282741"];

  var createCircle = function(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.color = '#FFF';
    p.radius = 0;
    p.alpha = 1;
    p.lineWidth = 6;
    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    return p;
  }

  var createParticule = function(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(getFontSize(), getFontSize() * 2);
    p.draw = function() {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    return p;
  }

  var createParticles = function(x,y) {
    var particules = [];
    for (var i = 0; i < numberOfParticules; i++) {
      var p = createParticule(x, y);
      particules.push(p);
    }
    return particules;
  }

  var removeAnimation = function(animation) {
    var index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
  }

  var animateParticules = function(x, y) {
    setCanvasSize();
    var particules = createParticles(x, y);
    var circle = createCircle(x, y);
    var particulesAnimation = anime({
      targets: particules,
      x: function(p) { return p.x + anime.random(-distance, distance); },
      y: function(p) { return p.y + anime.random(-distance, distance); },
      radius: 0,
      duration: function() { return anime.random(1200, 1800); },
      easing: 'easeOutExpo',
      complete: removeAnimation
    });
    var circleAnimation = anime({
      targets: circle,
      radius: function() { return anime.random(getFontSize() * 8.75, getFontSize() * 11.25); },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: function() { return anime.random(400, 600); }
      },
      duration: function() { return anime.random(1200, 1800); },
      easing: 'easeOutExpo',
      complete: removeAnimation
    });
    animations.push(particulesAnimation);
    animations.push(circleAnimation);
  }

  var mainLoop = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach(function(anim) {
        anim.animatables.forEach(function(animatable) {
          animatable.target.draw();
        });
      });
    }
  });

  document.addEventListener(tap, function(e) {
    updateCoords(e);
    animateParticules(x, y);
  }, false);

  window.addEventListener('resize', setCanvasSize, false);

  return {
    boom: animateParticules
  }

})();





// anime
// var c = document.getElementById("c");
// var ctx = c.getContext("2d");
// var cH;
// var cW;
// var bgColor = "#FF6138";
// var animations = [];
// var circles = [];

// var colorPicker = (function() {
//   var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
//   var index = 0;
//   function next() {
//     index = index++ < colors.length-1 ? index : 0;
//     return colors[index];
//   }
//   function current() {
//     return colors[index]
//   }
//   return {
//     next: next,
//     current: current
//   }
// })();

// function removeAnimation(animation) {
//   var index = animations.indexOf(animation);
//   if (index > -1) animations.splice(index, 1);
// }

// function calcPageFillRadius(x, y) {
//   var l = Math.max(x - 0, cW - x);
//   var h = Math.max(y - 0, cH - y);
//   return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
// }

// function addClickListeners() {
//   document.addEventListener("touchstart", handleEvent);
//   document.addEventListener("mousedown", handleEvent);
// };

// function handleEvent(e) {
//     if (e.touches) { 
//       e.preventDefault();
//       e = e.touches[0];
//     }
//     var currentColor = colorPicker.current();
//     var nextColor = colorPicker.next();
//     var targetR = calcPageFillRadius(e.pageX, e.pageY);
//     var rippleSize = Math.min(200, (cW * .4));
//     var minCoverDuration = 750;
    
//     var pageFill = new Circle({
//       x: e.pageX,
//       y: e.pageY,
//       r: 0,
//       fill: nextColor
//     });
//     var fillAnimation = anime({
//       targets: pageFill,
//       r: targetR,
//       duration:  Math.max(targetR / 2 , minCoverDuration ),
//       easing: "easeOutQuart",
//       complete: function(){
//         bgColor = pageFill.fill;
//         removeAnimation(fillAnimation);
//       }
//     });
    
//     var ripple = new Circle({
//       x: e.pageX,
//       y: e.pageY,
//       r: 0,
//       fill: currentColor,
//       stroke: {
//         width: 3,
//         color: currentColor
//       },
//       opacity: 1
//     });
//     var rippleAnimation = anime({
//       targets: ripple,
//       r: rippleSize,
//       opacity: 0,
//       easing: "easeOutExpo",
//       duration: 900,
//       complete: removeAnimation
//     });
    
//     var particles = [];
//     for (var i=0; i<32; i++) {
//       var particle = new Circle({
//         x: e.pageX,
//         y: e.pageY,
//         fill: currentColor,
//         r: anime.random(24, 48)
//       })
//       particles.push(particle);
//     }
//     var particlesAnimation = anime({
//       targets: particles,
//       x: function(particle){
//         return particle.x + anime.random(rippleSize, -rippleSize);
//       },
//       y: function(particle){
//         return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
//       },
//       r: 0,
//       easing: "easeOutExpo",
//       duration: anime.random(1000,1300),
//       complete: removeAnimation
//     });
//     animations.push(fillAnimation, rippleAnimation, particlesAnimation);
// }

// function extend(a, b){
//   for(var key in b) {
//     if(b.hasOwnProperty(key)) {
//       a[key] = b[key];
//     }
//   }
//   return a;
// }

// var Circle = function(opts) {
//   extend(this, opts);
// }

// Circle.prototype.draw = function() {
//   ctx.globalAlpha = this.opacity || 1;
//   ctx.beginPath();
//   ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//   if (this.stroke) {
//     ctx.strokeStyle = this.stroke.color;
//     ctx.lineWidth = this.stroke.width;
//     ctx.stroke();
//   }
//   if (this.fill) {
//     ctx.fillStyle = this.fill;
//     ctx.fill();
//   }
//   ctx.closePath();
//   ctx.globalAlpha = 1;
// }

// var animate = anime({
//   duration: Infinity,
//   update: function() {
//     ctx.fillStyle = bgColor;
//     ctx.fillRect(0, 0, cW, cH);
//     animations.forEach(function(anim) {
//       anim.animatables.forEach(function(animatable) {
//         animatable.target.draw();
//       });
//     });
//   }
// });

// var resizeCanvas = function() {
//   cW = window.innerWidth;
//   cH = window.innerHeight;
//   c.width = cW * devicePixelRatio;
//   c.height = cH * devicePixelRatio;
//   ctx.scale(devicePixelRatio, devicePixelRatio);
// };

// (function init() {
//   resizeCanvas();
//   if (window.CP) {
//     // CodePen's loop detection was causin' problems
//     // and I have no idea why, so...
//     window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
//   }
//   window.addEventListener("resize", resizeCanvas);
//   addClickListeners();
//   if (!!window.location.pathname.match(/fullcpgrid/)) {
//     startFauxClicking();
//   }
//   handleInactiveUser();
// })();

// function handleInactiveUser() {
//   var inactive = setTimeout(function(){
//     fauxClick(cW/2, cH/2);
//   }, 2000);
  
//   function clearInactiveTimeout() {
//     clearTimeout(inactive);
//     document.removeEventListener("mousedown", clearInactiveTimeout);
//     document.removeEventListener("touchstart", clearInactiveTimeout);
//   }
  
//   document.addEventListener("mousedown", clearInactiveTimeout);
//   document.addEventListener("touchstart", clearInactiveTimeout);
// }

// function startFauxClicking() {
//   setTimeout(function(){
//     fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
//     startFauxClicking();
//   }, anime.random(200, 900));
// }

// function fauxClick(x, y) {
//   var fauxClick = new Event("mousedown");
//   fauxClick.pageX = x;
//   fauxClick.pageY = y;
//   document.dispatchEvent(fauxClick);
// }
