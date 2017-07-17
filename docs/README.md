## Website Performance Optimization portfolio project

### Optimization done on index.html

* Change font download from stylesheet CDN to JS Async download using Google web-font-loader        (https://developers.google.com/fonts/docs/webfont_loader)

* Change Google analytics script to async download 

  How does this help? Scripts downloaded asynchronously allows the parser to continue. Can only be used on scripts that does not impact the render tree.
  
