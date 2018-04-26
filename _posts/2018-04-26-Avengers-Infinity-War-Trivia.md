---
layout: single
title: "Avengers: Infinity War Trivia"
excerpt: ""
header:
        overlay_image: /assets/images/aboutPic.jpg
tags: [Avengers, Marvel]
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript">
    function toggle_visibility(id, elem) {
       
       var e = document.getElementById(id);
       if(e.style.display == 'block') {
          e.style.display = 'none';
          elem.style.display = 'block'
       } else {
          e.style.display = 'block';
          elem.style.display = 'none'
        }
        console.log(elem);
    }

    function toggleAll(){
        var icon = document.getElementById('iconAll');
        
        var all = $('.icon.fa-toggle-off:first');
        if(all == 'undefined' || all.length === 0){
            all = $('.icon.fa-toggle-on:first');
        }
        if(all.text() === "Show"){
            all.text("Hide");
            all.removeClass("fa-toggle-off");
            all.addClass("fa-toggle-on");
            $('a:contains("Click here")').hide();
            for(x=0; x<9; x++){
                var elem = document.getElementById(x);
                if(elem != null){
                    elem.style.display = 'block'; 
                }
            }
        } else {
            all.text("Show");
            all.removeClass("fa-toggle-on");
            all.addClass("fa-toggle-off");
            $('a:contains("Click here")').show()
            for(x=0; x<9; x++){
                var elem = document.getElementById(x);
                if(elem != null){
                    elem.style.display = 'none'; 
                }
            }
        }
    }
</script>

<style>
.icon::before {
    display: inline;
    margin-right: .5em;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translate(0, 0);
}
</style>

<a href="#" onclick="toggleAll();" class="icon fa-toggle-off">Show</a><br />

1. <div>The <a href="http://marvelcinematicuniverse.wikia.com/wiki/Collector" target="_blank">Collector</a> is a mysterious hoarder of rare artifacts, plants and one or two easter eggs. Which Marvel character does he have in his vault?<br/><i class="arrow-alt-circle-right"></i><a href="#" onclick="toggle_visibility('1',this);return false;">Click here for answer</a><div id="1" style="display: none;background-color: lightblue;"><a href="http://marvel.com/universe/Howard_the_Duck" target="_blank">Howard the Duck</a></div></div>

2. <div><a href="http://marvel.com/universe/Wakanda" target="_blank">Wakanda</a> is the advanced nation in the heart of Africa and Black Panther’s homeland. What’s the material that’s helped Wakanda become so tech savvy?<br/><a href="#" onclick="toggle_visibility('2',this);return false;">Click here for answer</a><div id="2" style="display: none;background-color: lightblue;"><a href="http://marvelcinematicuniverse.wikia.com/wiki/Vibranium" target="_blank">Vibranium</a></div></div>

3. <div>What are the names of each of <a href="http://marvelcinematicuniverse.wikia.com/wiki/Infinity_Stones" target="_blank">six Infinity Stones</a>, and where are they now?<br/><a href="#" onclick="toggle_visibility(3,this);return false;">Click here for answer</a><div id="3" style="display: none;background-color: lightblue;"><b style='color:purple;'>Soul</b> - unknown, <b style='color: green;'>Space</b> - Loki has it, <b style='color: red;'>Mind</b> - on Vision's head, <b style='color: yellow;'>Reality</b> - The Collector has it, <b style='color: green;'>Power</b> - protected by the Nova Corps, <b style='color: blue;'>Time</b> - Dr Strange has it in a necklace</div></div>

4. <div>How many marvel movies are there before Avengers: Infinity War?<br/><a href="#" onclick="toggle_visibility('4',this);return false;">Click here for answer</a><div id="4" style="display: none;background-color: lightblue;">18 movies.</div></div>

5. <div>Who is Gamora's adopted father?<br/><a href="#" onclick="toggle_visibility('5',this);return false;">Click here for answer</a><div id="5" style="display: none;background-color: lightblue;"><a href="http://marvel.com/universe/Thanos" target="_blank">Thanos</a>.</div></div>

6. <div>What is the name of <a href="http://marvel.com/universe/Spider-Man_(Peter_Parker)">Spiderman's</a> new suit in Avengers: Infinity War?<br/><a href="#" onclick="toggle_visibility('6',this);return false;">Click here for answer</a><div id="6" style="display: none;background-color: lightblue;">Iron Spider.</div></div>

7. <div>Avengers: Infinity War, marks how many years Marvel Studios has created the MCU(Marvel Cinematic Universe)?<br/><a href="#" onclick="toggle_visibility('7',this);return false;">Click here for answer</a><div id="7" style="display: none;background-color: lightblue;">10.</div></div>

8. <div>How many comic book characters are confirmed to appear in Avengers: Infinity War?<br/><a href="#" onclick="toggle_visibility('8',this);return false;">Click here for answer</a><div id="8" style="display: none;background-color: lightblue;">76</div></div>