# Website Performance Optimization portfolio project

What is this project about? 

A poorly optimized webpage was forked. The goal of this project is to optimize two pages, index.html and pizza.html and achieve a high score in Google pagespeed (https://developers.google.com/speed/pagespeed/insights/). In addition, pizza.html needs some code optimization to run animations at 60 fps. Only optimization was done in this project - content was not changed.

More info about the project can be found here https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/273584856175461/lessons/b6026387-b47c-464f-954f-2f807979a066/concepts/26045387480923. For more detailed project requirements, see https://review.udacity.com/#!/rubrics/16/view

SCORE BEFORE OPTIMIZATION:  
index.html: 27 (mobile), 29 (desktop)  
pizza.html: 36 (mobile), 30 (desktop)  

SCORE AFTER OPTIMIZATION:  
index.html: 92 (mobile), 94 (desktop)  
pizza.html: FILL ME           
          
What follows are instructions on how the optimization was done. This project was part of the Udacity Front-End Nanodegree program. 

## Optimization done on index.html

#### Javascript

* Change font download from stylesheet CDN to JS Async download using Google web-font-loader        (https://developers.google.com/fonts/docs/webfont_loader)

* Change Google analytics script to async download 

How does this help? Scripts downloaded asynchronously allows the parser to continue.
Can only be used on scripts that does not impact the render tree.
  
#### CSS

* Append "media="print"" to print.css download header.

How does this help? CSS is by default render blocking. This css file only affects print layout, and is therefore in
practice not render blocking. Adding syntax "media="print"" omits the render blocking.
  
* Minify and inline critical CSS in HTML header and move link reference to style.css to bottom of HTML page. 

How does this help? Critical CSS is needed for the browser to render the page. Before it is processed the page will remain blank,   so   by supplying the necessary resources in the initial index.html download, the browser does not to request css before first page           load.

Using a critical CSS generator (https://jonassebastianohlsson.com/criticalpathcssgenerator/),  critical CSS was inlined in a <style>     block in header. The link reference to style.css was moved to the bottom of the page

#### Inlining images
* 3 thumbnail images inlined as Base64 strings.

How does this help? Inlining images into index.html reduces file requests. A drawback is that the images can no longer be cached. 

A quick note on size of index.html. This should, if possible, be no more than 14.3 kb. Below this threshold, the time needed to download the file is 1 RTT (round-time-trip). This is due to the congestion window of TCP/IP protocol. A segment (part of file sent) is ~1430 byte. TCP sends up to 10 segments before waiting for ACK, so in total 14320 byte = 14.3 kb. In short, this means that an index.html of < 14.3kb only requires 1 RTT (assuming no segments are lost enroute). A size higher than this (or a segment loss) will require 2 RTTs.

(Index.html was 5 kb at start. This gives ~9 kb to use for CSS and image inlining before 2 RTTs are needed)

After inlining 3 thumb images, size of index.html is now 14317 bytes.

  #### GULP (used for minification)

* Install node.js
* In project docs folder, type "npm init". This will create a package.json file
* Install gulp (globally): npm install --save gulp-install
* Install gulp (locally, in working dir): npm install --global gulp-cli

##### JS minification

* Install js-uglify (npm install --save-dev gulp-uglify) (JS minification)
* Setup gulpfile.js (https://www.npmjs.com/package/gulp-uglify)
* Run gulp

##### CSS minification

* Install css-lean (npm install gulp-clean-css --save-dev)
* Setup gulpfile.js (https://www.npmjs.com/package/gulp-clean-css)
* Run gulp


## Optimization done on pizza.html

#### Reduce load time of slider

Two thing were done here:

* Reduce number of DOM calls from 3 to 1. 

This was done by making one initial request, storing it in a variable (randomPizzaContainerElement) and calling that instead of repeated DOM calls. This is a cheaper process to access than traversing through the DOM and will thus reduce load time.

* Use requestAnimationFrame for the resizing function

By calling putting the resize function inside requestAnimationFrame, this allows the browser to optimize the animation drawing job. 

As a result of these two methods, the animation load time was reduced from ~175 ms to less than 1 ms.

#### Increase scroll-rate of pizza.html

One thing were done here:

* Move static (non-changing) DOM calls outside of the loop in main.js (line 520)

This was enough to reach 60 fps when scrolling.


Web-resources used summary:

Google pagespeed: https://developers.google.com/speed/pagespeed/  
Base-64 encoding of images: https://www.base64-image.de/  
Critical CSS extractor: https://jonassebastianohlsson.com/criticalpathcssgenerator/  



