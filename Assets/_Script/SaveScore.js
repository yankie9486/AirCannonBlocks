
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;
import System.Collections.Generic;

 
// Anything we want to store in the XML file, we define it here
class TopPlayerData
{	
	var name : String = "";
	var score : int;
}
 
// UserData is our custom class that holds our defined objects we want to store in XML format
 class UserData
 {
    // We have to define a default instance of the structure
    public var TopPlayer_1 = new TopPlayerData();
    public var TopPlayer_2 = new TopPlayerData();
    public var TopPlayer_3 = new TopPlayerData();
    public var TopPlayer_4 = new TopPlayerData();
    public var TopPlayer_5 = new TopPlayerData();
    
    
    // Default constructor doesn't really do anything at the moment
   function UserData() { }
}
 
 // Game Manager 
var GameM : GameManager; 
 
// This is our local private members
private var _FileLocation : String;
private var _FileName : String = "SaveData.xml";
private var fileName : String = "";
 
//PointsManagers
var pointsM : PointsSetup;

var PlayerScoreTxt : GUIText[];
var PlayerNameTxt : GUIText[];
var TopPlayerBg : GUITexture[];
var YourScoreTextGUI: GUIText;
var YourScore : GUIText;



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

#elif UNITY_ANDROID
	//fileName = Application.persistentDataPath + "/" + _FileName;
#else	
	fileName = Application.dataPath;
#endif
    
    myData=new UserData();  
      
    TopScoreGUIon(false);
     
    ManageScore();   
}
 
function Update()
{
	if(GameM.gameOver)
	{
		TopFiveDisplay();
	}
	
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
   //Debug.Log("File Read");
}

// Game Top 5 Player Score function4

