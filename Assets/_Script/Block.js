#pragma strict

var ground : GameObject;
var DestroySec : float = 0;

function Start()
{
	setDestroySec(0.5f);
}

function OnCollisionEnter(collision : Collision) 
{
    // Rotate the object so that the y-axis faces along the normal of the surface
    var contact = collision.contacts[0];
    var pos = contact.point;
	
    if ( contact.otherCollider )
    {     	
    	if ( contact.otherCollider.gameObject.name == ground.name)
    	{
			yield WaitForSeconds(DestroySec);
			Destroy(contact.thisCollider.gameObject);
			
    	}
    	
    	if (contact.otherCollider.gameObject.name == "Floor")
    	{
    		Destroy(contact.thisCollider.gameObject);
    	}
	 }
}

function setDestroySec(sec : float)
{
	DestroySec = sec;
}

function setBlockSpeed(speed : float)
{
	gameObject.rigidbody.velocity = gameObject.transform.TransformDirection (Vector3.down * speed);
}

