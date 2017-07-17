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