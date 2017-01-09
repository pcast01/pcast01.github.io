---
layout: single
title: Updated-Custom Windows File and Pattern Search in PowerShell script
excerpt: ""
header: 
        image: /assets/images/poshBlue.jpg
        teaser: /assets/images/poshBlue.jpg

tags: [PowerShell]

---
{{ page.date | date: '%B %d, %Y' }}

# Custom Windows Search

I decided that I needed to start using resources around me better to write better PowerShell. So I posted the code on the [PowerShell Sub-Reddit](https://www.reddit.com/r/PowerShell/) and I got some great advice from user [Lee_Dailey](https://www.reddit.com/user/Lee_Dailey) on my post - [Custom Windows File and Pattern Search in PowerShell script](https://www.reddit.com/r/PowerShell/comments/5l6nux/custom_windows_file_and_pattern_search_in/).

Here is the updated full script:
{% gist 6f3fd24642748c2f47f15ed8c5bc39b9 %}

## Breakdown of script

I modified the first helper function for formatting the size of the file to be a cleaner function that uses a `switch` statement instead of nested ifs and also I use the [format operator](http://ss64.com/ps/syntax-f-operator.html) in PowerShell instead of .Net framework calls.

Here is the original function.
**Format-FileSize** function takes one integer that is the Length property of a file and formats it according to its size. i.e. *1KB, 1MB...*

    Function Format-FileSize() {
        Param ([int]$size)
        If     ($size -gt 1TB) {[string]::Format("{0:0.00} TB", $size / 1TB)}
        ElseIf ($size -gt 1GB) {[string]::Format("{0:0.00} GB", $size / 1GB)}
        ElseIf ($size -gt 1MB) {[string]::Format("{0:0.00} MB", $size / 1MB)}
        ElseIf ($size -gt 1KB) {[string]::Format("{0:0.00} KB", $size / 1KB)}
        ElseIf ($size -gt 0)   {[string]::Format("{0:0.00} B", $size)}
        ElseIf ($size -eq 0)   {"0 MB"}
        Else                   {""}
    }

The new Format-FileSize functions is more functional for PowerShell and cuts down the use of .Net Framework which I have found out in this process is a crutch of mine to always want to tap into my C# skills and apply it in PowerShell. First off, [Lee_Dailey](https://www.reddit.com/user/Lee_Dailey) pointed out that using an int variable type might have an error for files with big sizes so I changed the `[Int]` to `[Int64]`
He pointed out that its best to use a `Switch` Statement instead of nested Ifs and he was right.

Also instead of using

    [string]::Format("{0:0.00} MB", $size / 1MB)
    
its better to use the [PowerShell format operator](http://ss64.com/ps/syntax-f-operator.html): 

    "{0:0.00} MB" -f ($size / 1MB)


The new function Format-FileSize: 

    Function Format-FileSize {
        Param ([int64]$size)
        
        # Based on File.Length in bytes return appropriate size
        switch($size)
        {
            { $_ -gt 1TB } 
                {"{0:0.00} TB" -f ($size / 1TB); break}
            { $_ -gt 1GB } 
                {"{0:0.00} GB" -f ($size / 1GB); break}
            { $_ -gt 1MB } 
                {"{0:0.00} MB" -f ($size / 1MB); break}
            { $_ -gt 1KB } 
                {"{0:0.00} KB" -f ($size / 1KB); break}
            { $_ -gt 0 }
                {"{0:0.00} B" -f ($size); break}
            { $_ -eq 0 }
                {"0 KB"; break}
            default  
                { "0 KB" }
        }
    }

## Header of the script menu

This is the opening screen for the script which shows the PowerShell Version from the start and then I do a `Read-Host` to show this header for the script.

        $ver = $psversiontable.psversion
        Write-Host "PowerShell version: $ver"
        Write-Host "Script Mission: takes a list of locations to search and looks at another "
        Write-Host "                list that has specific words to match and compilates a list"
        Write-Host "                with information about matches found in the filename."
        Write-Host "---------------------------------------------------------------------"
        Write-Host " Select Folder where Locations and Patterns text files are located when prompted"
        
        $startScript = Read-Host -Prompt 'Hit enter to continue'
        
Here is the *updated script menu*.

        $ver = $psversiontable.psversion
        Write-Host "PowerShell version: $ver"
        Write-Host "Script Mission: Custom filename search that requires two text files, "
        Write-Host "                named locations.txt(path locations to search) and patterns.txt"
        Write-Host "                (specific word searches). Then creates small report called Results.txt file with findings."
        Write-Host "----------------------------------------------------------------------------------------------------------"
        Write-Host " Select Folder where Locations and Patterns text files are located when prompted"
        
        $startScript = Read-Host -Prompt 'Hit enter to continue'

## Browse for folder Dialog box

![BrowseForFolder]({{ site.url }}/assets/images/BrowseForFolder.png)

The next part I found some code that will open the BrowseForFolder dialog windows that allows you to navigate to the folder 
where the locations and patterns text files are located. Then it checks if both files exists if not then it exits the script.

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

*Updated part:* I changed this part of the code by separating some code by using a function, the first part of the code I kept but the `$path` variable I get at pass it to a newly created function called `Retrieve-FilesByPatternLocation`.

    # Run Search functions with path variable.
    Retrieve-FilesByPatternLocation -path $path

## The major part of the script
The original setup of the 2 `foreach` loops were at best messy and not streamlined.

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
    
The new `foreach` loops. Right away the readability is greatly improved. I changed the `$folders` variable to `$AllFolders` and the same with `$patterns` to `$AllPatterns`. I also now am not using aliases as I have learned are not the best practice to use, I since have thought that I should only be using aliases in my day to day PowerShell sessions. I reduced the number asterisks by using `("*" * 68)` I also put spaces between sets of code which I believe separates its nicely and is easy on the eyes.

This is the best part that benefited the most of this deep dive in my opinion. Before I got sloppy and was trying to get the script done fast as I was on a deadline. But because of this I ran `Get-ChildItem` twice and poor performance was had. Maybe not real bad since my script is small but I have seen a noticeable difference. I also didn't do my homework when studdying `Get-ChildItem` because if I did I would've known that there are two parameters that it takes that I was using after I piped the data. And those two are `-Folder` and `-Filter`. I was using `Where-Object { ($_.PSIsContainer -eq $false) -and  ( $_.Name -like "*$pattern*")`. I also get the count of the files found before I pipe the results to the `Select-Object`.

    # Perform recurse filter search and get file count
        $Results = Get-ChildItem -Recurse -Force $folder -ErrorAction SilentlyContinue -File -Filter "*$pattern*"
        $FilesCount = $Results.Count

foreach block

    foreach ($folder in $AllFolders) {
        # Write folder name to screen
        Write-Host "Searching folder: $folder -------------------------"
        $Message = $Message + ("*" * 68) + "`r`nSearching folder: $folder`r`n" + ("*" * 68) +"`r`n"
   
        # look for all file names with all Patterns
        foreach ($pattern in $AllPatterns) {
        
            # Perform recurse filter search and get file count
            $Results = Get-ChildItem -Recurse -Force $folder -ErrorAction SilentlyContinue -File -Filter "*$pattern*"
            $FilesCount = $Results.Count

            # Get file attributes and format them
            $Results = $Results | 
                Select-Object @{Name="Folder";Expression={$_.Directory}},
                              @{Name="FileName";Expression={$_.Name}} ,
                              @{Name="Size";Expression={Format-FileSize($_.Length)}},
                              @{Name="Last Modified Date";Expression={$_.LastWriteTime}}, 
                              @{Name="Owner";Expression={(Get-acl $_.FullName).Owner}} |
                Format-Table -AutoSize * |
                Out-String -Width 4096 

            # Print Results to screen
            $Results | Out-Host

            # Print Count of files found to screen
            Write-Host "Count: $FilesCount"

            # Add header info to results
            $Message = $Message  + ("=" * 11) + " Searching for $pattern " + ("=" * 11) + "`r`n**Number of Files found: $FilesCount`r`n`r`n" + $Results
        }
    }
    
On the `Select-Object` I separated the code to look nicer and show you all the columns I selected in a glance instead of jumbled mess.

## Write to file

Old Code:

    $file | Out-File results.txt
    
    Clear-Variable -name file
    Clear-Variable -Name resultsFile
    
    .\Results.txt

New Code:

    # Send all results information to results.txt File.
    $Message | Out-File "$Path\Results.txt"

    # Clear Variables from memory
    Clear-Variable -Name Results

    # Open Results text file in Notepad
    Notepad.exe "$Path\Results.txt"
    
Here I changed all the paths to explicitly state where everything is going instead of assuming that PowerShell is in the right directory. I also reduced the `Clear-Variable` command to one time call since I cleaned up the code earlier. If I don't clear this variable then if I run the function again it just adds to this variable and I get two sets of results in one. Finally, I explicitly call Notepad to open the Result.txt file with the Path in the call as well.

I want to thank [Lee_Dailey](https://www.reddit.com/user/Lee_Dailey) for dissecting my code and helping me to see my code thru his eyes. It was a great experience overall.