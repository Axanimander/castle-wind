

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
ctx.font = "14px Courier";
ctx.textBaseline = "hanging";
canvas.addEventListener( "keydown", keyboardCallback, true);
canvas.addEventListener("click", mouseCallBack, true);
boundingRect = canvas.getBoundingClientRect();
var FPS = 30;
var redr = true;
var playerimg = new Image();
playerimg.src = 'player3.png';
var stoneimg = new Image();
stoneimg.src = 'stone2.png'
var grassimg = new Image();
grassimg.src = 'Grass.png';
var testimg = new Image;
testimg.src = 'testimg.png'
var tilesize = 30;
var spriteSheet = new Image()
spriteSheet.src = 'cotwsprites02.gif'
mapsize = 20
gameready = 0
nodekeygen = 0; //trashy hash table keygen for astarnodes
tilearray =    [1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 
				2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
		
		
function Engine()
{
	this.GS = new GameState();

	setInterval(function() 
	{
  		update();
  		draw();
	}, 
	1000/FPS);

}

var update = function()
{
	if(Engi.GS.turntick)
	{
		for(var x = 0; x < Engi.GS.npclist.length; x++)
		{
			z = Engi.GS.npclist[x]
			if (z.curmap == Engi.GS.curmap)
			{
				z.AI();
				//z.steppath();
			}
			if(z.curhealth <= 0)
			{
				Engi.GS.npclist.splice(x, 1)
			}
		}
			Engi.GS.turntick = false;
	}	
}

var draw = function()
{	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	P1 = Engi.GS.P1;
	for(var x = 0; x < mapsize; ++x)
	{
		for(var y = 0; y < mapsize; ++y)
			{
				tile = Engi.GS.map.returntile(x, y);
				
				ctx.drawImage(tile.graphic, tile.ypos, tile.xpos);

				if(tile.hasitem == 1)
				{
					tileitem = tile.contains[0];
					ctx.drawImage(tileitem.itemgraphic, tile.ypos, tile.xpos);
				}

			}
	}

	for(var x = 0; x < Engi.GS.npclist.length; x++)
	{

		npc = Engi.GS.npclist[x]
		if(npc.curmap == Engi.GS.curmap){
		ctx.drawImage(npc.graphic, npc.xpos, npc.ypos)
	}

	}
	for(x = 0; x < Engi.GS.testlist.length; x++)
	{
		test = Engi.GS.testlist[x]
		ctx.drawImage(test.graphic, test.xpos, test.ypos)
	}
	ctx.drawImage(P1.graphic, P1.xpos, P1.ypos)
	drawUI(Engi.GS)
	for(x = 0; x < 0; x++){
		for(y = 0; y < 10; y++){
		Engi.GS.tileArray.drawTileFromSheet(x, x * 30, y * 35)
	}
	}
	

}

function keyboardCallback(e)
{
	switch(e.keyCode)
	{
	case 87:
		
	case 83:
		
	case 65:
		
	case 68:
		moveplayer(e.keyCode, Engi.GS);
		break;
	case 71:
		Engi.GS.P1.grabitem(Engi.GS)
		break;
	case 72:
		Engi.GS.P1.dropitem(Engi.GS)
		break;
		
	}
	Engi.GS.turntick = true;
	//console.log("TURNS TICKED")

}

function getMouseCoords(e){
	x = e.clientX - canvas.offsetLeft;
	y = e.clientY - canvas.offsetTop;
	return {x:x, y:y}
}
function mouseCallBack(e){
	mousePos = getMouseCoords(e)
	for (i = 0; i < Engi.GS.uiElemList.length; i++){
		console.log(mousePos.x)
		console.log(mousePos.y)
		wasClicked = Engi.GS.uiElemList[i].isClicked(mousePos.x, mousePos.y);
		if(wasClicked){
			Engi.GS.uiElemList[i].callback();
		}

		
	}
}
function HandleTileEvent()
{
	if (Engi.GS.map.returntile(Engi.GS.P1.tilex, Engi.GS.P1.tiley).tileevent > 0)
	{
		e = Engi.GS.map.returntile(Engi.GS.P1.tilex, Engi.GS.P1.tiley).tileevent
		switch(e)
		{
			case 1:
				Engi.GS.switchmap(1)
			case 2:
				Engi.GS.switchmap(2)
			//	console.log("this one")

		}
	}
}

function Tile(xpos, ypos, tileID)
{
	this.xpos = xpos * tilesize;
	this.ypos = ypos * tilesize;
	this.tilex = xpos;
	this.tiley = ypos;
	this.tileID = tileID;
	this.contains = [];
	this.hasnpc = 0;
	this.events = null;
	this.graphic = this.getgraphic(tileID);
	this.passable = this.getpassable(tileID);
	this.hasitem = 0;
	this.tileevent = 0;
}

Tile.prototype.additem = function(item)
{
	this.contains.push(item);
	this.hasitem = 1;
}
Tile.prototype.activate = function(GS)
{
	switch(this.tileevent)
	{
		case 0:
			break;
		case 1:

	}
}
Tile.prototype.getitem = function(itemindex)
{
	if(this.hasitem == 1)
	{
		item = this.contains[itemindex]
		this.contains.splice(itemindex, 1)

		if(this.contains.length == 0)
		{
			this.hasitem = 0
		}
		return item;
	}
	return 0
}

Tile.prototype.getgraphic = function(tileID)
{
	img = new Image();
	switch(tileID)
	{
		case 1:
			img.src = 'Grass.png';
			break;
		
		case 2:
			img.src = 'stone2.png';
			break;
	
		case 3:
			img.src = 'circle.bmp';
			break;
		case 4:
			img.src = 'circle.bmp';
			break;
			
	}
	return img;
}

Tile.prototype.getpassable = function(tileID)
{
	switch(tileID)
	{
		case 1:
			return 0; //Passable
		case 2:
			return 1; //Not passable
		case 3:
			return 0;
		default:
			return 1;
	}
}

function Item(itemID)
{
	this.itemID = itemID;
	this.itemgraphic = this.getitemgraphic(itemID);
}

Item.prototype.getitemgraphic = function(itemID)
{
	img = new Image();
	switch(itemID)
	{
		case 2:
			img.src = 'sword.png';
			break;
		case 3:
			img.src = 'helm.png'
			break;
	}
	return img;
}

function Map(mapnum, mapx, mapy)
{
	this.mapnum = mapnum;
	this.mapx = mapx;
	this.mapy = mapy;
	this.tilemap = [];
}

Map.prototype.returntile = function(xpos, ypos)
{
	return this.tilemap[(mapsize * ypos) + xpos];
}

Map.prototype.addtile = function(tileID, tilex, tiley)
{
	this.tilemap.push(new Tile(tilex, tiley, tileID));

}

Map.prototype.replacetile = function(tilex, tiley, newtile)
{
	this.tilemap[mapsize * tiley + tilex] = newtile;
}

Map.prototype.addtileevent = function(xpos, ypos, tileevent)
{
	this.tilemap[mapsize * ypos + xpos].tileevent = tileevent

}

Map.prototype.addtilemap = function()
{
	switch(this.mapnum)
	{
		case 0: //This is just a test map
			for (var x = 0; x < mapsize; x++) 
			{
				for(var y = 0; y < mapsize; y++)
				{
					//this.addtile(1, x, y);
					this.addtile(maptilearray(tilearray, x, y), x, y)

				}
			}
			
		break;
		case 1:
			for (var x = 0; x < mapsize; x++) 
			{
				for(var y = 0; y < mapsize; y++)
				{
					this.addtile(maptilearray(tilearray, x, y), x, y)
				}
			}
		break;
	}

}

function maptilearray(tilear, x, y)
{
	return tilear[mapsize * x + y];
}

function NPC(name, health, mana, str, mind, dex, graphic, tilex, tiley, curmap, npcid, alliance){
	this.npcname = name;
	this.health = health;
	this.curhealth = health;
	this.mana = mana;
	this.str = str;
	this.mind = mind;
	this.dex = dex;
	this.attackdmg = 5;
	this.graphic = this.getNPCgraphic(this.npcid)
	this.tilex = tilex;
	this.tiley = tiley;
	this.curmap = curmap;
	this.npcid = 1
	this.alliance = alliance;
	this.path = []
	this.nextmove = 0;
	this.xpos = this.tilex * tilesize;
	this.ypos = this.tiley * tilesize;
}

NPC.prototype.getNPCgraphic = function()
{
	npcgraph = new Image();
	switch(this.npcid)
	{
		case 1:
			npcgraph.src = 'npc.png'
			break;
	}
	npcgraph.src='npc.png'
	return npcgraph;
}

NPC.prototype.AI = function() //NOTE: This AI is solely for aggressive npcs which will do nothing but move toward the player
{ 
	
		if(this.path.length <= 0 && !this.adjacent(Engi.GS.P1)) //When the path is empty and the npc is not adjacent to the player, the npc will move towards the player 
		{ 
			this.moveto(Engi.GS.P1.tilex, Engi.GS.P1.tiley)
		}
		if(this.adjacent(Engi.GS.P1))
		{
			console.log("adjacent")
			this.path = [];
			this.attack(Engi.GS.P1)
		}
		if(this.path.length > 0 && !this.adjacent(Engi.GS.P1) )
		{
			this.steppath();
		}
}
NPC.prototype.adjacent = function(thing)
{
	if(this.distfrom(thing.tilex, thing.tiley) <= 1)
	{
		return 1
	}
	return 0
}

NPC.prototype.steppath = function()
{
	if(this.path.length > 0)
	{
		this.movenode(this.path.pop())
	}
}

NPC.prototype.moveto = function(x, y)
{
	
	this.followstar(x, y)
}

NPC.prototype.movenode = function(node)
{
	this.xpos = node.x * tilesize;
	this.ypos = node.y * tilesize;
	this.tilex = node.x
	this.tiley = node.y
} 

NPC.prototype.getcollide = function(tilex, tiley)
{
	playerpos = Engi.GS.P1.gettile();
	if(playerpos.tilex == tilex && playerpos.tiley == tiley)
	{
		console.log("collision");
		return 1;
	}
	return 0;
}
NPC.prototype.gettile = function()
{
	
	return Engi.GS.map.returntile(this.tilex, this.tiley)
}
NPC.prototype.distfrom = function(x, y)
{
	return Dist(this.tilex, this.tiley, x, y)
}

NPC.prototype.followstar = function(x, y)
{
	startnode = new astarnode(this.tilex, this.tiley, 0)
	goalnode = new astarnode(x, y, 0)
	this.path = astar2(startnode, goalnode)
}

NPC.prototype.followstarpath = function()
{
	if(this.path.length > 0)
	{
		this.movetotile(this.path[this.path.length-1]);
	}
}

NPC.prototype.movetotile = function(tile)
{

	this.xpos = tile.x * tilesize;
	
	this.ypos = tile.y * tilesize;
	
}

NPC.prototype.movetest = function(dir)
{
	testx = this.tilex;
	testy = this.tiley;
	switch(dir)
	{
		case 1:
			testy -= 1;
			break;
		case 2:
			testy += 1;
			break;
		case 3:
			testx += 1;
			break;
		case 4:
			testx -= 1;
			break;
	}
	if(typeof(Engi.GS.map.returntile(testx, testy)) == "undefined" || Engi.GS.map.returntile(testx, testy).passable == 1)
	{
		return 0
	}
	return 1
}

NPC.prototype.gotothing = function(x, y) 
{
	this.followstar(x, y)
	this.followstarpath()
}

NPC.prototype.attack = function(thing)
{
	thing.curhealth -= this.attackdmg;
	//this.curhealth -= thing.attackdmg;
}

function Player(name, health, mana, str, mind, dex, tilex, tiley, curmap)
{
	this.playname = name;
	this.attackdmg = 5; //THIS WILL BE A ROBUST AND COMPLEX DAMAGE CALCULATION
	this.curhealth = health;
	this.health = health;
	this.mana = mana;
	this.curmana = mana;
	this.str = str;
	this.mind = mind;
	this.dex = dex;
	this.curmap = curmap;
	this.tilex = this.xpos / tilesize; //THESE ARE THE TILE THAT IT IS ON IF WE ASSUME THAT EACH TILE IS A POINT ON A CARTESIAN GRID
	this.tiley = this.ypos / tilesize;
	this.xpos = 0; //THIS IS THE ABSOLUTE X VALUE ON THE SCREEN
	this.ypos = 0;
	this.graphic = playerimg;
	this.speed = tilesize; //THE IDEA THAT THIS IMPLIES IS TERRIFYING, NEVER CHANGE IT
	this.alliance = 0;
	this.inventory = []
}

Player.prototype.move = function(dx, dy)
{

	this.xpos = this.xpos + (dx * this.speed);
	this.ypos = this.ypos + (dy * this.speed);
	this.tilex = this.xpos / tilesize;
	this.tiley = this.ypos / tilesize;
	if(typeof(this.gettile()) == "undefined" || this.gettile().passable == 1)
	{
		this.move(-dx, -dy);
	}
	collision = this.handleNPCCollide()
	if(collision)
	{
		this.move(-dx, -dy)
	}
	HandleTileEvent(Engi.GS)

}

Player.prototype.handleNPCCollide = function()
{
	
	for(n = 0; n < Engi.GS.npclist.length; n++)
	{
		npc = Engi.GS.npclist[n];
		
		if(npc.gettile() == this.gettile())
		{
			Engi.GS.NPCCollide(this, npc);	
			return 1;
		}
	}
	return 0;
}

Player.prototype.grabitem = function(GS)
{
	if(this.gettile(GS).hasitem);
	{
		item = this.gettile(GS).getitem(0);
		if(item.itemID !== undefined )
		{
			this.inventory.push(item);
		}
	}
}
Player.prototype.gettile = function()
{
	
	return Engi.GS.map.returntile(this.tilex, this.tiley);
}

Player.prototype.dropitem = function()
{
	this.gettile().additem(this.inventory.pop());
}

function GameState()
{
	this.P1 = new Player('bob', 10, 10, 5, 5, 5, 0, 0, 0);
	this.npclist = [];
	this.mapbuffer = [];
	this.testlist = [];
	this.uiElemList = [];
	this.tileArray = new tileArray();
	this.newmap(0, 0, 0);
	this.map = this.mapbuffer[0];
	this.curmap = 0;
	this.map.addtilemap();
	this.turntick = false;
}

GameState.prototype.newmap = function(mapnum, mapx, mapy)
{
	map = new Map(mapnum, mapx, mapy)
	this.mapbuffer.push(map)
}

GameState.prototype.switchmap = function(mapnum)
{
	for (var m = 0; m < this.mapbuffer.length; m++)
	{
		if (this.mapbuffer[m].mapnum == mapnum)
		{
			this.curmap = m
			this.map = this.mapbuffer[m]
			this.map.addtilemap();
		
		}
	}

}

GameState.prototype.addnpc = function(npc)
{
	this.npclist.push(npc);
}

GameState.prototype.NPCCollide = function(npc1, npc2)
{
	//npc1.curhealth -= npc2.attackdmg;
	npc2.curhealth -= npc1.attackdmg;
}

GameState.prototype.addButton = function(button){
	this.uiElemList.push(button)
}

function moveplayer(kc, GS)  
{
	dy = 0;
	dx = 0;

	switch (kc)
	{
		case 87: //W
			dy = -1;
		break; 

		case 83: //S
			dy = 1;
		break; 

		case 65: //A
			dx = -1;
		break;

		case 68: //D
		
			dx = 1;
		break; 
		case 49:
			dx = 0;
			dy = 0;
		default:

		break;	
	};
	GS.P1.move(dx, dy, GS);
};

function drawUI(GS)
{
	drawInventory(GS)
    drawStats(GS)

    for (var i = Engi.GS.uiElemList.length - 1; i >= 0; i--) {
    	Engi.GS.uiElemList[i].draw()
    }
  }

function drawInventory(GS)
{
	for(var x = 0; x < 10; x++)
	{
		for (var y = 0; y < 10; y++)
		{
			ctx.strokeRect(620+ 30 * x, 0 + 30 * y, 30, 30)
		}
	}
	for(var x = 0; x < 100; x++)
	{
		if(GS.P1.inventory[x])
		{
			invx = 620 + (30 * x % 100)
			invy = 0 + (30 * y % 100)
			ctx.drawImage(GS.P1.inventory[x].itemgraphic, invx, invy)
		}
	}

}

function drawStats(GS){
	ctx.fillText("str: ", 600 + 20, 230 + 30 * 5)
	ctx.fillText(GS.P1.str, 600 + 60, 230 + 30 * 5)
	ctx.fillText("Int:", 600 + 20, 230 + 30 * 6)
	ctx.fillText(GS.P1.mind, 600 + 60, 230 + 30 * 6)
	ctx.fillText("Dex: ", 600 + 20, 230 + 30 * 7)
	ctx.fillText(GS.P1.dex, 600 + 60, 230 + 30 * 7)
	ctx.fillStyle = "red"
	ctx.strokeRect(600 + 20, 220 + 30 * 3, 300, 30)
	ctx.fillRect(600 + 20, 220 + 30 * 3, GS.P1.curhealth/GS.P1.health * 300, 30)
	ctx.fillStyle = "black"
	ctx.fillText("HP: ", 600 + 150, 227 + 30 * 3)
	ctx.fillText(GS.P1.curhealth, 600 + 180, 227 + 30 * 3)
	ctx.strokeRect(600 + 20, 220 + 30 * 4, 300, 30)
	ctx.fillStyle = "yellow"
	ctx.fillRect(600 + 20, 220 + 30 * 4, GS.P1.curmana/GS.P1.mana * 300, 30)
	ctx.fillStyle = "black"
	ctx.fillText("MP: ", 600 + 150, 227 + 30 * 4)
	ctx.fillText(GS.P1.curmana, 600 + 180, 227 + 30 * 4)
		//This is all horrible, scaled UI is needed.
}

function Dist(x1, y1, x2, y2)
{
	return Math.floor(Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1)))
}

