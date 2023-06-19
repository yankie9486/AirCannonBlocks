var LifeM : LifeManager;
var points : PointsSetup;

var BlockRandomNum = new Array (100, 200, 300);

var explosionPrefab : ParticleEmitter;

var oneHun : GameObject;
var twoHun : GameObject;
var threeHun : GameObject;

var lifeup : GameObject;

function OnCollisionEnter(collision : Collision) 
{
    // Rotate the object so that the y-axis faces along the normal of the surface
    var contact = collision.contacts[0];
    var pos = contact.point;
   
    if ( contact.otherCollider )
    { 
    	var gObjName  = contact.otherCollider.gameObject;
    
			
		switch(gObjName.name)
		{
			case ("BlockRedS(Clone)"):
				Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
				GameObject.Find("PointsSetup").SendMessage ("SubPoints", 10);				
	    		Destroy(gObjName);
	    		Destroy(gameObject);
	   
    		break;
    		
    		case ("BlockBlueA(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", 10);
	    		Destroy(gObjName);
	    		Destroy(gameObject);
	    		 
	    	break;
	    	
	    	 case ("BlockGreenA(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", 20);
	    		Destroy(gObjName);
	    		Destroy(gameObject);

	    	break;
	    	
	    	 case ("BlockStarA(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", 200);
	    		Destroy(gObjName);
	    		Destroy(gameObject);
	    		//GUI
	    		Instantiate(twoHun,twoHun.transform.position, twoHun.transform.rotation);	

	    	break;   
	    	
	    	 case  ("BlockDeath(Clone)"):
	   		    Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	   		    GameObject.Find("LifeManager").SendMessage ("PlayerLifeDown");
	    		Destroy(gObjName);
	    		Destroy(gameObject);

	    	break;	
	    	
	    	  case ("BlockCoinA(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", 100);
	    		Destroy(gObjName);
	    		Destroy(gameObject);

    		break;
    		
    		case ("Block50Points(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", 50);
	    		Destroy(gObjName);
	    		Destroy(gameObject);


    		break;
    		
    		case  ("Block100PointsA(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", 100);
	    		Destroy(gObjName);
	    		Destroy(gameObject);
 
    		break;
    		
    		case ("Block100PointsS(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		GameObject.Find("PointsSetup").SendMessage ("SubPoints", 100);
	    		Destroy(gObjName);
	    		Destroy(gameObject);
	    		
    		break; 
    		
    		case ("BlockFreeze(Clone)"):		  		  	 	
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		Destroy(gObjName);
	    		
	    		GameObject.Find("BlockManager").GetComponent(BlockManager).freezeBlocks = true;
	    		Destroy(gObjName);
	    		Destroy(gameObject);
 
    		break;
    		
    		case ("BlockRandom(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		var temp = BlockRandomNum[Random.Range(1,3)];
	    		GameObject.Find("PointsSetup").SendMessage ("AddPoints", temp);
	    		Destroy(gObjName);
	    		Destroy(gameObject);
	    		
	    		switch(temp)
	    		{
	    			case (100):
			    		//GUI
			    		Instantiate(oneHun,oneHun.transform.position, oneHun.transform.rotation);	    			
	    			
	    			break;
	    			
	    			case (200):
	    			
	    				//GUI
			    		Instantiate(twoHun,twoHun.transform.position, twoHun.transform.rotation);	    			
	    			
	    			break;
	    			
	    			case(300):
	    			
	    				//GUI
			    		Instantiate(threeHun,threeHun.transform.position, threeHun.transform.rotation);	    			
	    			
	    			break;
	    		
	    		}
	    		

    		break;
    		
    		case ("BlockLifeA(Clone)"):
	    		Instantiate(explosionPrefab, gObjName.transform.position, Quaternion.identity);
	    		Destroy(gObjName);
	    		Destroy(gameObject);

	    		if(LifeM.playerLife < 3)
	    		{
	    			GameObject.Find("LifeManager").SendMessage ("PlayerLifeUp");
	    			//GUI
			    	Instantiate(lifeup,lifeup.transform.position, lifeup.transform.rotation);	    			
	    			print("playerlife is less than 3");
	    		}
    		break;
    		
    		case ("Wall"):
	    		Instantiate(explosionPrefab, pos, Quaternion.identity);
	    		
	    		Destroy(gameObject);
    		break;   
    		
    		case ("Floor"):
	    		Instantiate(explosionPrefab, pos, Quaternion.identity);
	    		Destroy(gameObject);
 
    		break;
 
    		case ("BottomStage"):
	    		
	    		Instantiate(explosionPrefab, pos, Quaternion.identity);
	    		Destroy(gameObject);

    		break;
    		
    		case ("WallC_UCX"):
    			
	    		Instantiate(explosionPrefab, pos, Quaternion.identity);
	    		Destroy(gameObject);

	    	break;
	    	
	    	case ("WallC_UCX2"):
	    		Instantiate(explosionPrefab, pos, Quaternion.identity);
	    		Destroy(gameObject);
	    		
	    	break;
	    	
	    	case ("WallC_UCX3"):
	    		Instantiate(explosionPrefab, pos, Quaternion.identity);
	    		Destroy(gameObject);
 
	    	break;
    		
    		default:

    		break;	
		}
		
			
    }
}