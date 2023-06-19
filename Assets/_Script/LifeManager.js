var GameM : GameManager;

var Life_1GUI : GUITexture;
var Life_2GUI : GUITexture;
var Life_3GUI : GUITexture;

var playerLife : int = 0;

function Start()
{
	lifeManagerOn(false);
	PlayerLifeSet(3);
	GUIDisplay();
}

function Update () 
{
	Display();
	
	if(playerLife > 3)
		playerLife = 3;
}

function Display()
{
    switch (playerLife) {
    
    	case 0 :
    		Life_1GUI.enabled = false;
    		GameM.gameOver = true;
    		break;
        case 1:
        	Life_1GUI.enabled = true;
            Life_2GUI.enabled = false;
            Life_3GUI.enabled = false;
            break;
        case 2:
			Life_1GUI.enabled = true;
            Life_2GUI.enabled = true;
            Life_3GUI.enabled = false;
            break;
        case 3:
            Life_1GUI.enabled = true;
            Life_2GUI.enabled = true;
            Life_3GUI.enabled = true;
            break;
        default:

            break;
    }
}

function GUIDisplay()
{
	var height : int = Screen.height;
	var width : int = Screen.width;
	
	var percH : float = 0.80;
	Life_1GUI.pixelInset = Rect( 10, height * percH , Life_1GUI.pixelInset.width, Life_1GUI.pixelInset.height);
	Life_2GUI.pixelInset = Rect( Life_2GUI.pixelInset.width + 15, height * percH , Life_2GUI.pixelInset.width, Life_2GUI.pixelInset.height);
	Life_3GUI.pixelInset = Rect( (Life_3GUI.pixelInset.width*2) + 20, height * percH , Life_3GUI.pixelInset.width, Life_3GUI.pixelInset.height);
}


function PlayerLifeSet( numLife : int )
{
	playerLife = numLife;
}

function PlayerLifeUp()
{
	 playerLife++;
}

function PlayerLifeDown()
{
	 playerLife--;
}

function lifeManagerOn(isOn : boolean)
{
		Life_1GUI.enabled = isOn;
		Life_2GUI.enabled = isOn;
		Life_3GUI.enabled = isOn;
}