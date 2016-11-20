---
layout: single
title: Beginner's guide to PowerShell part 2 - Functions
excerpt: ""
header: 
        overlay_image: /assets/images/background.jpg
tags: [PowerShell]

---
{{ page.date | date: '%B %d, %Y' }}

## Functions

If you find that you are running a certain script all the time then the best thing to do is to create it as a function. But there are also other benefits to using functions.
When you create a function, the name you have for the function is now a command inside your PowerShell session.

Now I prefer using [PowerShell ISE](https://msdn.microsoft.com/en-us/powershell/scripting/getting-started/fundamental/windows-powershell-integrated-scripting-environment--ise-) when creating script because of its ease of use.

When you open PowerShell ISE the top part is the script pane and this is where you can input multiple lines of PowerShell and save them as *.ps1 files.
You can create just regular code here or you can create functions.

Here is an example of a function that opens up a text file using notepad and the location of the text file is located in C:\Test folder.
{% highlight PowerShell %}
    function Notes {
        notepad "C:\Test\notes.txt"
    }
{% endhighlight %}

When you click the play button on the top your function executes inside the code window. Once its ran then it's loaded in PowerShell for use again with just using the name of the function which is Notes.
<a href="({{ site.url }}/assets/images/PowerShellIDE_NotesFunction-min.png)" target="_blank">
![PowerShell ISE]({{ site.url }}/assets/images/PowerShellIDE_NotesFunction-min.png)</a>
[Enlarge image]({{ site.url }}/assets/images/PowerShellIDE_NotesFunction-min.png)

Now type Notes into the command window and then Notepad opens up with your document.
<a href="({{ site.url }}/assets/images/PowerShellIDE_NotesFunction3-min.png)" target="_blank">
![PowerShell ISE]({{ site.url }}/assets/images/PowerShellIDE_NotesFunction3-min.png)</a>
[Enlarge image]({{ site.url }}/assets/images/PowerShellIDE_NotesFunction3-min.png)

## Functions with parameters

The next thing to learn is [functions](http://ss64.com/ps/syntax-functions.html) with parameters and here is an example of one below.
{% highlight PowerShell %}
    function Sum {
        param(
            [int]$firstNumber,
            [int]$secondNumber
        )

        $firstNumber + $secondNumber

    }

    Sum -firstNumber 1 -secondNumber 2
    3

    Sum 1 2
    3
{% endhighlight %}
The syntax of a function is important to learn to do correctly. When declaring parameters it is crucial that you put the $ dollar sign in front of every parameter. Also you can optionally declare the type of variable and in this case I have declared both the parameters as integers.

Here is the exact same function but without declaring the type for the parameters and it achieves the same result.
{% highlight PowerShell %}
    function SumWO {
        param(
            $first,
            $second
        )

        $first + $second
    }

    SumWO -firstNumber 1 -secondNumber 2
    3

    SumWO 1 2
    3
{% endhighlight %}
The other part is you can use <a href="http://ss64.com/ps/syntax-tab-completion.html" target="_blank">Tab Completion</a> in PowerShell.

When I type sum(lowercase) I hit Tab right after and it finds my function and changes it to Sum. After that I hit spacebar then a dash. I hit Tab again and PowerShell shows me the first parameter. Then I hit spacebar again and type in the number 1. I type another dash then Tab and it gives me the second parameter, I hit spacebar again and then type 2. After all that I hit Enter and the function executes with the parameters and returns a 3 on the next line. I then type cls to clear the screen. The command <a href="http://ss64.com/nt/cls.html" target="_blank">cls</a> is an alias for [Clear-Host](http://ss64.com/ps/clear-host.html) command in PowerShell.

![PowerShell ISE]({{ site.url }}/assets/images/SumCLS.gif)

## Functions with default parameters

Functions also have a way to set parameters with default values. So say you want to create the same function we have been using but want to set both the firstNumber and secondNumber with a default value. So if you just run Sum in powershell it won't require you to put in a variable.

Currently if you run the function with no parameters then the value automatically comes back as 0.
{% highlight PowerShell %}
    function Sum {
        param(
            $first,
            $second
        )

        $first + $second
    }

    Sum
    0
{% endhighlight %}

But if we specify default values for each parameter, in this case 2 for each value. When you run the sum command now it will be equal to 4.
{% highlight PowerShell %}
    function Sum {
        param(
            $first=2,
            $second=2
        )

        $first + $second
    }

    Sum
    4
{% endhighlight %}

## Functions with Required parameters

Also to help you starting with Windows PowerShell 2.0 and above, there is a [parameter attribute](http://ss64.com/ps/syntax-args.html) you can use to require a parameter.
{% highlight PowerShell %}
[Parameter(Mandatory=$true)]
{% endhighlight %}

When you use this above your declared parameter then the function requires you to input a parameter.

In this example we have set both parameters to be mandatory.
{% highlight PowerShell %}
function Sum {
param(
    [Parameter(Mandatory=$true)]
    [int]$firstNumber,
    [Parameter(Mandatory=$true)]
    [int]$secondNumber
)

$firstNumber + $secondNumber

}
{% endhighlight %}

When we use the function now PowerShell will not let us use the function without inputting a value for each parameter.
{% highlight PowerShell %}
PS:> Sum
cmdlet Sum at command pipeline position 1
Supply values for the following parameters:
firstNumber: 
{% endhighlight %}

Then for the second number.
{% highlight PowerShell %}
PS:> Sum
cmdlet Sum at command pipeline position 1
Supply values for the following parameters:
firstNumber: 1
secondNumber: 1
{% endhighlight %}

And finally.
{% highlight PowerShell %}
PS:> Sum
cmdlet Sum at command pipeline position 1
Supply values for the following parameters:
firstNumber: 1
secondNumber: 2
3

PS:> 
{% endhighlight %}

This is just a high level view of functions and we will get into PowerShell profile next.

## PowerShell links
[PowerShell references](http://ss64.com/ps/)
