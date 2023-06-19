#pragma strict

var BoxStartPos : Transform [];

var Pos : Vector3[];

var fallingObj : Block[];
private var BlockSpeed : float = 1.0;
private var BlockDestroy : float = 0.5;
var freezeBlocks : boolean = false;

var spawn : boolean;
var spawnRate : float = 0.5;
var nextSpawn : float = 0;

var spawnOn : boolean = false;

private var countRange : int;

private var sTime : float; 
private var lTime : float;
 
function Start()
{
	GetColumnPos();
}

function Update () 
{
	if (spawnOn)
	{
		SpawnBox();
		
		GameTime();
	}
}

function GetColumnPos()
{
	var count : int = 0;
	
	for(var t : Transform  in BoxStartPos)
	{
		Pos[count] = BoxStartPos[count].transform.position;
		count++;
		countRange = count;
	}
}

function SpawnBox()
{
	var Start : boolean = true;
	 
	 if ( Start && Time.time > nextSpawn )
	 {
	 	nextSpawn = Time.time + spawnRate;
	 	var PosRandom : Vector3 = Pos[Random.Range( 0, countRange)];
	 	
	 	var clone : Block;
	    clone = Instantiate( fallingObj[Random.Range( 0, fallingObj.Length)], PosRandom, Quaternion.identity); 
	    
	    //Setting Properties
	    /*
	    if(freezeBlocks)
	    {
	    	BlockSpeed = 1;
	    }
	    */
	    
	   	clone.setBlockSpeed(BlockSpeed);
	    clone.setDestroySec(BlockDestroy);

/*	    
		if(sTime > 10)
		{ 
			lTime = Time.time;
			setSpawnRate(Random.Range( 0.8, 2));
			BlockSpeed = BlockSpeed + 5;
			BlockDestroy = BlockDestroy + 0.5;			
		}
		
		if(BlockDestroy > 2)
			BlockDestroy = Random.Range(0.5,1.0);
			
		if(BlockSpeed > 50)
			BlockSpeed = Random.Range(5, 10);
*/
			
	 }
}


function setSpawn(spawn : boolean)
{
	spawnOn = spawn;
}

function  setSpawnRate(rate : float)
{
	 spawnRate = rate;
}

function setBlockSpeed(speed : float)
{
	BlockSpeed = speed;
}

function destroyBlocks(sec : float)
{
	BlockDestroy = sec;
}



function DelBlocks()
{
 	var blockDel = GameObject.FindGameObjectsWithTag("blocks");
 
	 for (var box : GameObject in blockDel)
	 {	
  		Destroy(box);
 	 }  
 	 
}

function GameTime()
{
	sTime = Time.time - lTime;
}
