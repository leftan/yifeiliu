// ball

    function Ball(fillColor, radius) {
        if (fillColor === undefined) { fillColor = '#f00'; }
        if (radius === undefined) { radius = 30; }
        this.fillColor = fillColor;
        this.radius = radius;
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.vx = 0; 
        this.vy = 0;
    }

    Ball.prototype.draw = function (ctx) {
        ctx.save();
        ctx.fillStyle = this.fillColor;
        ctx.rotate(this.rotation);
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        ctx.closePath(); 
        ctx.fill();
        ctx.restore();
    };

    var utils = {};

    utils.getRandomColor = function () {
        return 'rgba(' + Math.ceil(Math.random() * 255) + ', ' + Math.ceil(Math.random() * 255) + ', ' + Math.ceil(Math.random() * 255) + ', 1)';
    };

    utils.getMouseCoords = function(element) {
        var mouse = { x: 0, y: 0 };
        element.addEventListener('mousemove', function(e) {
            var x = e.pageX,
                y = e.pageY;
            x -= e.target.offsetLeft;
            y -= e.target.offsetTop;
            mouse.x = x;
            mouse.y = y;
        }, false);
        
        return mouse;
    };


    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        W = canvas.width = window.innerWidth,
        H = canvas.height = window.innerHeight,
        balls = [],
        numBalls = 100,
        mouse = utils.getMouseCoords(canvas);

    for (var ball, i = 0; i < numBalls; i++) {
      ball = new Ball(utils.getRandomColor(), Math.random() * 5);
      ball.x = Math.random() * W;
      ball.y = Math.random() * H;
      ball.vx = Math.random() * 6 - 3;
      ball.vy = Math.random() * 6 - 3;
      balls.push(ball);
    } 
     
    function draw(ball) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.draw(ctx);
      if (ball.x + ball.radius > W) {
        ball.x = W - ball.radius;
        ball.vx *= -1;
      } else if (ball.x - ball.radius < 0) {
        ball.x = 0 + ball.radius;
        ball.vx *= -1;
      } else if (ball.y + ball.radius > H) {
        ball.y = H - ball.radius;
        ball.vy *= -1;
      } else if (ball.y - ball.radius < 0) {
        ball.y = 0 + ball.radius;
        ball.vy *= -1;
      }
    }

    function enlargeBalls(ball) {
      canvas.addEventListener('mousemove', function() {
        var currentPosX = ball.x,
            currentPosY = ball.y,
            oldColor = ball.fillColor;

        if (mouse.x +100 - ball.x < 200 && mouse.x +100 - ball.x > 0 && mouse.y + 100 - ball.y < 200 && mouse.y + 100 - ball.y > 0 || mouse.x == ball.x || mouse.y == ball.y) {
          ball.scaleX = 5;
          ball.scaleY = 5;
        }else  if (mouse.x +150 - ball.x < 250 && mouse.x +150 - ball.x > 0 && mouse.y + 150 - ball.y < 250 && mouse.y + 150 - ball.y > 0 || mouse.x == ball.x || mouse.y == ball.y) { 
          ball.scaleX = 3;
          ball.scaleY = 3;
        } else {
          ball.scaleX = 1;
          ball.scaleY = 1;
        }

      }, false);
    }

    (function drawFrame() {
      window.requestAnimationFrame(drawFrame, canvas);
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, W, H);
      balls.forEach(enlargeBalls);
      balls.forEach(draw);
    }());