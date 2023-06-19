var NewGameGUI : GUITexture;
var OptionGUI : GUITexture;
var ScoreGUI : GUITexture;
var BlockGUI : GUITexture;
var AirCannonText : GUIText;

var space : float = 100;

var clip : AudioClip;

function Start()
{
	DisplayGUI();
	
	gameObject.audio.enabled = GameObject.Find("SoundData").GetComponent(xmlDataSave)._soundSwitch;
	gameObject.audio.volume = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;
}

function Update () 
{
	NewGameOrCont();
	
	OptionGUIpress();
	
	ScoreGUIpress();
}

function DisplayGUI()
{
	var screenW = Screen.width;
	var screenH = Screen.height;
	
	NewGameGUI.pixelInset = Rect((screenW * 0.70) - (NewGameGUI.pixelInset.width / 2), (screenH * 0.80) - (NewGameGUI.pixelInset.height / 2) , NewGameGUI.pixelInset.width,  NewGameGUI.pixelInset.height);
	OptionGUI.pixelInset = Rect(screenW / 2 - (OptionGUI.pixelInset.width /2),(screenH * 0.50) - (OptionGUI.pixelInset.height / 2), OptionGUI.pixelInset.width,  OptionGUI.pixelInset.height);
	ScoreGUI.pixelInset = Rect((screenW * 0.25 ) - (ScoreGUI.pixelInset.width /2), (screenH * 0.20) - (ScoreGUI.pixelInset.height / 2), ScoreGUI.pixelInset.width, ScoreGUI.pixelInset.height);
	BlockGUI.pixelInset = Rect((screenW * 0.85 ) - (BlockGUI.pixelInset.width/2), (screenH * 0.30) - (BlockGUI.pixelInset.height / 2), BlockGUI.pixelInset.width, BlockGUI.pixelInset.height);
	
	AirCannonText.pixelOffset = Vector2( (Screen.width * 0.10) , Screen.height * 0.90);
}

function NewGameOrCont()
{

   if (Input.touchCount > 0)
   {
      for (var T : Touch in Input.touches)
      {
      	
      	 if ( NewGameGUI.HitTest(T.position ) )
      	 {
         	if(T.phase == TouchPhase.Began )
         	{
         		audio.PlayOneShot(clip);
            	Application.LoadLevelAsync("LoadingScreen");
         	}
         }
      }
   }
}

function OptionGUIpress()
{
   if (Input.touchCount > 0)
   {
      for (var T : Touch in Input.touches)
      {
      	
      	 if ( OptionGUI.HitTest(T.position ) )
      	 {
         	if(T.phase == TouchPhase.Began )
         	{
         		audio.PlayOneShot(clip);
            	Application.LoadLevelAsync("OptionLevel");
         	}
         }
      }
   }
}



function ScoreGUIpress()
{
   if (Input.touchCount > 0)
   {
      for (var T : Touch in Input.touches)
      {
      	 if ( ScoreGUI.HitTest(T.position ) )
      	 {
         	if(T.phase == TouchPhase.Began )
         	{
         		audio.PlayOneShot(clip);
            	Application.LoadLevelAsync("ScoreMenu");
         	}
         }
      }
   }
}