var BlockM : BlockManager;
var LevelM : LevelManager;
var lifeM : LifeManager;
var PointsM : PointsSetup;
var PlayerC : PlayerControl;
var pauseB : PauseB;
var Score : SaveScore;
var TimeM : TimeManager;

var ReadyGUI : GUITexture;
var StartGUI : GUITexture;

var GameGUI : GUITexture;
var OverGUI : GUITexture;

var RetryGUI : GUITexture;
var ExitGUI : GUITexture;
var SmallExitGUI : GUITexture;

var SubmitGUI : GUITexture;
var BgSubmitGUI : GUITexture;

var tapStartGUI : GUIText;

var GameStarted : boolean = false;
var gameOver : boolean = false;
var screentouch : boolean = false;

var StartingCam : Camera;

var TextFieldGUI : GUIStyle;
var ButtonGUI : GUIStyle;

var clip : AudioClip;

var StartTime : float;

private var stringToEdit : String = "Name";
private var keyDone : boolean = false;


function Start() 
{	
	// GUI Textures to false
	ReadyGUI.enabled = false;
	StartGUI.enabled = false;
	
	GameGUI.enabled = false;
	OverGUI.enabled = false;
	
	SmallExitGUI.enabled = false;
	RetryGUI.enabled = false;
 	SubmitGUI.enabled = false;
	BgSubmitGUI.enabled = false;
	tapStartGUI.enabled = true;
	
	//Active fuction on start
	GUIOn(true);
	camSwap(1);
	GameStarted = false;
	GUIPos();
	
	gameObject.audio.enabled = GameObject.Find("SoundData").GetComponent(xmlDataSave)._soundSwitch;
	gameObject.audio.volume = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;	
}

function OnGUI () 
{
	if(keyDone && !PointsM.isNegitive)
	{
    	// Make a text field that modifies stringToEdit.
	    var width : float = Screen.width;
	    var height : float = Screen.height;
	    		    
	    //stringToEdit = GUI.TextField ( Rect( (width / 2) - 150, (height / 2) - 50, 300, 50), stringToEdit, 8, TextFieldGUI);
	    stringToEdit = iOSUI.NameField( 1, Rect( (width / 2) - 150, (height / 2) - 50, 300, 50) ,stringToEdit, 8, TextFieldGUI);
	    SubmitGUI.enabled = true;
	    BgSubmitGUI.enabled = true;
	    SubmitButtonPress();
    }
    
    if(keyDone && PointsM.isNegitive)
    {
		// if score is negtive
		GUIOn(false);
		camSwap(2);
		
		StartingCam.animation.Play();
		StartingCam.animation.wrapMode = WrapMode.Loop;
		
		Score.TopFiveDisplay();
		Score.PlayersScoreDisplay();
		Score.TopScoreGUIon(true);
		//Enable Top Score and Retry or exit
		
		RetryGUI.enabled = true;
		SmallExitGUI.enabled = true;
		keyDone = false;
		SubmitGUI.enabled = false;
		BgSubmitGUI.enabled = false;
    }
}

function Update () 
{
	if (!GameStarted)
	{
		if(!screentouch)
		{
			StartGameButtonPress();
		}
	}
	
	if (GameStarted)
	{
		GameOver();
		play();
	}
	
	if(gameOver)
	{
		BackButtonPress();
		RetryButtonPress();
	}		
}


