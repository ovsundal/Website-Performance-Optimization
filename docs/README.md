# Website Performance Optimization portfolio project

What is this project about? 

A poorly optimized webpage was forked. The goal of this project is to optimize two pages, index.html and pizza.html and achieve a high score in Google pagespeed (https://developers.google.com/speed/pagespeed/insights/). Only optimization was done - content was not changed.

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
* Thumbnail images inlined as Base64 strings.

How does this help? Inlining images into index.html reduces file requests. A drawback is that the images can no longer be cached. 

A quick note on size of index.html. This should, if possible, be no more than 14.3 kb. Below this threshold, the time needed to download the file is 1 RTT (round-time-trip). This is due to congestion window of (~1430 byte). TCP sends up to 10 segments before waiting for ACK, so in total 14300 byte = 14.3 kb. In short, this means that an index.html of < 14.3kb only requires 1 RTT. 
(Index.html was 5 kb at start. This gives ~9 kb to use for CSS and image inlining) before 2 RTTs are needed.

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

