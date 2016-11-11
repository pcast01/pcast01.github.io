---
layout: single
title: Beginner's guide to Powershell
excerpt: ""
header: 
        overlay_image: /assets/images/background.jpg
tags: [Powershell]
---

> If you repeat it, Powershell it.

I like making my everyday job easier so scripting repeat things I do every day is key for me. I found that if I am typing something more than once a day I might as well create a script to automate this process. 
Some ways that I use Powershell everyday is for instance: 
__Clearing internet cache, Lookups in SQL databases, Run Stored Procedures, Connect RDP automatically, bring text into my clipboard, Search multiple text files, and the list goes on and on.__

If are familiar with the .Net Framework you can also tap into any commands available on Windows. So basically all windows machines by default have Powershell built into it. 

Currently there are 5 versions of Powershell and to check what version you have on your machine just go into Powershell and run the command $PSVersionTable and the Version is your version number of Powershell.

_*Powershell is also available in Linux._

First of all you can get to Powershell in many ways.

Using Windows 10: 
    Click Start button and start typing Powershell and you will see many different types. The best one to go start with in my opinion is Powershell ISE.

The Powershell ISE is Microsoft's Powershell default script IDE. 
![powershell ISE]({{ site.url }}/assets/images/powershellIDE.png)
The top part is for script files that you can test out your script and then get the results on the bottom. You can customize the layout any way you like. 
Next, if you are going to be creating scripts then you should set the security of Powershell to allow you to run scripts.

## First things first
If you plan on creating any scripts the first command you should execute inside Powershell is this one.
{% highlight Powershell %}
    Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
{% endhighlight %}
Powershell also allows you to use the up arrow to get the last command executed.

By default, Powershell doesn't allow outright execution of ps1 files(scripts). So you must tell Powershell that the security must allow the current user to execute scripts.

## Powershell Profiles
Each Powershell window that you open has an associated profile that is a file located in various places inside Windows.
If you type: 
{% highlight Powershell %}
    $profile
{% endhighlight %}

You will see the path and name of your profile location.
If you want you can put in this command to open your profile inside of Notepad.
{% highlight Powershell %}
    notepad $profile
{% endhighlight %}

Once in your profile file you can add powershell code to run every time you first start it. For instance, you can use the code below to get all the paths located in your System Environment variables and save them as PSDrives. 
### Profile example code
{% highlight Powershell %}
    $names = [Environment+SpecialFolder]::GetNames([Environment+SpecialFolder])

    foreach($name in $names)
    {
        if($path = [Environment]::GetFolderPath($name)){
            New-PSDrive -Name $name -PSProvider FileSystem -Root $path | Out-Null
        }
    }
{% endhighlight %}

This allows me to select a drive or location and navigate there quickly. Such as this one called desktop and it takes me directly to my desktop.
{% highlight Powershell %}
       cd desktop
{% endhighlight %}

## Basic Syntax
Wikipedia has the best interpretation/definition of Powershell.

> PowerShell (including Windows PowerShell and PowerShell Core) is a task automation and configuration management framework from Microsoft, consisting of a command-line shell and associated scripting language built on the .NET Framework.
&mdash; Wikipedia

### Variables
All variables start with a $ Dollar sign. This signifies a variable and there are several different types:

|Data Type Name|Description|
|:------------:|:---------:|
|[Array]       | Array     |
|[Bool]        | Value is TRUE or FALSE|
|[DateTime]    | Date and time|
|[Guid]        | Globally unique 32-byte identifier|
|[HashTable]|	Hash table, collection of key-value pairs|
|[Int32], [Int]| 32-bit integers|
|[PsObject]| PowerShell object|
|[Regex]| Regular expression|
|[ScriptBlock]|	PowerShell script block|
|[Single], [Float]|	Floating point number|
|[String]| String|
|[Switch]| PowerShell switch parameter|
|[TimeSpan]| Time interval|
|[XmlDocument]|	XML document|

You can create a variable with a $ dollar sign or you can put the data type first then the $ dollar sign.
{% highlight Powershell %}
       $test = "testing"
       [string]$teststring = "testing"
{% endhighlight %}
Both variables are of type string.

You can also use it like a calculator
{% highlight Powershell %}
       $count = 1
       $count += 1
       $count
       2
{% endhighlight %}

You also have access to .Net methods inside powershell.
{% highlight Powershell %}
       [Math]::pow(2,2)
       4
{% endhighlight %}
This is the Math class using the method pow which takes two integers and the first one is value and the second is the power.

This is just a quick preview of what Powershell is capable of next I want to delve into creating functions which is a great way to put tasks into one easy command to execute your scripts.