function GUIPos()
{
	var screenW = Screen.width / 2;
	var screenH = Screen.height /2;
	
	//GUI Ready Start Text Position
	ReadyGUI.pixelInset = Rect(screenW - (ReadyGUI.pixelInset.width / 2), screenH - (ReadyGUI.pixelInset.height / 2), ReadyGUI.pixelInset.width, ReadyGUI.pixelInset.height);
	StartGUI.pixelInset = Rect(screenW - (StartGUI.pixelInset.width / 2), screenH - (StartGUI.pixelInset.height / 2), StartGUI.pixelInset.width, StartGUI.pixelInset.height);
	
	//GUI Game Over Text Position
	GameGUI.pixelInset = Rect(screenW - (GameGUI.pixelInset.width / 2), screenH - (GameGUI.pixelInset.height / 2), GameGUI.pixelInset.width, GameGUI.pixelInset.height);
	OverGUI.pixelInset = Rect(screenW - (OverGUI.pixelInset.width / 2), screenH - ((OverGUI.pixelInset.height / 2) + 80), OverGUI.pixelInset.width, OverGUI.pixelInset.height);
	
	// Retry Game Screen
	RetryGUI.pixelInset = Rect((Screen.width * 0.935) - (RetryGUI.pixelInset.width/2), screenH * 0.23 - (RetryGUI.pixelInset.height/2), RetryGUI.pixelInset.width, RetryGUI.pixelInset.height);
	SmallExitGUI.pixelInset = Rect((Screen.width * 0.065) - (SmallExitGUI.pixelInset.width/2) , screenH *0.23 - (SmallExitGUI.pixelInset.height/2), SmallExitGUI.pixelInset.width, SmallExitGUI.pixelInset.height);
	
	SubmitGUI.pixelInset = Rect((Screen.width * 0.6) - (SubmitGUI.pixelInset.width/2) , screenH *0.5 - (SubmitGUI.pixelInset.height/2), SubmitGUI.pixelInset.width, SubmitGUI.pixelInset.height);

	//Background	
	BgSubmitGUI.pixelInset = Rect((Screen.width * 0.5) - (BgSubmitGUI.pixelInset.width/2) , screenH *0.9 - (BgSubmitGUI.pixelInset.height/2), BgSubmitGUI.pixelInset.width, BgSubmitGUI.pixelInset.height);

	tapStartGUI.pixelOffset = new Vector2( screenW , screenH);
}
		
function StartGame()
{
	yield WaitForSeconds(1);
	ReadyGUI.enabled = true;
	yield WaitForSeconds(1);
	ReadyGUI.enabled = false;
	yield WaitForSeconds(1);
	
	StartGUI.enabled = true;
	yield WaitForSeconds(1);
	StartGUI.enabled = false;
	
	//start Game
	TimeM.isTime = true;
	StartTime = Time.time;
	GameStarted = true;
	BlockM.setSpawn(true);
}

function GameOver()
{
	if(gameOver == true)
	{
		// Stop Game
		GameStarted = false;
		TimeM.isTime = false;
		BlockM.setSpawn(false);

		BlockM.DelBlocks();
		
		//Game Over
		GameGUI.enabled = true;
		OverGUI.enabled = true;
		yield WaitForSeconds(2);
		GameGUI.enabled = false;
		OverGUI.enabled = false;
		
		keyDone = true;
	}
}

function GUIOn(Switch : boolean)
{
	PointsM.PointsOn(Switch);
	lifeM.lifeManagerOn(Switch);
	pauseB.PauseButOn(Switch);
	TimeM.timeGUI(Switch);
}

function camSwap(currentCam : int)
{
 	var cameras = GameObject.FindGameObjectsWithTag("cams");
 
	 for (var cams : GameObject in cameras)
	 {
  		cams.GetComponent(Camera).enabled = false;
 	 }  
 
 	var oneToUse : String = "Camera"+currentCam;
 	gameObject.Find(oneToUse).GetComponent(Camera).enabled = true;
}

function GameOver(gO : boolean)
{
	gameOver = gO;
}

