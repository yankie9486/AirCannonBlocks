var gM : GameManager;

var shootStart : Transform;

var speed : float = 20;
var fireRate : float = 0.5;
private var nextFire : float = 0.0;
var projectile : Rigidbody;

var weaponFire : AudioClip;

function Start()
{
	gameObject.audio.enabled = GameObject.Find("SoundData").GetComponent(xmlDataSave)._soundSwitch;
	gameObject.audio.volume = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;
}

function Update () 
{
	if (gM.GameStarted)
	{
		FiretapPress();
		
		PlayerMove();
	}
}

function PlayerMove()
{		
	var lookSmoothDamp : float = 0.1;
	var lookSensitivity : float = 5;
	var xPositionV : float = 0;
	var xPosition : float = 0;
	var currentXposition : float = 0;
	 
	//Touch control
    xPosition  += Input.acceleration.x * lookSensitivity;
    xPosition = Mathf.Clamp(xPosition, -3, 3);
    currentXposition = Mathf.SmoothDamp(currentXposition, xPosition, xPositionV, lookSmoothDamp);
    
    // Moving Player Side to Side
    transform.Translate( currentXposition, 0, 0);
    transform.position.x = Mathf.Clamp(transform.position.x, -3, 3);
}

function fire()
{ 
	var ball: Rigidbody = Instantiate(projectile, shootStart.transform.position, shootStart.transform.rotation);
	ball.velocity = shootStart.TransformDirection (Vector3.forward * speed);
}

function FiretapPress()
{
   	if (gM.GameStarted)
	{	
		if (Input.touchCount > 0)
	   	{
	      	for (var T : Touch in Input.touches)
	      	{
	      	
	      		if ( gM.pauseB.PauseButton.HitTest(T.position ) || gM.pauseB.ResumeButton.HitTest(T.position ) || gM.pauseB.ExitButton.HitTest(T.position ) )
      	 		{

         		}
         		else
         		{
	         		if ( Time.time > nextFire)
					{
						//Shoot
						nextFire = Time.time + fireRate;
						fire();
						//gameObject.animation.Play();
						// Play sound
						audio.PlayOneShot(weaponFire);
				 	}
				 }
	         }
	     }
	 }
}

