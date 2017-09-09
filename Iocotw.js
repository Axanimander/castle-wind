var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
ctx.font = "18px Times New-Roman";
ctx.textBaseline = "hanging";
canvas.addEventListener( "keydown", keyboardCallback, true);
var FPS = 30;
var redr = true;
tickup = 0;
function Engine()
{
	this.GS = new GameState();
	setInterval(function() {
  update();
  draw();
}, (1000 - tickup)/FPS);
}

	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText("Borps:" + Eng.GS.borps, 30, 30)
		ctx.fillText("Borps:" + Eng.GS.sorps, 30, 60)
		ctx.fillText("Borps:" + Eng.GS.gorps, 30, 90)
		ctx.fillText("Borps:" + Eng.GS.porps, 30, 120)
		ctx.fillText("Borps:" + Eng.GS.rorps, 30, 150)
		ctx.fillText("Borps:" + Eng.GS.jorps, 30, 180)
		ctx.fillText("Borps:" + Eng.GS.dorps, 30, 210)

	}
	function update(){
		Eng.GS.borps += 1;
		if(Eng.GS.borps / 100 > 1)
		{
			Eng.GS.sorps += Math.floor(Eng.GS.borps / 100) / 100;
		}
	}
function GameState()
{
	this.borps = 0;
	this.sorps = 0;
	this.gorps = 0;
	this.porps = 0;
	this.rorps = 0;
	this.jorps = 0;
	this.dorps = 0;
	
	}
function keyboardCallback(e){
	console.log("key pressed")
}

Eng = new Engine();