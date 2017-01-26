---
layout: single
title: PowerShell with Microsoft Excel Macro
excerpt: ""
header: 
        image: /assets/images/poshBlack.jpg
        teaser: /assets/images/poshBlack.jpg

tags: [PowerShell]

---
{{ page.date | date: '%B %d, %Y' }}

# Create PowerShell Script to open and run Macro in Excel
Below is an example of how to use PowerShell to automatically run an Excel macro.

```powershell
Function RunExcelMacro() {
    # Open Excel file
    $excel = new-object -comobject excel.application
    $filePath = "C:\PowershellSheet.xlsm"
    $workbook = $excel.Workbooks.Open($FilePath)
    $excel.Visible = $true
    $worksheet = $workbook.worksheets.item(1)
    Write-Host "Running macro in excel to scrub data."
    $excel.Run("PowershellMacro")
    $workbook.save()
    $workbook.close()
    $excel.quit()
    Write-Host "Closed Excel"
}
```
This code calls creates a COM Excel object and then opens an Excel Macro called "PowershellMacro". After it executes the macro then we explicitly quit excel and the process closes. 

Here are some good references on how to use Excel inside of PowerShell.

Here is the xlsm file: <a href="{{site.url}}/assets/docs/PowershellSheet.xlsm" target="_blank">PowershellSheet.xlsm</a>

Here is the ps1 file:  [PowershellExcelMacro.ps1]({{ site.url }} {% /assets/docs/PowershellExcelMacro.ps1%})

* <a href="https://blogs.technet.microsoft.com/heyscriptingguy/2006/09/08/how-can-i-use-windows-powershell-to-automate-microsoft-excel/" target="_blank">Scripting guy</a> 
* <a href="http://ramblingcookiemonster.github.io/PSExcel-Intro/" target="_blank">Rambling Cookie Monster</a>
* <a href="https://posh2scripting.wordpress.com/2013/07/31/automating-excel-spreadsheets-with-powershell/" target="_blank">Posh2Scripting</a>


