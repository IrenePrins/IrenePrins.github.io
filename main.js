let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    PIXI.utils.sayHello(type)

    let queenfront, queenleft, queen, inside, key, prison2, numberStars, stairs, stairs2, water, state, speedX, dirt,door, speedY, x ,y, star, score = 0, message, stars, rip, castle, queenright, queenrightinside;
    
    let queenHit = false

    //Shortcuts
    let Application = PIXI.Application,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.sprite

        loader
        .add(["img/spritesheet.json", "img/background.json", "img/rip.jpeg", "img/inside.jpg", "img/stairs.png", "img/arrow.png", "img/backgroundp.png", "img/key.png", "img/manfront.png", "img/prison.png", "img/gamewon.png", "img/start.png"])
        .on("progress", loadProgressHandler)
        .load(setup)

    function loadProgressHandler(loader,resource){
        //display the file 'url currently being loaded
        console.log("loading: " + resource.url)

        console.log("progress: " + loader.progress + "%")
    }

    //create a pixi app met options object erin
    let app = new Application({width: 580, height: 580})
    app.renderer.backgroundColor = 0x061646;
    app.renderer.autoResize = true

    //add to document
    document.body.appendChild(app.view) 
    
    let container = new PIXI.Container()
    app.stage.addChild(container)

    //load it en texture
    
        

    function setup(){

        //create
        id = resources["img/spritesheet.json"].textures;
        id2 = resources["img/background.json"].textures;

        gameStart = new PIXI.Container()
        app.stage.addChild(gameStart)
        gameStart.visible = true;

        startimg = new PIXI.Sprite(PIXI.loader.resources["img/start.png"].texture)
        gameStart.addChild(startimg)

        let title = new PIXI.Text("SAVE UR MAN");
        title.style.fontFamily = "Stencil";
        title.style.align = "center";
        title.style.fontSize = 64;
        title.x = 90;
        title.y = 100;
        gameStart.addChild(title);

        let roundBox = new PIXI.Graphics();
        roundBox.lineStyle(4, 0xff69b4, 1);
        roundBox.beginFill(0xff69b4);
        roundBox.drawRoundedRect(0, 0, 150, 75, 10)
        roundBox.endFill();
        roundBox.x = 210;
        roundBox.y = 420;
        gameStart.addChild(roundBox);

        let start = new PIXI.Text("START");
        start.style.fontFamily = "Stencil";
        start.style.align = "center";
        start.style.fontSize = 44;
        start.x = 220;
        start.y = 435;
        gameStart.addChild(start);

        roundBox.interactive = true;
        roundBox.buttonMode = true;

        roundBox.on('pointerdown', clickHandler)

        
        gameIntro = new PIXI.Container();
        app.stage.addChild(gameIntro)
        gameIntro.visible = false

        //palace
        castle = new PIXI.Sprite(id2["cropped2.jpeg"])
        gameIntro.addChild(castle);

        queenright = new PIXI.Sprite(id2["right.png"]);
        gameIntro.addChild(queenright);

        queenright.x = 10;
        queenright.y = 500;
        queenright.vx = 0;
        queenright.vy = 0;

        //door
        door = new PIXI.Sprite(id2["door3.png"])
        gameIntro.addChild(door);

        //positie door

        door.x = 345
        door.y = 500

        let ellipsehelp = new PIXI.Graphics();
        ellipsehelp.beginFill(0xFFFFFF);
        ellipsehelp.drawEllipse(0, 0, 60, 45);
        ellipsehelp.endFill();
        ellipsehelp.x = 300;
        ellipsehelp.y = 400;
        gameIntro.addChild(ellipsehelp);

        messagehelp = new PIXI.Text("HELP!!!>")
        messagehelp.style.align = "center"
        messagehelp.style.fontFamily = "Stencil"
        messagehelp.x = 250
        messagehelp.y = 390
        gameIntro.addChild(messagehelp)

        gameCastle = new PIXI.Container()
        app.stage.addChild(gameCastle)
        gameCastle.visible = false

        inside = new PIXI.Sprite(PIXI.loader.resources["img/inside.jpg"].texture);
        gameCastle.addChild(inside)
        
        queenrightinside = new PIXI.Sprite(id2["right.png"]);
        gameCastle.addChild(queenrightinside);

        dirt = new PIXI.Sprite(id2["dirtsmall.png"])
        gameCastle.addChild(dirt)

        dirt.x = 520 
        dirt.y = 360

        queenrightinside.x = 10;
        queenrightinside.y = 300;

        queenrightinside.vx = 0;
        queenrightinside.vy = 0;

        let ellipse = new PIXI.Graphics();
        ellipse.beginFill(0xFFFFFF);
        ellipse.drawEllipse(0, 0, 60, 45);
        ellipse.endFill();
        ellipse.x = 500;
        ellipse.y = 130;
        gameCastle.addChild(ellipse);


        let message2 = new PIXI.Text("GRRR..>");
        message2.style.fontFamily = "Stencil";
        message2.style.align = "center";
        message2.x = 450;
        message2.y = 118;
        gameCastle.addChild(message2);

        gameScene2 = new PIXI.Container({width: 580, height: 580})
        app.stage.addChild(gameScene2)
        gameScene2.visible = false

        
        //water
        water = new PIXI.Sprite(id2["water2.png"]);
        gameScene2.addChild(water);

        //stairs
        stairs = new PIXI.Sprite(PIXI.loader.resources["img/stairs.png"].texture)
        gameScene2.addChild(stairs);

        stairs.x = 50;
        stairs.y = 50;

        numberStars = 280;
     

        //queen
        queenfront = new PIXI.Sprite(id["front.png"]);
        gameScene2.addChild(queenfront);     

        //position queen
        queenfront.x = 50;
        queenfront.y = 50;

        queenfront.vx = 0;
        queenfront.vy = 0;
        
 
        let numberOfstars = 10;

        stars = [];
 

        for(let i = 0; i < numberOfstars; i++){
            star = new PIXI.Sprite(id2["pink.png"]);
                   
            star.x = Math.floor(Math.random() * (app.stage.height - star.height))
            star.y = Math.floor(Math.random() * (app.stage.height - star.height));

            stars.push(star)

            gameScene2.addChild(star)
        }
        
        let numberOfmonsters = 5;
        xOffset = 150;
        speed = 2;
        direction = 1;
        spacing = 68;

        monsters = [];

    //Make as many monsters as there are `numberOfs`
        for (let i = 0; i < numberOfmonsters; i++) {

        monster = new PIXI.Sprite(id2["monstersmall.png"]);
        let x = spacing * i + xOffset;

        // let y = Math.random() *  (app.stage.height - monster.height);
        let y = Math.floor(Math.random() * (app.stage.height - monster.height));
        //Set the monster's position
        monster.x = x;
        monster.y = y;

        monster.vy = speed * direction;

        //Reverse the direction for the next monster
        direction *= -1;

        //Push the monster into the `monsters` array
        monsters.push(monster);

        //Add the monster to the `gameScene`
        gameScene2.addChild(monster);
        }  

       
        //healthbar

        //create
        healthBar = new PIXI.DisplayObjectContainer();
        healthBar.position.set(30, 560)
        gameScene2.addChild(healthBar);

        //background black
        let innerBar = new PIXI.Graphics();
        innerBar.beginFill(0x000000)
        innerBar.drawRect(0, 0, 130, 13)
        innerBar.endFill()
        healthBar.addChild(innerBar)

        //red background
        let outerBar = new PIXI.Graphics()
        outerBar.beginFill(0xFF3300)
        outerBar.drawRect(0, 0, 130, 13)
        outerBar.endFill()
        healthBar.addChild(outerBar)

        healthBar.outer = outerBar
        healthBar.outer.width = 130;



        gameScene3 = new PIXI.Container()
        app.stage.addChild(gameScene3)
        gameScene3.visible = false;

        prisonw = new PIXI.Sprite(PIXI.loader.resources["img/backgroundp.png"].texture)
        gameScene3.addChild(prisonw)

        man = new PIXI.Sprite(PIXI.loader.resources["img/manfront.png"].texture)
        gameScene3.addChild(man)
        man.x = 100
        man.y = 480
        
        prison2 = new PIXI.Sprite(PIXI.loader.resources["img/prison.png"].texture)
        gameScene3.addChild(prison2)
        prison2.x = 60
        prison2.y = 450

        queen = new PIXI.Sprite(id2["front.png"])
        gameScene3.addChild(queen)
        queen.x = 30
        queen.y = 480
        queen.vx = 0
        queen.vy = 0

        key = new PIXI.Sprite(PIXI.loader.resources["img/key.png"].texture)
        gameScene3.addChild(key)
        key.x = 500;
        key.y = 510



        gameOverScene = new PIXI.Container()
        app.stage.addChild(gameOverScene)
        gameOverScene.visible = false

        rip = new PIXI.Sprite(PIXI.loader.resources["img/rip.jpeg"].texture);
        gameOverScene.addChild(rip)

        let style = new PIXI.TextStyle({
            fontSize: 64,
            fill: "white"
        })

        message = new PIXI.Text("OHNO:( U DIED! \n rip", style)
        message.style.align = "center"
        message.style.fontFamily = "Stencil"
        message.x = 60
        message.y = 150
        gameOverScene.addChild(message)

        gameWon = new PIXI.Container()
        app.stage.addChild(gameWon)
        gameWon.visible = false

        won = new PIXI.Sprite(PIXI.loader.resources["img/gamewon.png"].texture);
        gameWon.addChild(won)

        message3 = new PIXI.Text("VICTORY", style)
        message3.style.align = "center"
        message3.style.fontFamily = "Stencil"
        message3.style.fill = "black"
        message3.x = 160
        message3.y = 10
        gameWon.addChild(message3)

        //set the game state
        state = intro;

        app.ticker.add(delta => gameLoop(delta));
        

    }

    function gameLoop(delta){
        
        state(delta)

    
      }
      

    function play(delta){

        
        // queenright.vx = 3
        // queenright.vy = 3
        
        // queenright.x += queenright.vx
        // queenright.y += queenright.vy

          
        //Moving queen        
        queenfront.x += queenfront.vx
        queenfront.y += queenfront.vy

        contain(queenfront, {x: 10, y: 28, width: 580, height: 580})

        monsters.forEach(function(monster) {

            //Move the monster
            monster.y += monster.vy;
          
            //Check the monster's screen boundaries
            let monsterHitsWall = contain(monster, {x: 10, y: 10, width: 580, height: 580});
          
            //If the monster hits the top or bottom of the stage, reverse
            //its direction
            if (monsterHitsWall === "top" || monsterHitsWall === "bottom") {
              monster.vy *= -1;
            }
          
            //Test for a . If any of the enemies are touching
            //the queen, set `queenHit` to `true`
            if(hitTestRectangle(queenfront, monster)) {
                queenHit = true;
                healthBar.outer.width -= 1          
              }

            if(healthBar.outer.width < 1){
                healthBar.outer.width = 0;
                state = end;
            }
          });  

          for(star of stars){
            if(hitTestRectangle(queenfront, star)) {
                gameScene2.removeChild(star)
                numberStars--;  
                console.log(numberStars)    
              }
          }

          if(numberStars < 1){
            stairs2 = new PIXI.Sprite(PIXI.loader.resources["img/stairs.png"].texture)
            gameScene2.addChild(stairs2)
            stairs.x = 400;
            stairs.y = 300;
    
            if(hitTestRectangle(queenfront, stairs)){
                gameScene2.visible = false;
                gameScene3.visible = true;
                state = prison
            }
          }

        function contain(queenfront, container) {

            let collision = undefined;
        
            //Left
            if (queenfront.x < container.x) {
                queenfront.x = container.x;
                collision = "left";
            }
        
            //Top
            if (queenfront.y < container.y) {
                queenfront.y = container.y;
                collision = "top";
            }
        
            //Right
            if (queenfront.x + queenfront.width > container.width) {
                queenfront.x = container.width - queenfront.width;
                collision = "right";
            }
        
                //Bottom
            if (queenfront.y + queenfront.height > container.height) {
                queenfront.y = container.height - queenfront.height;
                collision = "bottom";
            }
        
            //Return the `collision` value
            return collision;
        }

        let left = keyboard(37);
        let up = keyboard(38);
        let down = keyboard(40);
        let right = keyboard(39);
        
        //key left
        left.press = () => {
            queenfront.vx = -5;
            queenfront.vy = 0;
        }

        left.release = () => {

            if(!right.isDown && queenfront.vy === 0){
                queenfront.vx = 0;
            }
            
        }

        //key up
        up.press = () => {
            queenfront.vy = -5;
            queenfront.vx = 0;
        }

        up.release = () => {
            if(!down.isDown && queenfront.vx === 0){
                queenfront.vy = 0;
            }
        }

        //key down
        down.press = () => {
            queenfront.vy = 5;
            queenfront.vx = 0;
        }

        down.release = () => {
            if(!up.isDown && queenfront.vx === 0){
                queenfront.vy = 0;
            }
        }

        //key right
        right.press = () => {
            queenfront.vx = 5;
            queenfront.vy = 0;
        }

        right.release = () => {
            if(!left.isDown && queenfront.vy === 0){
                queenfront.vx = 0;
            }
        }


    }
    function end(){
        gameScene2.visible = false;
        gameOverScene.visible = true;
    }

    function intro(){

    }

    function start(){
        gameIntro.visible = true;

        queenright.x += queenright.vx;
        queenright.y += queenright.vy;

        let left = keyboard(37);
        let right = keyboard(39);
        
        //key left
        left.press = () => {

            queenright.vx = -2;
            queenright.vy = 0;

        }

        left.release = () => {
            if(!right.isDown && queenright.vy === 0){
                queenright.vx = 0;
            }
            
        }

        //key right
        right.press = () => {
            queenright.vx = 2;
            queenright.vy = 0;
        }

        right.release = () => {
            if(!left.isDown && queenright.vy === 0){
                queenright.vx = 0;
            }
        }

        if(hitTestRectangle(queenright, door)) {
            state = palace 
            gameIntro.visible = false;
            gameCastle.visible = true;      
          }
    }

    function palace(){

        gameIntro.visible = false;
        gameCastle.visible = true; 
        
        queenrightinside.x += queenrightinside.vx;
        queenrightinside.y += queenrightinside.vy;

        let left = keyboard(37);
        let right = keyboard(39);
        
        //key left
        left.press = () => {

            queenrightinside.vx = -2;
            queenrightinside.vy = 0;

        }

        left.release = () => {
            if(!right.isDown && queenrightinside.vy === 0){
                queenrightinside.vx = 0;
            }
            
        }

        //key right
        right.press = () => {
            console.log("right press")
            queenrightinside.vx = 2;
            queenrightinside.vy = 0;
        }

        right.release = () => {
            if(!left.isDown && queenrightinside.vy === 0){
                queenrightinside.vx = 0;
            }
        }

        if(hitTestRectangle(queenrightinside, dirt)) {
            state = play
            gameCastle.visible = false; 
            gameScene2.visible = true;
                 
          }


    }

    function prison(){

        queen.x += queen.vx;
        queen.y += queen.vy;

        let left = keyboard(37);
        let right = keyboard(39);
        
        //key left
        left.press = () => {

            queen.vx = -2;
            queen.vy = 0;

        }

        left.release = () => {
            if(!right.isDown && queen.vy === 0){
                queen.vx = 0;
            }
            
        }

        //key right
        right.press = () => {
            queen.vx = 2;
            queen.vy = 0;
        }

        right.release = () => {
            if(!left.isDown && queen.vy === 0){
                queen.vx = 0;
            }
        }


        if (hitTestRectangle(queen, key)) {
            key.x = queen.x + 8;
            key.y = queen.y + 8;
          }

       if(hitTestRectangle(prison2, key)){
            gameScene3.visible = false
            gameWon.visible = true
           
       }


    }






















    function hitTestRectangle(r1, r2) {

        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
      
        //hit will determine whether there's a collision
        hit = false;
      
        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;
      
        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;
      
        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
      
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
      
        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
      
          //A collision might be occuring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {
      
            //There's definitely a collision happening
            hit = true;
          } else {
      
            //There's no collision on the y axis
            hit = false;
          }
        } else {
      
          //There's no collision on the x axis
          hit = false;
        }
      
        //`hit` will be either `true` or `false`
        return hit;
      };


    function clickHandler(){
        gameStart.visible = false
        gameIntro.visible = true
        state = start
    }

    function keyboard(keyCode){
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        //The `downHandler`
        key.downHandler = event => {
            if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }



        
       


      

    