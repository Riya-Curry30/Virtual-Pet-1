//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.4;
  /*happyDog = createSprite(250,250,10,10);
  happyDog.addImage(happyDogImage);
  happyDog.scale = 0.4;*/
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }



  drawSprites();

  textSize(24);
  fill("black");
  text("Press Up_Arrow To Feed Drago Milk!",45,50);
  textSize(20);
  text("Food Remaining:" + foodS, 160,100)
  //add styles here

}

function readStock(data)
{
  foodS = data.val();
}


function writeStock(x)
{
  if(x<=0)
  {
    x = 0;
  }
  else
  {
    x = x -1;
  }
  
  database.ref("/").update({
    Food: x
  })
}


