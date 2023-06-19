var gameM : GameManager;

var PauseButton : GUITexture;
var ResumeButton : GUITexture;
var ExitButton : GUITexture;

var Pause : boolean = false;

var clip : AudioClip;

function Start()
{
	var space : int = 5;
	var screenW = Screen.width / 2;
	var screenH = Screen.height /2;
	
	PauseButton.pixelInset = Rect(Screen.width - (PauseButton.pixelInset.width + space), Screen.height - (PauseButton.pixelInset.height + space), PauseButton.pixelInset.width, PauseButton.pixelInset.height);
	
	ResumeButton.enabled = false;
	ResumeButton.pixelInset = Rect(screenW - (ResumeButton.pixelInset.width / 2), screenH - (ResumeButton.pixelInset.height / 2) + 100 , ResumeButton.pixelInset.width, ResumeButton.pixelInset.height);
	
	ExitButton.enabled = false;
	ExitButton.pixelInset = Rect(screenW - (ExitButton.pixelInset.width/2) , screenH - (ExitButton.pixelInset.height / 2) - 100 , ExitButton.pixelInset.width, ExitButton.pixelInset.height);

	PauseButOn(true);
}

function Update () 
{
	if (gameM.GameStarted == true)
	{		
		if (Pause == true)
		{	
			//PauseButtonPress();
			ResumeButton.enabled =  true;
			ResumeButtonPress();
			ExitButton.enabled = true;
			ExitButtonPress();
		}
		else
		{
			PauseButtonPress();
			ResumeButton.enabled =  false;
			ExitButton.enabled = false;
		}
	}
}

function PauseButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      	
      		if ( PauseButton.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{	
     				audio.PlayOneShot(clip);
     				Pause = true;	
     				Time.timeScale = 0;
         				
         		}
         	}
      	}
   	}
}

function ResumeButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      	
      		if ( ResumeButton.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
         			audio.PlayOneShot(clip);
     				Pause = false;
     				Time.timeScale = 1;
         		}
         	}
      	}
   	}
}



function ExitButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      	
      		if ( ExitButton.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
         			audio.PlayOneShot(clip);
         			Time.timeScale = 1;
         			Application.LoadLevel("LoadingScreenMainMenu");	
         		}
         	}
      	}
   	}
}

function PauseButOn( on : boolean)
{
	PauseButton.enabled = on;
}

function OnApplicationPause(pauseStatus : boolean)
{
	Pause = pauseStatus;
}