function astarnode(xpos, ypos, parent) 
{
	this.parent = parent;
	this.x = xpos;
	this.y = ypos;
	this.f = 0; //Total cost
	this.g = 0; //Steps taken to get here
	this.h = 0; //Heuristic cost
	this.closed = false;
	this.key = nodekeygen;
	this.parent = 0;
	this.wall = 0;
	nodekeygen = nodekeygen + 1;
}

function astar2(start, goal)
{
	network = Collidemap(Engi.GS.map)
	closedSet = [] //Already evaluated
	openSet = [start] //Currently discovered nodes that are evaluated
	openSet[0].g = 0;
	openSet[0].f = heuristic(start, goal);

	while(openSet.length > 0)
	{
		findex = findlowestfindex(openSet)
		current = openSet[findex]

		if(posequal(current, goal))
		{
			return reconstructpath(current, start);
		}
		openSet.splice(findex, 1);
		current.closed == true;
		closedSet.push(current);
		neighbor = neighbors(network, current)
		for(neighborz = 0; neighborz < neighbor.length; neighborz++)
		{
			if(neighbor[neighborz].wall == 1 || typeof(neighbor[neighborz]) == 'undefined')
			{
				continue;
			}
			if(isinset(closedSet, neighbor[neighborz]) || neighbor[neighborz].closed == true)
			{
				continue;
			}
			tgscore = current.g + heuristic(current, neighbor[neighborz])
			if(!isinset(openSet, neighbor[neighborz]) )
			{
				
				neighbor[neighborz].closed = true;
				openSet.push(neighbor[neighborz])
			}
			else if(tgscore >= neighbor[neighborz].g )
			{
				continue;
			}
			neighbor[neighborz].g = tgscore;
			neighbor[neighborz].f = neighbor[neighborz].g +  heuristic(neighbor[neighborz], goal)
		}
	}
	return 0;
}

