var GameM : GameManager;

var DisplayName : GUIText;
var DisplayNumber : GUIText;

var totalPoints : int = 0;

var isNegitive : boolean = false;

function Start()
{
	posGUI();
	totalPoints = 0;
	
}
function Update () 
{	
	DisplayNum();
	negativePoint();
}

function posGUI()
{
	var ScreenHeight : float = Screen.height ;
	
	DisplayName.pixelOffset = new Vector2( 10, ScreenHeight);
	DisplayNumber.pixelOffset = new Vector2(100, ScreenHeight);
}

function AddPoints(NumPoints : int)
{
	totalPoints = totalPoints + NumPoints;
}

function SubPoints(NumPoints : int)
{
	totalPoints = totalPoints - NumPoints;
}

function DisplayNum()
{
	DisplayNumber.text = String.Format ("{00000}", totalPoints );
}

function PointsOn(on : boolean)
{
	DisplayName.enabled = on;
	DisplayNumber.enabled = on;
}

function negativePoint()
{
	
	var points : int = Mathf.Sign(totalPoints);
	
	if (points == -1)
	{
		 GameM.GameOver(true);
		 isNegitive = true;
		 totalPoints = 0;
	}
}