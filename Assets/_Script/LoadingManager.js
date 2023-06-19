#pragma strict
var LoadingTex : GUITexture;

var timer : float = 2f;
var LoadToLevel : String = "";

function Start () 
{
	loadingScreenPos();
	yield WaitForSeconds(timer);
	
	Application.LoadLevel(LoadToLevel);
}

function loadingScreenPos()
{
	var screenW = Screen.width;
	var screenH = Screen.height;
	
	LoadingTex.pixelInset = Rect(0, 0 , screenW,  screenH);
	
}
