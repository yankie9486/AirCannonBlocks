#pragma strict

var gameM : GameManager;

var scoreM : PointsSetup;

var isTime : boolean = false;

var DisplayNumber : GUIText;

private var startTime : float;
private var restSeconds : int;
private var roundedRestSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
private var text : String;

private var guiTime : float;
 
var countDownSeconds : int;


function Start () 
{	
	posGUI();
}

function Update () 
{
		
	if(isTime)
	{    
	    guiTime  = Time.time - gameM.StartTime;
	    
	    restSeconds = countDownSeconds - (guiTime);
	    
	    if (restSeconds == 60) 
	    {
        print ("One Minute Left");
    	}	
	 
	    if (restSeconds == 0) 
	    {
	    	isTime = false;
	    	gameM.gameOver = true;
	        print ("Time is Over");
	    }
	 
	    //display the timer
	    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
	    displaySeconds = roundedRestSeconds;
	    //displayMinutes = roundedRestSeconds / 60; 
	    
	    
		text = String.Format ("{00}", displaySeconds); 
		DisplayNumber.text = text;
		
	}
}

function posGUI()
{
	var ScreenHeight : float = Screen.height;
	var ScreenWidth : float = Screen.width;
	
	DisplayNumber.pixelOffset = new Vector2((ScreenWidth * 0.48) , ScreenHeight );
}

function timeGUI(on : boolean)
{
	DisplayNumber.enabled = on;
}

function addTime(addSec : int)
{
	countDownSeconds = countDownSeconds + addSec;
}

function restClock()
{
	// rest clock to 60
	var temp : int = countDownSeconds - 60;
	addTime(temp);
	
	//add Point for amount time left
	var pointTemp : int = temp;
	scoreM.AddPoints(pointTemp);
	

}