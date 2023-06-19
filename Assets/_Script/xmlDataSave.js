
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;
 
// Anything we want to store in the XML file, we define it here
class SoundData
{	
	var SoundSwitch : int = 1;
	var MusicVol : float = 1;
	var sfxVol : float = 1;
}
 
// UserData is our custom class that holds our defined objects we want to store in XML format
 class UserSoundData
 {
    // We have to define a default instance of the structure
    public var _SoundData = new SoundData();
   
    // Default constructor doesn't really do anything at the moment
   function UserSoundData() { }
}

var _soundSwitch : boolean;
var _soundSwitchNum : int;
var _MusicVol : float;
var _sfxVol : float;
 
// This is our local private members
private var _FileLocation : String;
private var _FileName : String = "SoundData.xml";
private var fileName : String = "";

private var myData : UserSoundData;
private var _data : String;

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

    // we need something to store the information into
    myData=new UserSoundData();  
    
    ManageScore();
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
   var xs : XmlSerializer = new XmlSerializer(typeof(UserSoundData));
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
   var xs : XmlSerializer  = new XmlSerializer(typeof(UserSoundData));
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
   //Debug.Log("File written.");
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

function ManageScore()
{
   var t : FileInfo = new FileInfo(fileName);
   if(!t.Exists)
   { 
		myData._SoundData.SoundSwitch = 1;
		myData._SoundData.MusicVol = 1.0;
		myData._SoundData.sfxVol = 1.0;
	
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
         
         if(myData._SoundData.SoundSwitch == 0)
         {
         	_soundSwitch = false;
         }
         else
         {
         	_soundSwitch = true;
         }
         
         // set the players position to the data we loaded
     	_MusicVol = myData._SoundData.MusicVol;
     	_sfxVol = myData._SoundData.sfxVol;
     	
      }
   }
}

function OptionUpdate()
{
	myData._SoundData.SoundSwitch = GameObject.Find("OptionManager").GetComponent(OptionManager).getSoundSwitch();
	myData._SoundData.sfxVol = GameObject.Find("OptionManager").GetComponent(OptionManager).getSfxVol();
	myData._SoundData.MusicVol = GameObject.Find("OptionManager").GetComponent(OptionManager).getMusicVol();
	
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

function getSoundSwitch()
{
	return myData._SoundData.SoundSwitch;
}

function getSfxVol()
{
	return myData._SoundData.sfxVol;
}

function getMusicVol()
{
	return myData._SoundData.MusicVol;
}