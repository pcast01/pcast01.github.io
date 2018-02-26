---
layout: single
title: Problem solving JavaScript's Reduce function - just one of many use cases to utilize Reduce
excerpt: ""
header: 

tags: [Javascript]

---
{{ page.date | date: '%B %d, %Y' }}

Problem: Use one array and [.reduce() function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

Rules: 

    * Return an object where each property is the name of the an ice cream flavor and each value is an integer that is the total count of that flavor.
    * Store the returned data in a new iceCreamTotals variable.

### Data
```javascript
const data = [
    { name: 'Superman', favoriteIceCreams: ['Strawberry', 'Vanilla', 'Chocolate', 'Cookies & Cream'] },
    { name: 'Batman', favoriteIceCreams: ['Cookies & Cream', 'Mint Chocolate Chip', 'Chocolate', 'Vanilla'] },
    { name: 'Flash', favoriteIceCreams: ['Chocolate', 'Rocky Road', 'Pistachio', 'Banana'] },
    { name: 'Aquaman', favoriteIceCreams: ['Vanilla', 'Chocolate', 'Mint Chocolate Chip'] },
    { name: 'Green Lantern', favoriteIceCreams: ['Vanilla', 'French Vanilla', 'Vanilla Bean', 'Strawberry'] },
    { name: 'Robin', favoriteIceCreams: ['Strawberry', 'Chocolate', 'Mint Chocolate Chip'] }
];
```

## Solution

```javascript
const iceCreamTotals = data.reduce((totals, superhero) => {
    superhero.favoriteIceCreams.map((iceCreamType) => {
        totals[iceCreamType] = (totals[iceCreamType] || 0) + 1;
        return iceCreamType;
    });

    return totals;
}, {});

```

How did I arrive at this solution?! I will elaborate below.

So I used [ES6(ECMAScript 6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla) reduce function which is a dip into [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming) which I have found to be great to work with and expanded my mind coming from a [Procedural Programming](https://en.wikipedia.org/wiki/Procedural_programming) background in programming. Functional Programming is unique and to wrap your brain around is difficult for me. So I in learning the 3 functional methods: [reduce, map and filter](https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464). I have learned so much and I am so grateful to have not given up on javascript because I really thought it was just a pain and a necessary evil in the past.


## Looking for help

So naturally I googled some ways to try to solve this problem and I came across this web page: [How JavaScript’s Reduce method works, when to use it, and some of the cool things it can do](https://medium.freecodecamp.org/reduce-f47a7da511a9) and it was a life saver in coming up with my solution. My eyes were opened to the many uses of the Reduce function.

Here is the code:
```javascript
const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ;
  return tally;
} , {})
count // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }
```
This is perfect for my solution since it brings back a single object and it also creates the property names along with the integer values.

The way this code works has a couple of things I didn't know about. The main one was that the Reduce function has an optional argument that it takes and its an optional value that is the initial value of what you are accumulating. 

Initial Value
```javascript
, {})
```

The last thing I didn't know about was the part of how it accumulates the tally. 

```javascript
tally[fruit] = (tally[fruit] || 0) + 1 ;
```
So breaking it down it made sense to me. So stepping through the first value(banana) in the ``` fruitbasket ```,
if ``` tally[Banana] ``` exists then take its value (which is zero at the moment) and add 1 to it. Skip ahead to the 2nd to last item in the array. Now ``` tally[Banana] ``` is equal to 1 and since it does exist then add 1 + 1 and now ``` tally[Banana] ``` is equal to 2. If you follow this logic then you can see how the reduce function was used to get the totals in the tally object.

So my problem was that I had an object that had an array inside of each property. So in order to stay inside the rules of the problem I had to get the tally of the array inside of the object using the [.map function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```javascript
superhero.favoriteIceCreams.map((iceCreamType) => {
  totals[iceCreamType] = (totals[iceCreamType] || 0) + 1;
  return iceCreamType;
});
```
the key to this working was totals Accumulator variable. I had to reference a variable outside of the map function and it works because that object lives inside the reduce function. Normally the [.map function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) returns a new array but I don't need that object I just needed to iterate through every item in the array. So all said and done I just return totals and that is all that is needed. 

```javascript
const iceCreamTotals = data.reduce((totals, superhero) => {
    ...

    return totals;
}, {});

```

I was happy knowing that I could solve this problem and hope it will help someone else who might be struggling with a similiar problem.

### Recommended links:

 * [VSCode](https://code.visualstudio.com/) for coding in javascript!
 * [Google Chrome](https://www.google.com/chrome/) quick javascript debugging.
 * [ES6 features](https://github.com/lukehoban/es6features) for a breakdown of all the ES6 features.
 * [ES6 for everyone!](http://wesbos.com/es6-for-everyone/) from Wes Bos.
 * [Understanding map, filter and reduce in Javascript](https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464) on HackerNoon.com.
 * [Get Started with Debugging JavaScript in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/) for debugging in Chrome.
