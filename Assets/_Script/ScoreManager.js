#pragma strict

import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;
 
// This is our local private members
private var _FileLocation : String;
private var _FileName : String = "SaveData.xml";
private var fileName : String = "";

var PlayerScoreTxt : GUIText[];
var PlayerNameTxt : GUIText[];
var TopPlayerBg : GUITexture[];

var TopScoreGUI : GUITexture;
var TopScoreText : GUIText;

private var myData : UserData;
private var _data : String;
  
// When the EGO is instansiated the Start will trigger
// so we setup our initial values for our local members
//function Start () {
function Awake () 
{	
      
#if UNITY_IPHONE			
	_FileLocation = Application.dataPath.Substring (0, Application.dataPath.Length - 5); 
	fileName = _FileLocation.Substring(0, _FileLocation.LastIndexOf('/')) + "/Documents/" + _FileName; 
	
	 Debug.Log(fileName);
#elif UNITY_ANDROID
	//fileName = Application.persistentDataPath + "/" + _FileName;
#else	
	fileName = Application.dataPath + "/" + "Asset/";
#endif
    
	 // we need something to store the information into
	 myData=new UserData();  
	  
	 ManageScore();
	 TopFiveDisplay();
}
  
/* The following metods came from the referenced URL */
//string UTF8ByteArrayToString(byte[] characters)
function UTF8ByteArrayToString(characters : byte[] )
{     
   var encoding : UTF8Encoding  = new UTF8Encoding();
   var constructedString : String  = encoding.GetString(characters);
   return (constructedString);
}
 
//byte[] StringToUTF8ByteArray(string pXmlString)
function StringToUTF8ByteArray(pXmlString : String)
{
   var encoding : UTF8Encoding  = new UTF8Encoding();
   var byteArray : byte[]  = encoding.GetBytes(pXmlString);
   return byteArray;
}
 
   // Here we serialize our UserData object of myData
   //string SerializeObject(object pObject)
function SerializeObject(pObject : Object)
{
   var XmlizedString : String  = null;
   var memoryStream : MemoryStream  = new MemoryStream();
   var xs : XmlSerializer = new XmlSerializer(typeof(UserData));
   var xmlTextWriter : System.Xml.XmlTextWriter  = new System.Xml.XmlTextWriter(memoryStream, Encoding.UTF8);
   xs.Serialize(xmlTextWriter, pObject);
   memoryStream = xmlTextWriter.BaseStream; // (MemoryStream)
   XmlizedString = UTF8ByteArrayToString(memoryStream.ToArray());
   return XmlizedString;
}
   // Here we deserialize it back into its original form
   //object DeserializeObject(string pXmlizedString)
function DeserializeObject(pXmlizedString : String)   
{
   var xs : XmlSerializer  = new XmlSerializer(typeof(UserData));
   var memoryStream : MemoryStream  = new MemoryStream(StringToUTF8ByteArray(pXmlizedString));
   var xmlTextWriter : System.Xml.XmlTextWriter  = new System.Xml.XmlTextWriter(memoryStream, Encoding.UTF8);
   return xs.Deserialize(memoryStream);
}

   // Finally our save and load methods for the file itself
function CreateXML()
{
   var writer : StreamWriter;
   //FileInfo t = new FileInfo(_FileLocation+"\\"+ _FileName);
   var t : FileInfo = new FileInfo(fileName);
   if(!t.Exists)
   {
      writer = t.CreateText();
   }
   else
   {
      //t.Delete();
      //writer = t.CreateText();
   }
   writer.Write(_data);
   writer.Close();
   Debug.Log("File written.");

}
 
function LoadXML()
{
   //StreamReader r = File.OpenText(_FileLocation+"\\"+ _FileName);
   var r : StreamReader = File.OpenText(fileName);
   var _info : String = r.ReadToEnd();
   r.Close();
   _data=_info;
   Debug.Log("File Read");
}

// Game Top 5 Player Score function4

function ManageScore()
{
   var t : FileInfo = new FileInfo(fileName);
   if(t.Exists)
   { 
   	// Saved Data
   	  LoadXML();
      if(_data.ToString() != "")
      {
        myData = DeserializeObject(_data);
        // set the players position to the data we loaded
     
	    PlayerNameTxt[0].text = myData.TopPlayer_1.name;
		PlayerScoreTxt[0].text = myData.TopPlayer_1.score.ToString();
		
		PlayerNameTxt[1].text = myData.TopPlayer_2.name;
		PlayerScoreTxt[1].text = myData.TopPlayer_2.score.ToString();
		
		PlayerNameTxt[2].text = myData.TopPlayer_3.name;
		PlayerScoreTxt[2].text = myData.TopPlayer_3.score.ToString();
		
		PlayerNameTxt[3].text = myData.TopPlayer_4.name;
		PlayerScoreTxt[3].text = myData.TopPlayer_4.score.ToString();
		
		PlayerNameTxt[4].text = myData.TopPlayer_5.name;
		PlayerScoreTxt[4].text = myData.TopPlayer_5.score.ToString();
      }
   }
}


function TopFiveDisplay()
{
	var height : float = 0;
	var width : float = 0;
	var spacers : float = 0;

	var index : int = 0;
	var index2 : int = 0;
	var index3 : int = 0;

	if(iPhoneSettings.generation == iPhoneGeneration.iPhone4S)
	{	
		height = Screen.height * 0.64f;
		width = Screen.width;
		spacers = Screen.height * 0.16f;
		
		for( var topScoBg : GUITexture in TopPlayerBg )
		{
			topScoBg.pixelInset = Rect( (width / 2) - ( topScoBg.pixelInset.width / 2 ) , height - spacers - index , topScoBg.pixelInset.width, topScoBg.pixelInset.height); 
			index += spacers;
		}
		
		for( var topPlayerN : GUIText in  PlayerNameTxt )
		{
			topPlayerN.pixelOffset = Vector2( width * 0.30f, height + spacers - (index2 + 10)  ); 
			index2 += spacers;
		}
		
		for( var topPlayerS : GUIText in  PlayerScoreTxt )
		{
			topPlayerS.pixelOffset = Vector2( width * 0.63f, height + spacers - (index3 + 10) ); 
			index3 += spacers;
		}
	
	}
	else if(iPhoneSettings.generation == iPhoneGeneration.iPad2Gen)
	{
		height = Screen.height * 0.64f;
		width = Screen.width;
		spacers = Screen.height * 0.16f;
		
		for( var topScoBg : GUITexture in TopPlayerBg )
		{
			topScoBg.pixelInset = Rect( (width / 2) - ( topScoBg.pixelInset.width / 2 ) , height - spacers - index , topScoBg.pixelInset.width, topScoBg.pixelInset.height); 
			index += spacers;
		}
		
		
		for( var topPlayerN : GUIText in  PlayerNameTxt )
		{
			topPlayerN.pixelOffset = Vector2( width * 0.30f, height + spacers - (index2 + 10)  ); 
			index2 += spacers;
		}
		
		for( var topPlayerS : GUIText in  PlayerScoreTxt )
		{
			topPlayerS.pixelOffset = Vector2( width * 0.63f, height + spacers - (index3 + 10) ); 
			index3 += spacers;
		}
	}
	
	TopScoreGUI.pixelInset = Rect( (width / 2) - ( TopScoreGUI.pixelInset.width / 2 )  , Screen.height * 0.65f , TopScoreGUI.pixelInset.width, TopScoreGUI.pixelInset.height);
	
	TopScoreText.pixelOffset = Vector2( Screen.width * 0.4f, Screen.height * 0.95f);
}
