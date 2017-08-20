# Website Performance Optimization portfolio project

This project is about improving a pre-built poorly optimized website using different optimization strategies.
Two parts of the website was the target for this project, index.html and pizza.html. Very little code was written, so most of this project can be summarized in this README file.

To view the **unoptimized** site, [click here](https://github.com/ovsundal/Website-Performance-Optimization/tree/master/src) 
and open index.html in any web-browser. 

To view the **optimized** site, [click here](https://ovsundal.github.io/Website-Performance-Optimization/)



To quantify optimization, [google pagespeed](https://developers.google.com/speed/pagespeed/) was used. Following score 
was obtained before and after optimization:

SCORE BEFORE OPTIMIZATION:  
index.html: 27 (mobile), 29 (desktop)  
pizza.html: 36 (mobile), 30 (desktop)  

SCORE AFTER OPTIMIZATION:  
index.html: 92 (mobile), 94 (desktop)  
pizza.html: 88 (mobile), 87 (desktop)        
   
The remainer of this README file are instructions on how the optimization was done. 

This project was part of the [Udacity Front-End Nanodegree program.](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001)
   
## Optimization done on index.html

#### Javascript (script downloads)

* Change the way page font is downloaded. Instead of downloading a css stylesheet, use [Google web-font-loader](https://developers.google.com/fonts/docs/webfont_loader) (async js file)
* Change Google analytics script to async download 

How does this help? Scripts downloaded asynchronously allows the DOM rendering to continue.
Can only be used on scripts that does not impact the render tree.
  
#### CSS

* Add "media="print" to print.css download header.

How does this help? CSS is by default render blocking. This css file only affects print layout, and is therefore *de facto* 
not render blocking. Adding syntax "media="print"" omits the render blocking.
  
* Minify and inline critical CSS in HTML header and move link reference to style.css to bottom of HTML page. 

How does this help? Critical CSS is needed for the browser to render the page. Before it is processed the page will remain blank,   so   by supplying the necessary resources in the initial index.html download, the browser does not to request css before first page           load.

Using a [critical CSS generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/), the necessary CSS was inlined in a <style> block in the header section. The link reference to style.css was moved to the bottom of the page

#### Inlining images
* 3 thumbnail images inlined as Base64 strings.

How does this help? Inlining images into index.html reduces file requests. A drawback is that the images can no longer be cached. 

*A quick note on size of index.html. This should, if possible, be no more than 14.3 kb. Below this threshold, the time needed to download the file is 1 RTT (round-time-trip). This is due to the congestion window of TCP/IP protocol. A segment (part of file sent) is ~1430 byte. TCP sends up to 10 segments before waiting for ACK, so in total 14320 byte = 14.3 kb. In short, this means that an index.html of < 14.3kb only requires 1 RTT (assuming no segments are lost enroute). A size higher than this (or a segment loss) will require 2 RTTs.*

(Index.html was 5 kb at start. This gives ~9 kb to use for CSS and image inlining before 2 RTTs are needed)

After inlining 3 thumb images, size of index.html is now 14317 bytes.

  #### GULP (used for minification)

* Install node.js
* In project docs folder, type "npm init". This will create a package.json file
* Install gulp (globally): npm install --save gulp-install
* Install gulp (locally, in working dir): npm install --global gulp-cli

##### JS minification

* Install js-uglify (npm install --save-dev gulp-uglify) (JS minification)
* [Setup gulpfile.js](https://www.npmjs.com/package/gulp-uglify)
* Run gulp

##### CSS minification

* Install css-lean (npm install gulp-clean-css --save-dev)
* [Setup gulpfile.js](https://www.npmjs.com/package/gulp-clean-css)
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