function Collidemap(map) //Construct a simple passable/non-passable collision map in a 2d array
{
	colmap = tdarray(mapsize, mapsize)

	for(var x = 0; x < mapsize; x++)
	{
		for(var y = 0; y < mapsize; y++)
		{	
			colmap[x][y] = new astarnode(x, y, 0)
			if(Engi.GS.map.returntile(x, y).passable == 1)
			{
				colmap[x][y].wall = 1;
			}
				
		}
	}
	return colmap;
}

function heuristic(current, goal)
{
	dx = Math.abs(current.x - goal.x)
	dy = Math.abs(current.y - goal.y)
	return (dx + dy)
}

function findlowestfindex(set)
{
	findex = 0;
	lowest = Infinity;

	for(i = 0; i < set.length; i++)
	{
		if(set[i].f < lowest)
		{
			findex = i
			lowest = set[i].f
		}
	}
	return findex;
}

function neighbors(colmap, current)
{
	neighbor = []

	if(current.x > 0)
	{

		if(colmap[current.x - 1][current.y].closed == false)
		{
			neighbor.push(colmap[current.x - 1][current.y])
		}
		
		if(colmap[current.x - 1][current.y + 1].closed == false)
		{
			neighbor.push(colmap[current.x - 1][current.y + 1])
		}

	}

	if(current.y > 0)
	{
		if(colmap[current.x + 1][current.y - 1].closed == false)
		{
			neighbor.push(colmap[current.x + 1][current.y - 1])
		}
		if(colmap[current.x][current.y - 1].closed == false)
		{
			neighbor.push(colmap[current.x][current.y - 1])
		}
	}

	if(current.y > 0 && current.x > 0)
	{
		if(colmap[current.x - 1][current.y - 1].closed == false)
		{
			neighbor.push(colmap[current.x - 1][current.y - 1])
		}
	}

	if(colmap[current.x][current.y + 1].closed == false)
	{
		neighbor.push(colmap[current.x][current.y + 1])
	}

	if(colmap[current.x + 1][current.y + 1].closed == false)
	{
		neighbor.push(colmap[current.x + 1][current.y + 1])
	}

	if(colmap[current.x + 1][current.y].closed == false)
	{	
		neighbor.push(colmap[current.x + 1][current.y])
	}

	for(i = 0; i < neighbor.length; i++)
	{
		neighbor[i].parent = current;
	}
	
	return neighbor
}

