---
layout: single
title: How to create your own Google Sheets Custom Function
excerpt: ""
tags: [javascript, googlesheets, script]

---
{{ page.date | date: '%B %d, %Y' }}

## How to create a custom Function in Google Sheets

> *Why would you create a custom Function in Google Sheets?!*

When you create a custom function you have full control over the input and output of what you want to create. Its a powerful feature that is exposed for you to use.  

### Custom Functions basic requirements
---

#### Naming
1. The name cannot be a name of an already defined Built-in Function like ```=Sum()``` for example.
2. The name cannot contain an underscore ```_``` at the end of the function because that is used in Google Apps Script.
3. The name of your custom function must be declared with this syntax: ```function myFunction```, and cannot be declared as a ```var myFunction```


### My Custom Function: COMBINESTRINGS(first, second)
* The purpose of this function is to bring two columns together as one string and return that to the cell where you input the function.


 ``` 
/** Brings two columns of strings together.
*
* @param {string} First string.
* @param {string} Second string.
* @return both strings together.
* @customfunction
**/
function COMBINESTRINGS(first, second) {
  return first + ' ' + second;
}
 ```

### Start

1. Create a Google Sheets file inside Google Drive.
2. Go to Tools -> Script Editor

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![ScriptEditor]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/scriptEditor.png)


  * Script Editor Window

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![Default Code Window]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/defaultCodeWindow.png)

  * Code window with the custom function.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![Function Code]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/codeFunction.png)

3. Run the script. 
To run the script in the window you would normally click the play button it would work but since this is a Custom Function it should be called from the sheet cells. The other way to test the function is to create another function and call this function with the parameters. 

But since we haven't run anything at all we have to run the script and we will prompted to name the project. So click the play button and this window will come up. When it does just name the project whatever you like.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Function Code]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/EditProjName.png)


4. Autocompletion
* If you commented your function correctly and the right syntax then you should see this.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Function]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/combineStringsAutocompletion.png)
    
* Here is the sheet with the two strings and the function working in the sheet.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Function]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/example.png)

### Summary

Creating a custom function will give you flexibility to create whatever you want in Google Sheets and its a powerful tool to help you customize your use of Google Sheets.

* If you have any questions feel free to comment below or even contact me from any links on the sidebar.

#### References

* Gist script
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<script src="https://gist.github.com/pcast01/58177141dd9aaef6cbc58aa1790d9401.js"></script>
