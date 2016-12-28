---
layout: single
title: Custom Windows File and Pattern Search in PowerShell script
excerpt: ""
header: 
        image: /assets/images/poshBlue.jpg
        teaser: /assets/images/poshBlue.jpg

tags: [PowerShell]

---
{{ page.date | date: '%B %d, %Y' }}

## Custom Windows Search

I recently worked on a project where I was tasked to create a custom search for a client and he wanted a specific search that would
look at 1 text file filled with windows path locations and 1 text file that has specific words to search for.

Here is the script:
{% gist 1593a0f632fa36765a100f085ea81015 %}

## Breakdown of script

The first function I found on an answer this question on [superuser.com](http://superuser.com/questions/468782/show-human-readable-file-sizes-in-the-default-powershell-ls-command)
This is used for formatting the size of files found in the script.

Format-FileSize function takes one integer that is the Length property of a file and formats it according to its size. i.e. 1KB, 1MB...
{% highlight PowerShell %}
    Function Format-FileSize() {
        Param ([int]$size)
        If     ($size -gt 1TB) {[string]::Format("{0:0.00} TB", $size / 1TB)}
        ElseIf ($size -gt 1GB) {[string]::Format("{0:0.00} GB", $size / 1GB)}
        ElseIf ($size -gt 1MB) {[string]::Format("{0:0.00} MB", $size / 1MB)}
        ElseIf ($size -gt 1KB) {[string]::Format("{0:0.00} kB", $size / 1KB)}
        ElseIf ($size -gt 0)   {[string]::Format("{0:0.00} B", $size)}
        ElseIf ($size -eq 0)   {"0 MB"}
        Else                   {""}
    }
{% endhighlight %}

## Header of the script menu

This is the opening screen for the script which shows the Powershell Version from the start and then I do a Read-Host to show this header for the script.
{% highlight PowerShell %}
$ver = $psversiontable.psversion
Write-Host "PowerShell version: $ver"
Write-Host "Script Mission: takes a list of locations to search and looks at another "
Write-Host "                list that has specific words to match and compilates a list"
Write-Host "                with information about matches found in the filename."
Write-Host "---------------------------------------------------------------------"
Write-Host " Select Folder where Locations and Patterns text files are located when prompted"

$startScript = Read-Host -Prompt 'Hit enter to continue'
{% endhighlight %}

## Browse for folder Dialog box

![BrowseForFolder]({{ site.url }}/assets/images/BrowseForFolder.png)

The next part I found some code that will open the BrowseForFolder dialog windows that allows you to navigate to the folder 
where the locations and patterns text files are located. Then it checks if both files exists if not then it exits the script.
{% highlight PowerShell %}
$application = New-Object -ComObject Shell.Application
$path = ($application.BrowseForFolder(0, 'Select root folder of new WebSite', 0)).Self.Path

if([string]::IsNullOrEmpty($path))
{
    Write-Host "Exiting script..."
    exit
}

cd $path
$locPath = $path + "\locations.txt"
$patternPath = $path + "\patterns.txt"
if(![System.IO.File]::Exists($locPath)){
    Write-Host "* Locations text file does not exist in $path.  Exiting..." -ForegroundColor Red
    Exit
}
{% endhighlight %}


## Get-ChildItem with Select-Object

The function is used when creating a new object for [Select-Object](http://ss64.com/ps/select-object.html) and the name of it is Size. The expression is going to be the function Format-FileSize and
we will pass it the Length property which is the number of bytes for the file.
{% highlight PowerShell %}
    @{Name="Size";Expression={Format-FileSize($_.Length)}}
{% endhighlight %}

## The major part of the script

I perform 2 [foreach](http://ss64.com/ps/foreach.html) loops starting with the locations text file and start with the first location then I start the next [foreach](http://ss64.com/ps/foreach.html)
thru all the patterns to search for in the first location and all its subfolders using this line:

{% highlight Powershell %}
$files = gci -Path $folder -Recurse *.*"
{% endhighlight%}

To search all recursively down the folders we must get all the files using [Get-ChildItem](http://ss64.com/ps/get-childitem.html) and using [Where-Object](http://ss64.com/ps/where-object.html).
I filter all the files out by using $_.PSIsContainer -eq $false. * If we wanted folders then this would be equal to True instead of false

The other condition is where Name property is -like "*$pattern*". * I use the star(*) character as a wildcard on both sides so we can find the pattern anywhere in the title.

I then pipe the results to [Select-Object](http://ss64.com/ps/select-object.html) to get all custom properties:

* Folder - Directory of file 
* Size - Use Format-FileSize function and pass Length of file in bytes.
* Last Modified Date - LastWriteTime of file.
* Owner - Use Get-Acl cmdlet and pass it the fullName of the file

I then pipe those results to [Format-Table -AutoSize](http://ss64.com/ps/format-table.html) and pipe that to [Out-String -Width 4096](https://poshoholic.com/2010/11/11/powershell-quick-tip-creating-wide-tables-with-powershell/) and it will be printed later to the text file.

I print the results of this in the line "$resultsFile" then I get the count of files from "$rCount = $rNumbers.Count" and then "Write-Host 'Count: $rCount'"

{% highlight Powershell %}
foreach ($folder in $folders) {
    $files = gci -Path $folder -Recurse *.*
    Write-Host "Searching folder: $folder -------------------------"
    $file = $file + "********************************************************************`r`nSearching folder: $folder`r`n********************************************************************`r`n"
    foreach ($pattern in $patterns) {
        $resultsFile  = Get-ChildItem -Recurse -Force $folder -ErrorAction SilentlyContinue | 
            Where-Object { ($_.PSIsContainer -eq $false) -and  ( $_.Name -like "*$pattern*") } |
            Select-Object @{Name="Folder";Expression={$_.Directory}},@{Name="FileName";Expression={$_.Name}} ,
            @{Name="Size";Expression={Format-FileSize($_.Length)}}, @{Name="Last Modified Date";Expression={$_.LastWriteTime}}, 
            @{Name="Owner";Expression={(Get-acl $_.FullName).Owner}} | Format-Table -AutoSize * | Out-String -Width 4096 
        $rNumbers = Get-ChildItem -Recurse -Force $folder -ErrorAction SilentlyContinue | Where-Object { ($_.PSIsContainer -eq $false) -and  ( $_.Name -like "*$pattern*") } 
        $resultsFile
        $rCount = $rNumbers.Count
        Write-Host "Count: $rCount"
        $file = $file  + "=========== Searching for $pattern ===========`r`n**Number of Files found: $rCount`r`n`r`n" + $resultsFile
    }
}
{% endhighlight %}

## Write to file

Next I write all the results for the first Pattern to the $file variable. After searching all locations I finally pipe all the results to a file in the current directory called results.txt.
{% highlight Powershell %}
$file | Out-File results.txt

Clear-Variable -name file
Clear-Variable -Name resultsFile

.\Results.txt
{% endhighlight %}

At the end of the script I clear the two variables: file and resultsFile. Then I open the Results.txt file for review.

Here are results for 2 locations with 2 search patterns: *excerpte*.jpg and *.aspx
- so all aspx files and jpg files with excerpte in the title.
{% highlight Powershell %}
********************************************************************
Searching folder: C:\Temp
********************************************************************
=========== Searching for *excerpte*.jpg ===========
**Number of Files found: 1


Folder  FileName                             Size    Last Modified Date   Owner              
------  --------                             ----    ------------------   -----              
C:\Temp DoD Pest Management DPHSexcerpte.jpg 5.86 MB 8/26/2016 4:40:11 PM Owner


=========== Searching for *.aspx ===========
**Number of Files found: 2


Folder                          FileName    Size    Last Modified Date    Owner              
------                          --------    ----    ------------------    -----              
C:\Temp\Test                    Logoff.aspx 4.62 kB 11/1/2016 12:06:41 PM Owner
C:\Temp\Test Template App\admin Logoff.aspx 4.62 kB 11/1/2016 12:06:41 PM Owner


********************************************************************
Searching folder: C:\Test
********************************************************************
=========== Searching for *excerpte*.jpg ===========
**Number of Files found: 4


Folder                       FileName             Size Last Modified Date     Owner              
------                       --------             ---- ------------------     -----              
C:\Test                      excerpte1.jpg        0 MB 12/16/2016 11:40:06 AM Owner
C:\Test                      excerpteTENS.jpg     0 MB 12/16/2016 11:47:11 AM Owner
C:\Test\level1\Level2\Level3 excerpte12.jpg       0 MB 12/16/2016 11:40:06 AM Owner
C:\Test\level1\Level2\Level3 excerpteThirteen.jpg 0 MB 12/16/2016 11:47:11 AM Owner


=========== Searching for *.aspx ===========
**Number of Files found: 0
{% endhighlight %}
