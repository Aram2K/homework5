 const canvas = document.getElementById('game');
    canvas.width= 1250;
    canvas.height= 600;
    const context = canvas.getContext("2d");
    let gameStatus = true;

    const rand = function(num) {
        return Math.floor(Math.random() * num); //Math.floor returns whole part of the number //Math.random [0,1)
    };

    const thanos = new Image();
    thanos.src ="https://vignette.wikia.nocookie.net/marvel-contestofchampions/images/6/61/Thanos_%28Infinity_War%29_Full.png/revision/latest?cb=20180715020919";

    const logo = new Image();
    logo.src ="https://us.v-cdn.net/6029252/uploads/3aa8ca52320ae936c117939b04f61394.png";

    const background = new Image();
    background.src ="https://i.redd.it/zgs0hf14lh301.jpg"; //https://www.google.am/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjh5oStl6TeAhXPKiwKHbRRCkgQjRx6BAgBEAU&url=https%3A%2F%2Fhipwallpaper.com%2Fspace-backgrounds%2F&psig=AOvVaw2UDDUnvQhEVnpOvgOIoX1K&ust=1540643579993324

    const ironMan = new Image();
    ironMan.src ="https://vignette.wikia.nocookie.net/disney/images/9/96/Iron-Man-AOU-Render.png/revision/latest?cb=20150208173247";


    const hero =
        {
            x:10,
            y:300,
            width:143.52,
            height:240,
            xDelta:0,
            yDelta:0,
            speed:10,
            image:ironMan,
            draw:function(){
                context.drawImage(ironMan,this.x,this.y,this.width,this.height);
            },
            update:function(){
                this.x += this.xDelta * this.speed;
                this.y += this.yDelta * this.speed;
            }
        };


    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;

    document.addEventListener('keydown', function(event) {
        event.preventDefault();
    const keyCode = event.keyCode;
    if(keyCode === rightKey)
        hero.xDelta = 1;
    else if(keyCode === leftKey)
        hero.xDelta = -1;
    else if(keyCode === upKey)
        hero.yDelta = -1;
    else if(keyCode === downKey)
        hero.yDelta = 1;
    });
    document.addEventListener('keyup', function(event) {
        event.preventDefault();
    const keyCode = event.keyCode;
    if(keyCode === rightKey || keyCode === leftKey) {
        hero.xDelta = 0;
    } else if(keyCode === upKey || keyCode === downKey) {
        hero.yDelta = 0;
    }
    });

    const createVillains = function(count, canvasWidth, canvasHeight) {

        let arr = [];
        const w=100;
        const h=115;
        for(let i=0; i<count; i++){

            let obj ={

                x: rand(canvas.width-w),
                y: rand(canvas.height-h),
                width: w,
                height: h,
                xDelta: (Math.random()-0.5)*20, // whatever you want
                yDelta: (Math.random()-0.5)*20, // whatever you want
                image: thanos,

                draw: function(){
                    context.drawImage(this.image,this.x,this.y,this.width,this.height);
                },
                update: function(){
                    if(hero.x < this.x + this.width  && hero.x + hero.width  > this.x+50 &&
                        hero.y < this.y + this.height && hero.y + hero.height > this.y+50) {
                        gameStatus = false;
                    }

                    this.x+=this.xDelta;
                    this.y+=this.yDelta;
                    if(this.x+this.width>= canvas.width ){
                        this.xDelta=(Math.random()*15)*-1;

                    }
                    if(this.y+this.height>=canvas.height){
                        this.yDelta=(Math.random()*15)*-1;
                    }
                    if(this.x<=0){
                        this.xDelta=(Math.random()*15);
                    }
                    if(this.y<=0){
                        this.yDelta=(Math.random()*15);
                    }


                }
            };
            arr[i]=obj;
        }
        return arr;
    };

    let array  = createVillains(1,canvas.width, canvas.height);

 
    const draw=function(){

        context.drawImage(background,0,0,canvas.width,canvas.height);
        context.drawImage(logo,(canvas.width/2)-110.5,10,221,170)
        //rendering
        hero.draw();
		
        for(let i=0; i<array.length; i++){
            array[i].draw();
        }
    };

    const update = function(){
	
        hero.update();
		
        for(let i=0; i<array.length; i++){
            array[i].update();
            if (this.x>=canvas.width){
                this.xDelta=this.xDelta*-1;
            }
            if(this.y>=canvas.heigth){
                this.yDelta=this.yDelta*-1;
            }
        }
    };



    const loop = function(){
        if(gameStatus) {
            requestAnimationFrame(loop);
            context.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            update();
        } else {
            alert("game over");
        }
    };

    loop();


