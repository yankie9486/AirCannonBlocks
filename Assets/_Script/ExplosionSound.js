#pragma strict

private var destroyGameObject : float;

function Start () 
{
	var sound = this.GetComponent(AudioSource);
	destroyGameObject = sound.audio.clip.length;
	
	gameObject.audio.enabled = GameObject.Find("SoundData").GetComponent(xmlDataSave)._soundSwitch;
	gameObject.audio.volume = GameObject.Find("SoundData").GetComponent(xmlDataSave)._sfxVol;
}

function Update () 
{
	destroyGameObject -= Time.deltaTime;
	
	if(destroyGameObject <= 0.0)
		Destroy(gameObject);
}