function game() {
  

  
  //frameRate(45);
  //Rolling BackGround
  background("#07012AEF");
  imageMode(CENTER);
  image(BackGround_img,500,BackGroundY);
  image(BackGround_img,500,BackGroundY-1920)
  
  // if (BackGroundY > height || BackGroundY<0){
  //   BackGroundY=0
  // }
  // BackGroundY = BackGroundY + BackGroundSpeed
  
  if (BackGroundY > height+1000 ){
  BackGroundY=0
  }
  BackGroundY = BackGroundY + BackGroundSpeed
  


  //BG STARS--------------------------------------------------
//   stars = stars.filter((star) => {
//     star.draw();
//     //star.update(acc);
//     return star.isActive();
//   });

//   //refill new stars
//   while (stars.length < numStars) {
//     stars.push(new Star(random(width), random(height)));
//   }
  //BG STARS--------------------------------------------------

 
  
  
//Lotus Lives
  push()
  fill("#03A9F4");
  stroke("#3F51B5");
  strokeWeight(2);
  textSize(30);
  textFont(fontStart);
  text(lotus_lives,120,58);
  text('Lives:' ,38,58);
  pop()
  
  if (lotus_lives <2 ) {
  push()
  fill("#F44336");
  stroke("#E91E63");
  strokeWeight(2);
  textSize(30);
  textFont(fontStart);
  text(lotus_lives,120,58);
  text('Lives:' ,38,58);
  pop()
  }
  
//Lotus Score
  push()
  fill("#4CAF50");
  stroke("#009688");
  strokeWeight(2);
  textSize(30);
  textFont(fontStart);
  text(score,120,88);
  text('Score:' ,35,88);
  pop()
  
  //Score bar
  fill("#E91E63")
  rect (160,66,150,25);
  fill("#009688")
  rect( 160,66, score*10,25);
  
  //GameTimer 
  //SplashTime = GameTimer;
  
  GameTimer = int (GameTimer/1000); //change to second
    
  push()
  fill("#E91E63");
  stroke("#9C27B0");
  strokeWeight(2);
  textSize(30);
  textFont(fontStart);
  text(GmaeTimeLimit - GameTimer,930,58); //how much time left to win the game.
  text('Time:' ,850,58);
  pop()



  // lotus button control
  if (keyIsPressed && key == "d" ) {
    //move right
   
    lotus_position.x += lotus_speed;
    imageMode(CENTER);
    image(lotusR_img, lotus_position.x, lotus_position.y); //change angle
  } else if(keyIsPressed && key == "a" ){
     //move left
    lotus_position.x -= lotus_speed;
    imageMode(CENTER);
    image(lotusL_img, lotus_position.x, lotus_position.y); //change angle
  }
  else {
    push();
    imageMode(CENTER);
    image(lotus_img, lotus_position.x, lotus_position.y);
    pop();
  }
  
  if (keyIsPressed && key == "w") {
    //move forward
    lotus_position.y -= lotus_speed;
  }
  if (keyIsPressed && key == "s") {
    //move backward
    lotus_position.y += lotus_speed;
  }

  //lotus laser generate
  laser_frequency += deltaTime / 1000;
  if (laser_frequency > 1) {
    //times up shoot laser
    let laser = {
      x: lotus_position.x,
      y: lotus_position.y - lotus_img.height / 2,
    };
    lasers.push(laser);
    laser_frequency = 0; // ready for next laser

    laserShoot.play();
  }
  //lotus laser
  for (let n = 0; n < lasers.length; n++) {
    // loop the laser
    let laser = lasers[n];
    push();
    imageMode(CENTER);
    image(laser_img, laser.x, laser.y);
    pop();
  }

  //lasers flying
  LaserFlyFrequency += deltaTime / 1000;
  if (LaserFlyFrequency > 0.2) {
    for (let n = 0; n < lasers.length; n++) {
      // loop all the laser flying forward
      let laser = lasers[n];
      laser.y -= laser_speed;
    }
  }

  //drawing tupla
  TulpaFlyFrequency += deltaTime / 1000;
  if (TulpaFlyFrequency > 0.01) {
    //speed
    tulpa_position.y += tulpa_speed;
    TulpaFlyFrequency = 0;
  }
  image(
    tulpa_img,
    tulpa_position.x,
    tulpa_position.y,
    width * 0.13,
    height * 0.1
  );
  
  //tupla hit lotus
  if (
      lotus_position.x - lotus_img.width / 2 < tulpa_position.x &&
      tulpa_position.x < lotus_position.x + lotus_img.width / 2 &&
      lotus_position.y - lotus_img.height / 2 < tulpa_position.y &&
      tulpa_position.y < lotus_position.y + lotus_img.height / 2
    ) //(lotus hit box)
  {lotus_lives = lotus_lives - 1; // lotus lose a life 
   lotus_position.x = random(lotus_position.x + 180,lotus_position.x - 180);//Lotus hitted go side 
    imageMode(CENTER);
    image(lotusHurt_img, lotus_position.x, lotus_position.y); //lotus hitted pose 
      }else{
    push();
    imageMode(CENTER);
    image(lotus_img, lotus_position.x, lotus_position.y);//lotus original flying pose
    pop();
      }
        console.log(lotus_lives)



  //rePositoin Tupla
  if (tulpa_position.y > height + 10) {
    tulpa_position.y = 0;
    tulpa_position.x = random(100,800);
  }

  // lotus laser hit tulpa(collision)
  for (let n = 0; n < lasers.length; n++) {
    //  detect the lasers hit the tulpa
    let laser = lasers[n];
    if (
      tulpa_position.x - tulpa_img.width / 2 < laser.x &&
      laser.x < tulpa_position.x + tulpa_img.width / 2 &&
      tulpa_position.y - tulpa_img.height / 2 < laser.y &&
      laser.y < tulpa_position.y + tulpa_img.height / 2
    ) {
      
      image(explode_img,tulpa_position.x,tulpa_position.y,width * 0.13,height * 0.1 );
      tulpa_position.x = random(100,300);//tulpa randomly appear
      tulpa_position.y = -380; //tulpa disappear
      explode.play();// explode sound
      score = score + 1;
      console.log(score)
      


    }
  }
  
  
  //---------------------------------------------------------------------------------------------------------------------------------------------
  //drawing tupla2
  Tulpa2FlyFrequency += deltaTime / 1000;
  if (Tulpa2FlyFrequency > 0.01) {
    //speed
    tulpa2_position.y += tulpa2_speed;
    Tulpa2FlyFrequency = 0;
  }
  image(
    tulpa2_img,
    tulpa2_position.x,
    tulpa2_position.y,
    width * 0.13,
    height * 0.1
  );
  
  //tupla hit lotus
  if (
      lotus_position.x - lotus_img.width / 2 < tulpa2_position.x &&
      tulpa2_position.x < lotus_position.x + lotus_img.width / 2 &&
      lotus_position.y - lotus_img.height / 2 < tulpa2_position.y &&
      tulpa2_position.y < lotus_position.y + lotus_img.height / 2
    ) //(lotus hit box)
  {lotus_lives = lotus_lives - 1; // lotus lose a life 
   lotus_position.x = random(lotus_position.x + 180,lotus_position.x - 180);//Lotus hitted go side 
    imageMode(CENTER);
    image(lotusHurt_img, lotus_position.x, lotus_position.y); //lotus hitted pose 
      }else{
    push();
    imageMode(CENTER);
    image(lotus_img, lotus_position.x, lotus_position.y);//lotus original flying pose
    pop();
      }



  //rePositoin Tupla
  if (tulpa2_position.y > height + 10) {
    tulpa2_position.y = 0;
    tulpa2_position.x = random(100,800);
  }

  // lotus laser hit tulpa(collision)
  for (let n = 0; n < lasers.length; n++) {
    //  detect the lasers hit the tulpa
    let laser = lasers[n];
    if (
      tulpa2_position.x - tulpa2_img.width / 2 < laser.x &&
      laser.x < tulpa2_position.x + tulpa2_img.width / 2 &&
      tulpa2_position.y - tulpa2_img.height / 2 < laser.y &&
      laser.y < tulpa2_position.y + tulpa2_img.height / 2
    ) {
      
      image(explode_img,tulpa2_position.x,tulpa2_position.y,width * 0.13,height * 0.1 );
      tulpa2_position.x = random(300,800);//tulpa randomly appear
      tulpa2_position.y = -380; //tulpa disappear
      explode.play();// explode sound
      score = score + 1;
      console.log(score)
      

    }
  }
  
  
  
//--------------------------------------------------------------------------------------------------------------------------------------      
  
  //---------------------------------------------------------------------------------------------------------------------------------------------
  //drawing tupla3
  Tulpa3FlyFrequency += deltaTime / 1000;
  if (Tulpa3FlyFrequency > 0.01) {
    //speed
    tulpa3_position.y += tulpa3_speed;
    Tulpa3FlyFrequency = 0;
  }
  image(
    tulpa3_img,
    tulpa3_position.x,
    tulpa3_position.y,
    width * 0.13,
    height * 0.1
  );
  
  //tupla hit lotus
  if (
      lotus_position.x - lotus_img.width / 2 < tulpa3_position.x &&
      tulpa3_position.x < lotus_position.x + lotus_img.width / 2 &&
      lotus_position.y - lotus_img.height / 2 < tulpa3_position.y &&
      tulpa3_position.y < lotus_position.y + lotus_img.height / 2
    ) //(lotus hit box)
  {lotus_lives = lotus_lives - 1; // lotus lose a life 
   lotus_position.x = random(lotus_position.x + 180,lotus_position.x - 180);//Lotus hitted go side 
    imageMode(CENTER);
    image(lotusHurt_img, lotus_position.x, lotus_position.y); //lotus hitted pose 
      }else{
    push();
    imageMode(CENTER);
    image(lotus_img, lotus_position.x, lotus_position.y);//lotus original flying pose
    pop();
      }



  //rePositoin Tupla
  if (tulpa3_position.y > height + 10) {
    tulpa3_position.y = 0;
    tulpa3_position.x = random(100,800);
  }

  // lotus laser hit tulpa(collision)
  for (let n = 0; n < lasers.length; n++) {
    //  detect the lasers hit the tulpa
    let laser = lasers[n];
    if (
      tulpa3_position.x - tulpa3_img.width / 2 < laser.x &&
      laser.x < tulpa3_position.x + tulpa3_img.width / 2 &&
      tulpa3_position.y - tulpa3_img.height / 2 < laser.y &&
      laser.y < tulpa3_position.y + tulpa3_img.height / 2
    ) {
      
      image(explode_img,tulpa3_position.x,tulpa3_position.y,width * 0.13,height * 0.1 );
      tulpa3_position.x = random(300,800);//tulpa randomly appear
      tulpa3_position.y = -380; //tulpa disappear
      explode.play();// explode sound
      score = score + 1;
      console.log(score)
      

    }
  }
  
  
  
//--------------------------------------------------------------------------------------------------------------------------------------      
  
  
  //---------------------------------------------------------------------------------------------------------------------------------------------
  //drawing tupla4
  Tulpa4FlyFrequency += deltaTime / 1000;
  if (Tulpa4FlyFrequency > 0.01) {
    //speed
    tulpa4_position.y += tulpa4_speed;
    Tulpa4FlyFrequency = 0;
  }
  image(
    tulpa4_img,
    tulpa4_position.x,
    tulpa4_position.y,
    width * 0.13,
    height * 0.1
  );
  
  //tupla hit lotus
  if (
      lotus_position.x - lotus_img.width / 2 < tulpa4_position.x &&
      tulpa4_position.x < lotus_position.x + lotus_img.width / 2 &&
      lotus_position.y - lotus_img.height / 2 < tulpa4_position.y &&
      tulpa4_position.y < lotus_position.y + lotus_img.height / 2
    ) //(lotus hit box)
  {lotus_lives = lotus_lives - 1; // lotus lose a life 
   lotus_position.x = random(lotus_position.x + 180,lotus_position.x - 180);//Lotus hitted go side 
    imageMode(CENTER);
    image(lotusHurt_img, lotus_position.x, lotus_position.y); //lotus hitted pose 
      }else{
    push();
    imageMode(CENTER);
    image(lotus_img, lotus_position.x, lotus_position.y);//lotus original flying pose
    pop();
      }



  //rePositoin Tupla
  if (tulpa4_position.y > height + 10) {
    tulpa4_position.y = 0;
    tulpa4_position.x = random(100,800);
  }

  // lotus laser hit tulpa(collision)
  for (let n = 0; n < lasers.length; n++) {
    //  detect the lasers hit the tulpa
    let laser = lasers[n];
    if (
      tulpa4_position.x - tulpa4_img.width / 2 < laser.x &&
      laser.x < tulpa4_position.x + tulpa4_img.width / 2 &&
      tulpa4_position.y - tulpa4_img.height / 2 < laser.y &&
      laser.y < tulpa4_position.y + tulpa4_img.height / 2
    ) {
      
      image(explode_img,tulpa4_position.x,tulpa4_position.y,width * 0.13,height * 0.1 );
      tulpa4_position.x = random(300,800);//tulpa randomly appear
      tulpa4_position.y = -380; //tulpa disappear
      explode.play();// explode sound
      score = score + 1;
      console.log(score)
      

    }
  }
  
  
  
//-------------------------------------------------------------------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------------------------------------------------------------------------
  //drawing tupla5
  Tulpa5FlyFrequency += deltaTime / 1000;
  if (Tulpa5FlyFrequency > 0.01) {
    //speed
    tulpa5_position.y += tulpa5_speed;
    Tulpa5FlyFrequency = 0;
  }
  image(
    tulpa5_img,
    tulpa5_position.x,
    tulpa5_position.y,
    width * 0.13,
    height * 0.1
  );
  
  //tupla hit lotus
  if (
      lotus_position.x - lotus_img.width / 2 < tulpa5_position.x &&
      tulpa5_position.x < lotus_position.x + lotus_img.width / 2 &&
      lotus_position.y - lotus_img.height / 2 < tulpa5_position.y &&
      tulpa5_position.y < lotus_position.y + lotus_img.height / 2
    ) //(lotus hit box)
  {lotus_lives = lotus_lives - 1; // lotus lose a life 
   lotus_position.x = random(lotus_position.x + 180,lotus_position.x - 180);//Lotus hitted go side 
    imageMode(CENTER);
    image(lotusHurt_img, lotus_position.x, lotus_position.y); //lotus hitted pose 
      }else{
    push();
    imageMode(CENTER);
    image(lotus_img, lotus_position.x, lotus_position.y);//lotus original flying pose
    pop();
      }



  //rePositoin Tupla
  if (tulpa5_position.y > height + 10) {
    tulpa5_position.y = 0;
    tulpa5_position.x = random(100,800);
  }

  // lotus laser hit tulpa(collision)
  for (let n = 0; n < lasers.length; n++) {
    //  detect the lasers hit the tulpa
    let laser = lasers[n];
    if (
      tulpa5_position.x - tulpa5_img.width / 2 < laser.x &&
      laser.x < tulpa5_position.x + tulpa5_img.width / 2 &&
      tulpa5_position.y - tulpa5_img.height / 2 < laser.y &&
      laser.y < tulpa5_position.y + tulpa5_img.height / 2
    ) {
      
      image(explode_img,tulpa5_position.x,tulpa5_position.y,width * 0.13,height * 0.1 );
      tulpa5_position.x = random(300,800);//tulpa randomly appear
      tulpa5_position.y = -380; //tulpa disappear
      explode.play();// explode sound
      score = score + 1;
      console.log(score)
      

    }
  }
  
  
  
//-------------------------------------------------------------------------------------------------------------------------------------
  
  
  
  //Trigger to WinScreen
  if(score>= 15){
    winBgm.play();
    BGM.stop();
    stage = 2;
  } 
  
  //Trigger to LoseScreen
  if(lotus_lives<= 0)  {
    loseBgm.play();
    BGM.stop();
    stage = 3;
  } 
  
  if ( GmaeTimeLimit - GameTimer <= 0 ){
    loseBgm.play();
    stage = 3;    
  }
  
  // stage = StartScreen();
  // if (mouseIsPressed == true){
  //   StartScreen = fause;
  // }
  
}