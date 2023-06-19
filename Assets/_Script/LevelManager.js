
var DisplayName : GUIText;
var DisplayNumber : GUIText;
//var levelup : GUITexture;

var level : int;
var TotalLevels : int;

private var isAni : boolean = false;
private var up : float ;

var prefab : GameObject;

function Start()
{
	posGUI();
	
	
	
}

function Update () 
{

	DisplayNumber.text = String.Format ("{00}", level );
}

function posGUI()
{
	var ScreenHeight : float = Screen.height * 0.93;
	
	var ScreenWidth : float = Screen.width;
	
	DisplayName.pixelOffset = new Vector2( (ScreenWidth * 0.01), ScreenHeight);
	DisplayNumber.pixelOffset = new Vector2((ScreenWidth * 0.10) , ScreenHeight);
}

function ChangeLevel()
{
	level++;
	Instantiate(prefab,prefab.transform.position, prefab.transform.rotation);
}





