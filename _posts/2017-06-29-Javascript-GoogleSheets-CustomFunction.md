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

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Script Editor Window

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![Default Code Window]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/defaultCodeWindow.png)

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Code window with the custom function.

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

5. Inputs - Arrays

According this this google example you can also accept and array of objects or cells.
````
/**
 * Multiplies the input value by 2.
 *
 * @param {number} input The value or range of cells to multiply.
 * @return The input multiplied by 2.
 * @customfunction
 */
function DOUBLE(input) {
  if (input.map) {            // Test whether input is an array.
    return input.map(DOUBLE); // Recurse over array if so.
  } else {
    return input * 2;
  }
}

````
If you run this with just one cell, say A4 which has the value 2 in it. ```=DOUBLE(A4)``` Then it will return 4. But what if you select a range of cells?...

We will select 3 cells as the input: ```=DOUBLE(A4:C4)``` and the cells are 2, 4, and 5. It returns 4, 8 and 10 respectively.

To understand this function lets step thru each line.

```if (input.map) {``` - this line takes the input and says "does the map function exist?" If so then th object input is an Array, then return a call to THIS same function and run DOUBLE on every element in the array. So 2 runs thru DOUBLE and its not an array and so it runs the else part ```return input * 2``` so it returns 2 * 2 which is 4. Then it does the same for 4 and 5 until there are no more elements in the array.

![DOUBLE ARRAY]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/DOUBLE_array_final.png)

This feature in Google Functions is extremely powerful because not only can you use a function with one parameter you can use an array.  Lets look at some other examples.


## Get Web URL Links

I created a function to get all the links from any website URL.

```
/**
 * Gets all links from web page
 *
 * @param {string} input The website url
 * @return The links in a page
 * @customfunction
 */
function getWebLinks(url) {
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  var linkUrls = content.match(/href="(.*?)"/g).toString();
  var arrayLinks = linkUrls.split(',');
  return arrayLinks;
}
```
I use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions" target="_blank">Regular Expressions</a> to find all the links in the document on this line: ```var linkUrls = content.match(/href="(.*?)"/g).toString();``` and then I use the  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" target="_blank">array function split()</a> to separate every text between commas into and array called arrayLinks. Then I return the array and all the links populate one row at a time on the sheet.

_* Tip: I use <a href="http://regexr.com/" target="_blank">RegExr.com</a> to help create my Regular expressions because its a quick resource to help test out different regular expressions._

To test the function I created, I create two more functions. One called test() and the other called LogLink();
```
function LogLink(input){
   return Logger.log(input);  
}

function test() {
  var url = getWebLinks('https://developers.google.com/apps-script/guides/sheets/functions#optimization');
  url.map(LogLink);
}
```
LogLink takes in input and then uses the built-in <a href="https://developers.google.com/apps-script/reference/base/logger#logdata" target="_blank">Logger.log function</a> which prints to the log found in the code editor window from the menu View -> View Logs(ctrl+Enter).

And test function just runs the getWebLinks Function outside of the sheets window. So I select the function from the top menu dropdown.

![Function Dropdown]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/function_dropdown.png)

and then I click the Play button.

After the script runs(you can see a pop that says script running and then disappears) you can go int the Logs and view this:

![Log Window]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/logsWindow.png)

So I get this working and then I put it in the sheets window.

![WebLinksSheet]({{ site.url }}/assets/images/GoogleSheetsCustomFunction/getWebLinksPreview.png)

### Apps Script Services

Custom functions can use these services offered by Google. Some are easier to connect to than others but this is the list from <a href='https://developers.google.com/apps-script/guides/sheets/functions#using_apps_script_services' target='blank'>Google</a> that they provide.

| Supported Services  |
|:-:|
| Cache  |
| HTML  |
| JDBC  |
| Lock  |
| Maps  |
| Properties  |
| Spreadsheet  |
| URL Fetch  |
| Utilities  |
| XML  |

### Summary

Creating a custom function will give you flexibility to create whatever you want in Google Sheets and its a powerful tool to help you customize your use of Google Sheets using javascript and all its power.

* If you have any questions feel free to comment below or even contact me from any links on the sidebar.

#### References

* Gist script
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<script src="https://gist.github.com/pcast01/58177141dd9aaef6cbc58aa1790d9401.js"></script>
