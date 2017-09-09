var canvas=document.getElementById("canvas")
var ctx=canvas.getContext("2d");
canvas.addEventListener( "keydown", keyboardCallback, true);
var FPS = 30
var redr = true
var playerimg = new Image()
playerimg.src = 'avatar2.png'
var stoneimg = new Image()
stoneimg.src = 'stone2.png'
var grassimg = new Image()
grassimg.src = 'grass.png'
var maparray = []
var events = []
var objarray = []
for (var j = 0; j < 30; j++) {
        var row = [];

        for (var k = 0; k < 20; k++) {
                row.push(0);
        }

        maparray.push(row);
};

var portal = {
	xpos : 0,
	ypos : 0,
	mapnum : 1,
	portalid : 1
};

setInterval(function() {
  update();
  draw();
}, 1000/FPS);

var tile = {
	contains : [],
	passable : true,
	tilegraphic : '.',
	size : 30
	
};
var map = {
	size : 30,
	tiles : maparray
}
var player = {
	health : 10,
	str : 5,
	mind : 5,
	dex : 5,
	xpos : 0,
	ypos : 0,
	speed : tile.size,
	curmap : 1,
	tilex : 0,
	tiley : 0

};
function Player(name, health, str, mind, dex, curmap, tilex, tiley)
{
	this.name = name;
	this.health = health;
	this.str = str;
	this.mind = mind;
	this.dex = dex;
	this.curmap = curmap;
	this.tilex = tilex;
	this.tiley = tiley;
	this.xpos = 0
	this.ypos = 0

}
function Item(xpos, ypos, itemID)
{
	this.xpos = xpos;
	this.ypos = ypos;
	this.itemID = itemID;
}
function Tile(xpos, ypos, tileID)
{
	this.xpos = xpos;
	this.ypos = ypos;
	this.tileID = tileID;
	this.contains = [];
	this.events = null;
}

Tile.prototype.additem = function(item){
	this.contains.push(item);
}


player.tilex = [player.xpos / tile.size]
player.tiley = [player.ypos / tile.size]
// TODO
function keyboardCallback(e)  {
	dy = 0
	dx = 0
	switch (e.keyCode)
	{
		case 87: //W
		dy = -1
		break; 

		case 83: //S
		dy = 1
		break; 

		case 65: //A
		dx = -1
		break;

		case 68: //D
		dx = 1
		
		break; 
		default:
		break;
		
		
	};
	
		player.xpos += dx * player.speed
		player.ypos += dy * player.speed
		player.tilex = [player.xpos / tile.size]
		player.tiley = [player.ypos / tile.size]
	if(player.tilex > 0)
		{
			if(!isWalkable(map.tiles[player.tilex][player.tiley]))
			{

				player.xpos -= dx * player.speed
				player.ypos -= dy * player.speed
				player.tilex = [player.xpos / tile.size]
				player.tiley = [player.ypos / tile.size]
			}
	
		}
	if (player.tilex < 0 || player.tilex > 19)
		{
			player.xpos -= dx * player.speed
			player.ypos -= dy * player.speed
			player.tilex = [player.xpos / tile.size]
			player.tiley = [player.ypos / tile.size]
		}

};
var update = function(){
	for(ev in events)
	{
		switch(ev)
		{
			case 1: // Player standing on portal
			switchmap(xpos, ypos, mapnum)
		}
	}

}
var main = function(){
	var playerimg = new Image()
	playerimg.src = 'avatar.png'
	
}

var draw = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	canvas.globalCompositeOperation = 'destination-over';
	drawmap(1)
	
	canvas.globalCompositeOperation = 'source-over';
	ctx.drawImage(playerimg, player.xpos, player.ypos)

}
function puttile(type, x, y){
	map.tiles[x][y] = type;
	console.log(map.tiles[x][y])

	
}
function drawmap(mapnum){
	switch(mapnum)
	{
		case 1:
			for(i = 0; i < map.size; i++){
				for(j = 0; j < map.size; j++){
					drawtile(i, j, map.tiles[i][j])
				}
			}
			break;
	}
	redr = false
}
function drawtile(x, y, type)
{
	xtile = x * 30
	ytile = y * 30
	switch(type){
		case 0:
			ctx.drawImage(stoneimg, xtile, ytile)
			break;
		case 1:
			ctx.drawImage(grassimg, xtile, ytile)
	}
}

function isWalkable(type)
{

	switch(type){
		case 0:
		return 1
		break;
		case 1:
		return 0
		break;
		case 2:
		return 3
	}
	if (typeof type == 'undefined')
	{
		return 0
	}
}
function switchmap(xpos, ypos, mapnum){
	//Switch maps, each "portal" will be numbered, maps may have multiple exit points
	switch(portalnum){
		case 1:
			player.curmap = 2


	}
}
function putobject(xpos, ypos, mapnum)
{

}
puttile(1, 1, 1)

main()
// Build player movement [**...] map change is next
// Build npc movement [.....]
// Build world drawerer[*....]
// Build keyboard callback DONE
// Build mouse callback
// Build map reader from .txt files
// Build item object
// Build map object
// Build npc object
// Build spell object
// Build inventory object
// Build combat logic
// Build dungeon connected map
// Build shop object
// Build method of using graphics
