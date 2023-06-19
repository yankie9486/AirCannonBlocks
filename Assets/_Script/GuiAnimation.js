#pragma strict

var smoothTime = 0.1;
var duration : float = 1;
var target : float =6;

var DestroyTargetAfter : float =5.8;

private var yVelocity = 0.0;

private var startAnimation : boolean = false;

function Start ()
{
	AnimationStart();
}

function Update () 
{

	if(startAnimation)
	{
		//gameObject.transform.position.y += Time.deltaTime * FPS;
		
		var newPosition : float = Mathf.SmoothDamp(transform.position.y, target,
		                             yVelocity, smoothTime);
		transform.position = Vector3(transform.position.x, newPosition, transform.position.z);
		
		if(gameObject.transform.position.y > DestroyTargetAfter)
		{
			startAnimation = false;
			Destroy(gameObject);
		}
		
	}
}

function AnimationStart()
{
	yield WaitForSeconds(duration);
	
	startAnimation = true;
	
}