function checkundef(object)
{
	if(typeof(object) == 'undefined')
	{
		return 1
	}
	return 0
}

function checkposequal(goal, neighbor)
{
	for(i = 0; i < neighbor.length; i++)
	{
		if(posequal(goal, neighbor[i]))
		{
			return 1;
		}
	}
	return 0;
}

function reconstructpath(current, start)
{
	totalpath = []
	c = 0;

	while(current.parent !== 0)
	{
		totalpath.push(current)
		current = current.parent
	}

	totalpath.push(start)
	return totalpath;
}

function isinset(set, thing)
{
	for(i = 0; i < set.length; i++)
	{
		if(posequal(set[i], thing))
		{
			return 1
		}
		else
		{
			return 0
		}
	}
	return 0;
}

function tdarray(d1, d2) //Construct a 2d array
{
	arra = new Array(d1)

	for(var x = 0; x < d1; x++)
		{
			arra[x] = new Array(d2);
		}
	return arra;
}

function posequal(node1, node2)
{
	if(node1.x == node2.x)
	{
		if(node1.y == node2.y)
		{
			return 1
		}
	}
	return 0
}

function Button(sizex, sizey, locationx, locationy, text, callback){
	this.sizex = sizex; //Extension to the right
	this.sizey = sizey; //From top to bottom
	this.locationx = locationx; //From top right corner
	this.locationy = locationy;
	this.text = text;
	this.callback = callback;
}

