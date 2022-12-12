function LoseScreen(){
  
  background(0);
  
 
  image(lotusLose_img,500,500);
 
  
  push()
  fill("#FF9800");
  stroke("#9C27B0");
  strokeWeight(2);
  textSize(100);
  textFont(fontStart);
  text('You Died',350,height/2);
  pop()
}