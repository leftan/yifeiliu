var ball;
var Paddle;
var Paddle2;
var speed = 5;
// var cnv;


// function centerCanvas(){
//     var x = (windowWidth - width) / 2;
//     var y = (windowHeight - height) / 2;
//     cnv.position(x, y);
// }

function setup(){
    var canvas = createCanvas(600,600);
    canvas.parent('sketch-holder');
    // centerCanvas();
    ball = {
        x: width/2,
        y: height/2,
        xdir: -1,
        ydir: 0,
        draw: function(){
            fill(0);
            ellipse(this.x,this.y,15,15);
            this.x += this.xdir * speed;
            this.y += this.ydir * speed;
        }
    }
    paddle = new Paddle(0, 250);
    paddle2 = new Paddle(580, 250);

    lines = {
        draw: function(){
            stroke(0);
            strokeWeight(6);
            line(20,0,20,600); //first line left
            line(300,400,300,510); // second line left
            line(400,40,400,600); // middle line
            line(440,40,440,510); // second line right
            line(580,0,580,600); // first line right
            line(20,40,580,40);//first line top
            line(400,150,580,150); //third line top
            line(20,400,400,400); //left, second line bottom
            line(20,510,580,510); //left, first line bottom

        }
    }

    blocks = {
        draw: function(){
            // rectMode(CENTER);
            noStroke();
            fill(235,215,0);
            rect(23,43,374,354); //second yellow rect left
            // rect(x+635,y+265,200+(power*70),200+(power*70));//big yellow rect
            // rect(x+776,y+115,25+(power*70),40+(power*70));//first yellow rect right
            fill(185,0,0);
            rect(403,513,174,90); //big red rect
            rect(403,43,34,104); //big red rect
            // rect(x+490,y+400,30+(power*70),11+(power*70)); //small red rect, bottom

            fill(0,40,105);
            rect(303,403, 94,104);//left bottom blue rect 
            // rect(x+610,y+437,165+(power*20),20+(power*20));//middle bottom blue rect
            // rect(x+590,y+60,242+(power*20),24+(power*20));//top  blue rect
          
        }
    }
}

function draw(){
    background('#fafafa');
    lines.draw();
    blocks.draw();
    ball.draw();
    paddle.draw();
    paddle2.draw();
    if (keyIsDown(87)){
        paddle.y -= 5;
    } else if (keyIsDown(83)){
        paddle.y += 5;
    }

    if (paddle.hit(ball) || paddle2.hit(ball)){
        ball.xdir *= -1;
        pickydir();
    }

    if (ball.y < 0 || ball.y > height){
        ball.ydir *= -1;
    }

    if (keyIsDown(79)){
        paddle2.y -= 5;
    } else if (keyIsDown(76)){
        paddle2.y += 5;
    }
}


// function windowResized(){
//     centerCanvas();
// }

function pickydir(){
    var num = random(0, 1);
    if (num <= 0.5){
        ball.ydir = -1;
    } else if (num >= 0.5){
        ball.ydir = 1;
    }  
}

function Paddle(x, y){
    this.x = x;
    this.y = y;
    this.draw = function(){
        fill(0);
        rect(this.x,this.y,20,70);
        this.y = constrain(this.y,0,530);
    }
    this.hit = function(ball){
        if (this.x == ball.x){
            if (this.y < ball.y){
                if (this.y + 80 > ball.y){
                    return true;
                } else {
                    return false;
                } 
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}