Button.prototype.isClicked = function(clickx, clicky){
	if((clickx > this.locationx) && (clickx < this.locationx + this.sizex)){
		if((clicky > this.locationy) && (clicky < this.locationy + this.sizey)){
			console.log("button clicked")
			return true;
			
		}
	}
}
Button.prototype.draw = function(){
	ctx.fillRect(this.locationx, this.locationy, this.sizex, this.sizey)
	ctx.fillStyle = "red"
	ctx.fillText(this.text, this.locationx, this.locationy, this.sizex)

}


function callbackAnnoyingAlert(){
	window.alert("YALL CLICKED IT")
}
function tileArray(){
	this.tileArr = []
	this.tileSize = tilesize;

}
tileArray.prototype.drawTileFromSheet = function(tileID, x, y){
	ttd = this.tileArr[tileID]
	ctx.drawImage(spriteSheet, ttd.sx, ttd.sy, 30, 30, x, y, 30, 30)
}

tileArray.prototype.addSpriteLoc = function(sx, sy){
	newSpriteLoc = new spriteLoc(sx, sy, 30, 30, 0, 0, 30, 30)
	this.tileArr.push(newSpriteLoc)
}

tileArray.prototype.populateSpriteLocArray = function(){
	for(i = 0; i < 10; i++){
		for(j = 0; j < 10; j++){

			this.addSpriteLoc(i * tilesize - 1, j * tilesize + 14 )

		}
	}
}
function spriteLoc(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
	this.sx = sx;
	this.sy = sy;
	this.sWidth = sWidth;
	this.sHeight = sHeight;
	this.dx = dx;
	this.dy = dy;
	this.dWidth = dWidth;
	this.dHeight = dHeight;
}