function ManageScore()
{
   var t : FileInfo = new FileInfo(fileName);
   if(!t.Exists)
   { 
		 myData.TopPlayer_1.name = ""; 
		 myData.TopPlayer_1.score = 0;
		 
		 myData.TopPlayer_2.name = ""; 
		 myData.TopPlayer_2.score = 0;
		 
		 myData.TopPlayer_3.name = ""; 
		 myData.TopPlayer_3.score = 0;
		 
		 myData.TopPlayer_3.name = ""; 
		 myData.TopPlayer_3.score = 0;
		 
		 myData.TopPlayer_4.name = ""; 
		 myData.TopPlayer_4.score = 0;
		 
		 myData.TopPlayer_5.name = ""; 
		 myData.TopPlayer_5.score = 0;
	
		_data = SerializeObject(myData); 
		
	   	 CreateXML();	 
   }
   else
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

function PlayersScoreDisplay()
{
	var height : float = Screen.height * 0.14;
	var width : float = Screen.width ;
	
	YourScoreTextGUI.pixelOffset = Vector2( width * 0.25 , height );
	YourScore.pixelOffset = Vector2( width * 0.65 , height );
	
	var pscore : int = getPlayerScores();
	YourScore.text = pscore.ToString();
}

function TopFiveDisplay()
{
	var height : float = Screen.height * 0.81;
	var width : float = Screen.width;
	var spacers : float = Screen.height * 0.16;

	var index : int = 0;
	var index2 : int = 0;
	var index3 : int = 0;
	
	for( var topScoBg : GUITexture in TopPlayerBg )
	{
		topScoBg.pixelInset = Rect( (width / 2) - ( topScoBg.pixelInset.width / 2 ) , height - spacers - index , topScoBg.pixelInset.width, topScoBg.pixelInset.height); 
		index += spacers;
	}
	
	var i : int = 1;
	for( var topPlayerN : GUIText in  PlayerNameTxt )
	{
		topPlayerN.pixelOffset = Vector2( width * 0.25, height + spacers - (index2 + 10)  ); 
		index2 += spacers;
	}
	
	for( var topPlayerS : GUIText in  PlayerScoreTxt )
	{
		topPlayerS.pixelOffset = Vector2( width * 0.63, height + spacers - (index3 + 10) ); 
		index3 += spacers;
	}

}

function TopScoreGUIon(Switch : boolean)
{
	for( var topScoBg : GUITexture in TopPlayerBg )
	{
		topScoBg.enabled = Switch;
	}
	
	for( var topPlayerN : GUIText in  PlayerNameTxt )
	{
		topPlayerN.enabled = Switch;
	}
	
	for( var topPlayerS : GUIText in  PlayerScoreTxt )
	{
		topPlayerS.enabled = Switch;
	}
	
	YourScore.enabled = Switch;
	YourScoreTextGUI.enabled = Switch;
} 

// Place Player
function PlaceTopPlayerScore( playerName : String, playerScore : int)
{
	
	print("1.player Name = " + myData.TopPlayer_1.name + " player score = " + myData.TopPlayer_1.score);
	print("2.player Name = " + myData.TopPlayer_2.name + " player score = " + myData.TopPlayer_2.score);
	print("3.player Name = " + myData.TopPlayer_3.name + " player score = " + myData.TopPlayer_3.score);
	print("4.player Name = " + myData.TopPlayer_4.name + " player score = " + myData.TopPlayer_4.score);
	print("5.player Name = " + myData.TopPlayer_5.name + " player score = " + myData.TopPlayer_5.score);
	
	var playerNames : String[];
	
	playerNames = new String[5];
		
	playerNames[0] = myData.TopPlayer_1.name;
	playerNames[1] = myData.TopPlayer_2.name;
	playerNames[2] = myData.TopPlayer_3.name;
	playerNames[3] = myData.TopPlayer_4.name;
	playerNames[4] = myData.TopPlayer_5.name;
	
	for (var i : int = 0; i < 5 ; i++)
	{
		print(playerNames[i]);
	}
	
	var arr = new Array (   myData.TopPlayer_1.score, 
							myData.TopPlayer_2.score,
							myData.TopPlayer_3.score,
							myData.TopPlayer_4.score,
							myData.TopPlayer_5.score,
							playerScore);

	arr.Sort();
	arr.Reverse();

	myData.TopPlayer_1.score = arr[0];
	myData.TopPlayer_2.score = arr[1];
	myData.TopPlayer_3.score = arr[2];
	myData.TopPlayer_4.score = arr[3];
	myData.TopPlayer_5.score = arr[4];
	
	print("arr0 = " + arr[0]);
	print("arr1 = " + arr[1]);
	print("arr2 = " + arr[2]);
	print("arr3 = " + arr[3]);
	print("arr4 = " + arr[4]);
	
	switch(playerScore)
	{
		case (myData.TopPlayer_1.score):
		myData.TopPlayer_1.name = playerName;
		myData.TopPlayer_2.name = playerNames[0];
		myData.TopPlayer_3.name = playerNames[1];
		myData.TopPlayer_4.name = playerNames[2];
		myData.TopPlayer_5.name = playerNames[3];
		
		print("1.player Name = " + myData.TopPlayer_1.name + " player score = " + myData.TopPlayer_1.score);
		break;
		
		case (myData.TopPlayer_2.score):
		
		myData.TopPlayer_1.name = playerNames[0];
		myData.TopPlayer_2.name = playerName;
		myData.TopPlayer_3.name = playerNames[2];
		myData.TopPlayer_4.name = playerNames[3];
		myData.TopPlayer_5.name = playerNames[4];
		
		print("2.player Name " + myData.TopPlayer_2.name + "player score " + myData.TopPlayer_2.score);
		break;
		
		case(myData.TopPlayer_3.score):
		
		myData.TopPlayer_1.name = playerNames[0];
		myData.TopPlayer_2.name = playerNames[1];
		myData.TopPlayer_3.name = playerName;
		myData.TopPlayer_4.name = playerNames[2];
		myData.TopPlayer_5.name = playerNames[3];
		
		print("3.player Name " + myData.TopPlayer_3.name + "player score " + myData.TopPlayer_3.score);
		break;
		
		case (myData.TopPlayer_4.score):
		myData.TopPlayer_1.name = playerNames[0];
		myData.TopPlayer_2.name = playerNames[1];
		myData.TopPlayer_3.name = playerNames[2];	
		myData.TopPlayer_4.name = playerName;
		myData.TopPlayer_5.name = playerNames[3];
		print("4.player Name " + myData.TopPlayer_4.name + "player score " + myData.TopPlayer_4.score);
		break;
		
		case (myData.TopPlayer_5.score):
		myData.TopPlayer_1.name = playerNames[0];
		myData.TopPlayer_2.name = playerNames[1];
		myData.TopPlayer_3.name = playerNames[2];
		myData.TopPlayer_4.name = playerNames[3];
		myData.TopPlayer_5.name = playerName;
		print("5.player Name " + myData.TopPlayer_5.name + "player score " + myData.TopPlayer_5.score);
		break;
		
		case (0):
		
		break;
		
		default:
		break;
	}
		
	_data = SerializeObject(myData);	
		
    var writer : StreamWriter;
    var t : FileInfo = new FileInfo(fileName);
    
    if(t.Exists)
    {
       t.Delete();
       writer = t.CreateText();
    }
    writer.Write(_data);
    writer.Close();
    Debug.Log("File written Place Top Score.");
    
    ManageScore();
    
}

function getPlayerScores() 
{
	return pointsM.totalPoints;
}
