# Website Performance Optimization portfolio project

## Optimization done on index.html

#### Javascript

* Change font download from stylesheet CDN to JS Async download using Google web-font-loader        (https://developers.google.com/fonts/docs/webfont_loader)

* Change Google analytics script to async download 

  How does this help? Scripts downloaded asynchronously allows the parser to continue.
  Can only be used on scripts that does not impact the render tree.
  
#### CSS

* Append "media="print"" to style.css download header.

  How does this help? CSS is by default render blocking. This css file only affects print layout, and is therefore in
  practice not render blocking. Adding syntax "media="print"" omits the render blocking.


  #### GULP

  * Install node.js
  * In project docs folder, type "npm init". This will create a package.json file
  * Install gulp (globally): npm install --global gulp-cli
  
    ##### JS minification
  
    * Install js-uglify (npm install --save-dev gulp-uglify) (JS minification)
    * Setup gulpfile.js (https://www.npmjs.com/package/gulp-uglify)
    * Run gulp
    
    ##### CSS minification
    * Install css-lean (npm install gulp-clean-css --save-dev)
    * Setup gulpfile.js (https://www.npmjs.com/package/gulp-clean-css)
    * Run gulp
    
    ##### Image Compression
     
    * Go to https://developers.google.com/speed/pagespeed/insights/
    * Run web page
    * Click on "download optimized resources" and put optimized images in respective dist folders