Engi = new Engine();
b = new Button(30, 30, 30, 30, "text", callbackAnnoyingAlert)
Engi.GS.addButton(b)

Engi.GS.newmap(1, 0, 0)
Engi.GS.map.addtileevent(0, 0, 1)
Engi.GS.tileArray.populateSpriteLocArray()
it = new Item(2);
it2 = new Item(3);
npc = new NPC("ted", 10, 10, 10, 10, 10, 1, 3, 3, 1, 0, 0);
Engi.GS.addnpc(npc);
Engi.GS.map.tilemap[5].additem(it)
Engi.GS.map.tilemap[4].additem(it);
Engi.GS.map.tilemap[3].additem(it2);
gameready = 1

t = Engi.GS.map.returntile(3, 4)

//Make mapbuffer sole source of player map
//Make it easier to add tile events to specific maps within map buffer
//Make all graphic assets come from a single tilemap
//Pull from single tilemap using arithmetic on the grid
//Load each individual tile coordinate into image variables
//Do not repetitively load images for each new instance of a graphic
//Make map readable from text file?
//Make all data readable from text file

/*

	1.Make combat exist <--NEXT 2.1.2017 <--DONE 2.8.2017
	1b.NPC needs to handle combat ticks, not just the player. when both step into the same tile at the same time they stand on top of eachother and no combat happens. <--DONE 2.12.2017
	2.Make drop system
	3.Make friendly NPC interaction
	4.Make sprite sheets more abstracted
	5.Make actual sprite class to put inside NPC and PC classes
*/
