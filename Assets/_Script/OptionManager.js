#pragma strict

var SoundText : GUIText;
var SoundSwitchGUI : GUITexture;

var onButtonTexture : Texture2D;
var offButtonTexture : Texture2D;

var SoundSwitch : boolean = true;

var MusicVname : GUIText;
var SFXVname : GUIText;

var MusicVolValue : float = 1.0;
var SFXVolValue : float = 1.0;

var BackButGUI : GUITexture;

//var slider : GUISkin;

var buttonSound : AudioClip;

function Start () 
{
	GUIPosition();
	
	MusicVolValue = GameObject.Find("SoundData").GetComponent(xmlDataSave).getMusicVol();
	
	SFXVolValue = GameObject.Find("SoundData").GetComponent(xmlDataSave).getSfxVol();
	
	var num : int = GameObject.Find("SoundData").GetComponent(xmlDataSave).getSoundSwitch();
	
	if(num == 1)
	{	
		SoundSwitch = true;
	}
	else
	{
		SoundSwitch = false;
	}
	
	gameObject.audio.enabled = GameObject.Find("SoundData").GetComponent(xmlDataSave)._soundSwitch;
	gameObject.audio.volume = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;
	
}

function Update () 
{
	BackButtonPress();
	
	SwitchButtonPress();
}

function OnGUI () 
{

	//GUI.skin = slider;
   //MusicVolValue = GUI.HorizontalSlider (Rect( (Screen.width - 100) * 0.6f, Screen.height * 0.40f, 250, 10), MusicVolValue, 0.0, 1.0, slider.horizontalSlider, slider.horizontalSliderThumb );
   
   //SFXVolValue = GUI.HorizontalSlider (Rect( (Screen.width - 100) * 0.6f, Screen.height * 0.60f, 250, 10), SFXVolValue, 0.0, 1.0, slider.horizontalSlider, slider.horizontalSliderThumb );
   
   	if(SoundSwitch)
	{	
		SoundSwitchGUI.texture = onButtonTexture;
	}
	else
	{
		SoundSwitchGUI.texture = offButtonTexture;
	}
	
}

function GUIPosition()
{
	BackButGUI.pixelInset = Rect((Screen.width * 0.1) - (BackButGUI.pixelInset.width/2), Screen.height * 0.1 - (BackButGUI.pixelInset.height/2), BackButGUI.pixelInset.width, BackButGUI.pixelInset.height);
	
	SoundSwitchGUI.pixelInset = Rect((Screen.width * 0.65) - (SoundSwitchGUI.pixelInset.width/2), Screen.height * 0.79 - (SoundSwitchGUI.pixelInset.height/2), SoundSwitchGUI.pixelInset.width, SoundSwitchGUI.pixelInset.height);
	
	SoundText.pixelOffset = Vector2( (Screen.width * 0.28) , Screen.height * 0.85);
	
	MusicVname.pixelOffset = Vector2( (Screen.width * 0.15) , Screen.height * 0.65);
	
	SFXVname.pixelOffset = Vector2( (Screen.width * 0.15) , Screen.height * 0.45);
}


function BackButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      		if ( BackButGUI.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
         			audio.PlayOneShot(buttonSound);
         			
         			GameObject.Find("SoundData").GetComponent(xmlDataSave).OptionUpdate();
         			
         			
					Application.LoadLevel("MainLevel");
         		}
         	}
      	}
   	}
}

function SwitchButtonPress()
{
	if (Input.touchCount > 0)
   	{
      	for (var T : Touch in Input.touches)
      	{
      		if ( SoundSwitchGUI.HitTest(T.position ) )
      	 	{
         		if(T.phase == TouchPhase.Began )
         		{
					if(SoundSwitch)
					{	
						SoundSwitch = false;
						audio.PlayOneShot(buttonSound);
						SoundSwitchGUI.texture = offButtonTexture;
					}
					else
					{
						SoundSwitch = true;
						audio.PlayOneShot(buttonSound);
						SoundSwitchGUI.texture = onButtonTexture;
					}
         		}
         	}
      	}
   	}
}

function getSoundSwitch()
{
	var num : int;
	
   	if(SoundSwitch)
	{	
		num = 1;
	}
	else
	{
		num = 0;
	}
	
	return num;
}

function getSfxVol()
{
	var currentValue :float = GameObject.Find("SFXsliderThumbGUI").GetComponent(slider).getCurrentValue();
	print(currentValue);
	return currentValue;
}

function getMusicVol()
{
	var currentValue : float = GameObject.Find("MusicsliderThumbGUI").GetComponent(slider).getCurrentValue();
	print(currentValue);
	return currentValue;
}