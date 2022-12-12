function StartScreen(){
  
  background(0);
  
   push();
   image(opening_img,0,0);
   pop();
  
  push()
  fill("#00BCD4");
  stroke("#3F51B5");
  strokeWeight(2);
  textSize(40);
  textFont(fontStart);
  text('Press Space to Start!',350,900);
  pop()
  
}