function play()
{
	
	if(TimeM.isTime)
	{
		if(PointsM.totalPoints >= 500 && PointsM.totalPoints < 800 && LevelM.level == 1 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(1.3);
				BlockM.setBlockSpeed(1.3);
				BlockM.destroyBlocks(2);
		}
		
		if(PointsM.totalPoints >= 1000 && PointsM.totalPoints < 1500 && LevelM.level == 2 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(1.1);
				BlockM.setBlockSpeed(1.6);
				BlockM.destroyBlocks(1.9);
		}
		
		if(PointsM.totalPoints >= 1500 && PointsM.totalPoints < 2000 && LevelM.level == 3 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(1);
				BlockM.setBlockSpeed(2);
				BlockM.destroyBlocks(1.8);
		}
		
		if(PointsM.totalPoints >= 2000 && PointsM.totalPoints < 2500 && LevelM.level == 4 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(0.9);
				BlockM.setBlockSpeed(2.5);
				BlockM.destroyBlocks(1.7);
		}
		
		if(PointsM.totalPoints >= 2500 && PointsM.totalPoints < 3000 && LevelM.level == 5 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(0.8);
				BlockM.setBlockSpeed(2.8);
				BlockM.destroyBlocks(1.6);
		}
		
		if(PointsM.totalPoints >= 3000 && PointsM.totalPoints < 3500 && LevelM.level == 6 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(3);
				BlockM.setBlockSpeed(3);
				BlockM.destroyBlocks(1.5);
		}
		
		if(PointsM.totalPoints >= 3500 && PointsM.totalPoints < 4000 && LevelM.level == 7 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(0.5);
				BlockM.setBlockSpeed(4);
				BlockM.destroyBlocks(1.0);
		}
		
		if(PointsM.totalPoints >= 4000 && PointsM.totalPoints < 4500 && LevelM.level == 8 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(0.4);
				BlockM.setBlockSpeed(4.5);
				BlockM.destroyBlocks(0.2);
		}
		
		if(PointsM.totalPoints >= 4500 && PointsM.totalPoints < 5000 && LevelM.level == 9 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(0.3);
				BlockM.setBlockSpeed(5);
				BlockM.destroyBlocks(0.1);
		}
		
		if(PointsM.totalPoints >= 5000 && PointsM.totalPoints < 5500 && LevelM.level == 10 )
		{
				LevelM.ChangeLevel();
				TimeM.addTime(61);
				BlockM.setSpawnRate(0.2);
				BlockM.setBlockSpeed(5.5);
				BlockM.destroyBlocks(0.1);
		}
	}

}

//--------Start Game--------//
function StartGameButtonPress()
{
   	var fingerCount = 0;
    for (var touch : Touch in Input.touches) 
    {
        if (touch.phase != TouchPhase.Ended && touch.phase != TouchPhase.Canceled)
            fingerCount++;
    }
    if(fingerCount > 0)
    {
    	screentouch = true;
		StartGame();
	
		tapStartGUI.enabled = false;
	}
}


function BackButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      		if ( SmallExitGUI.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
         			audio.PlayOneShot(clip);
         			GameStarted = false;
					BlockM.setSpawn(false);
					BlockM.DelBlocks();
					Application.LoadLevel("LoadingScreenMainMenu");
         		}
         	}
      	}
   	}
}

function RetryButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      		if ( RetryGUI.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
         			audio.PlayOneShot(clip);
					Application.LoadLevel("LoadingScreen");
         		}
         	}
      	}
   	}
}

function SubmitButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      		if ( SubmitGUI.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
         			
         			audio.PlayOneShot(clip);
					var ps = Score.getPlayerScores();
		 			
		 			Score.PlaceTopPlayerScore( stringToEdit, ps);
		 			
		 			GUIOn(false);
					keyDone = true;
					camSwap(2);
					
					StartingCam.animation.Play();
					StartingCam.animation.wrapMode = WrapMode.Loop;
					
					Score.TopFiveDisplay();
					Score.PlayersScoreDisplay();
					Score.TopScoreGUIon(true);
					//Enable Top Score and Retry or exit
					
					RetryGUI.enabled = true;
					SmallExitGUI.enabled = true;
					keyDone = false;
					SubmitGUI.enabled = false;
					BgSubmitGUI.enabled = false;
				
         		}
         	}
      	}
   	}
}
