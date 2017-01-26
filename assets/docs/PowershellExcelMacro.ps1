Function RunExcelMacro() {
    # Open Excel file
    $excel = new-object -comobject excel.application
    $filePath = "C:\Users\azrae\Downloads\minimal-mistakes-master\pcast01blog\assets\docs\PowershellSheet.xlsm"
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