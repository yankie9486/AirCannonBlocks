#pragma strict
#pragma downcast
 
private static var kb : iPhoneKeyboard = null;
private static var currentIOSInputField : int = -1;
 
public static function InputField(fieldID : int    //positive unique to current DoUI
    , rect : Rect    // standard positioning rectangle
    , text : String    // the string to start with
    , maxLength : int	// 0 indicates infinite
    , keyboardType : iPhoneKeyboardType
    , secure : boolean    // true will cause the keyboard to go in to password mode and the field to show only asterisks
    , autocorrect : boolean    // false will disable autocorrect, useful for fields where a user types in a name
    , styleGui : GUIStyle
) : String    // returns the modified string
{
#if UNITY_IPHONE && !UNITY_EDITOR
 	

    var style : GUIStyle = styleGui;
    
    var displayText : String;
    
    if(secure)
    {
        displayText = "";
        for(var i : int = 0; i < text.Length; ++i) {displayText += "*";}
    }
    else
    {
        displayText = text;
    }
 
    if(GUI.Button(rect, displayText, style))
    {
        kb = iPhoneKeyboard.Open(text, keyboardType, autocorrect, false, secure, false, ""); 
        iPhoneKeyboard.hideInput = false;
        currentIOSInputField = fieldID;
    }
 
    if(kb && (currentIOSInputField == fieldID))
    {
        if(maxLength == 0 || text.Length <= maxLength)
        {
             text = kb.text;
        }
        else
        {
            text = kb.text.Substring(0, maxLength);
        }
 
        if(kb.done)
        {
            kb = null;
            currentIOSInputField = -1;
        }
    }
 
    return text;
#else
    if(secure)
    {
        if(maxLength > 0)
        {
            return GUI.PasswordField(rect, text, "*"[0], maxLength);
        }
        else
        {
            return GUI.PasswordField(rect, text, "*"[0]);
        }
    }
    else
    {
        if(maxLength > 0)
        {
            return GUI.TextField(rect, text, maxLength);
        }
        else
        {
            return GUI.TextField(rect, text);
        }
    }
#endif 
}
 
public static function PWField(fieldID : int, rect : Rect, text : String, maxLength : int, StyleGui : GUIStyle) : String
{
    return InputField(fieldID, rect, text, maxLength, iPhoneKeyboardType.Default, true, false, StyleGui);
}
 
public static function EMailField(fieldID : int, rect : Rect, text : String, StyleGui : GUIStyle) : String
{
    return InputField(fieldID, rect, text, 0, iPhoneKeyboardType.EmailAddress, false, false, StyleGui);
}
 
public static function NameField(fieldID : int, rect : Rect, text : String, maxLength : int, StyleGui : GUIStyle) : String
{
    return InputField(fieldID, rect, text, maxLength, iPhoneKeyboardType.Default, false, false, StyleGui);
}