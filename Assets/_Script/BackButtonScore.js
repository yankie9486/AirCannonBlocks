#pragma strict

var clip : AudioClip;

function Start () 
{
	gameObject.audio.enabled = GameObject.Find("SoundData").GetComponent(xmlDataSave)._soundSwitch;
	gameObject.audio.volume = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;
	
	guiTexture.pixelInset = Rect( Screen.width * 0.03f, Screen.height * 0.05f , guiTexture.pixelInset.width, guiTexture.pixelInset.height); 

}

function Update () 
{
   if (Input.touchCount > 0)
   {
      for (var T : Touch in Input.touches)
      {
      	
      	 if ( guiTexture.HitTest(T.position ) )
      	 {
         	if(T.phase == TouchPhase.Began )
         	{
         		audio.PlayOneShot(clip);
         		
            	Application.LoadLevel("MainLevel");	
         	}
         }
      }
	}
}