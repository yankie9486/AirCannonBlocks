#pragma strict

// MoveSlider.cs by spaniard 2006-07-19
// Modified by Ippokratis 19-April-2011
// Changelog: Translated to UnityScript
 
// This script requires that the sliderBar and sliderWidget have the same transform
// Positioning is done using pixelOffsets
var sliderBar : GUITexture = null;
var sliderWidget : GUITexture = null;
var minValue:float = 0.0;
var maxValue:float = 100.0;
var currentValue:float = 0.0;

var WidgetX : float = 0.0;
var WidgetY : float = 0.0;

var X : float = 0.60;
var Y : float = 0.40;

var SFX : boolean;

private var connectedToMouse :boolean = false;
private var originalX : float = 0.0;
private var originalMouseX :float = 0.0;
private var currentX : float = 0.0;
private var halfWidgetWidth : float = 0.0;      // used to centre the widget at either end
 
function Start ()
{
	sliderWidget.pixelInset = Rect( (Screen.width - 100) * WidgetX, (Screen.height - (sliderWidget.pixelInset.height)) * WidgetY, sliderWidget.pixelInset.width, sliderWidget.pixelInset.height);
	sliderBar.pixelInset = Rect( (Screen.width - 100) * X, Screen.height  * Y, sliderBar.pixelInset.width, sliderBar.pixelInset.height);
	
	halfWidgetWidth = (sliderWidget.pixelInset.xMax - sliderWidget.pixelInset.xMin) * 0.5;
	currentX = sliderWidget.pixelInset.xMin + halfWidgetWidth;	
	
	if(SFX)
	{
		currentValue = getSFXDataValue();
	}
	else
	{
		currentValue = getMusicDataValue();
	}
}
 
function Update ()
{
	if (Input.touchCount > 0)
	{
	  	for (var T : Touch in Input.touches)
	  	{ 
	  		if ( sliderWidget.HitTest(T.position ) )
	  	 	{
	     		if(T.phase == TouchPhase.Moved )
	     		{
					connectedToMouse = true;
					originalMouseX = Input.mousePosition.x;
					originalX = sliderWidget.pixelInset.xMin + halfWidgetWidth;
	     		}
	        }
		 }
	 }
	 else
	 {
	  	connectedToMouse = false;
	 }
	  	
	if (connectedToMouse == true) 
	{
		// calculate currentX based on mouse position
		currentX = originalX - (originalMouseX - Input.mousePosition.x);
		// translate from the pixel values to the value
		currentValue = (((currentX - sliderBar.pixelInset.xMin) / 
		(sliderBar.pixelInset.xMax - sliderBar.pixelInset.xMin)) * 
		(maxValue - minValue)) + minValue;
	}
	
	// make sure the value isn't out of bounds
	currentValue = Mathf.Clamp(currentValue, minValue, maxValue);
	
	// update where the sliderWidget is drawn from currentValue (in case the value is changed externally)
	currentX = (((currentValue - minValue) / (maxValue - minValue)) * 
	(sliderBar.pixelInset.xMax - sliderBar.pixelInset.xMin)) + 
	sliderBar.pixelInset.xMin;
	
	sliderWidget.pixelInset = Rect ((currentX - halfWidgetWidth), sliderWidget.pixelInset.yMin, 
	(currentX + halfWidgetWidth) - (currentX - halfWidgetWidth), sliderWidget.pixelInset.yMax - 
	sliderWidget.pixelInset.yMin);
}

function getCurrentValue()
{
	return currentValue / 100;
}

function getMusicDataValue()
{
	var music : float = GameObject.Find("SoundData").GetComponent(xmlDataSave)._MusicVol;
	return music * 100;
}

function getSFXDataValue()
{
	var SFX : float = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;
	return SFX * 100;
}