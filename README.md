# Flashy - jQuery Lightbox & Popup Plugin

Yet another responsive jQuery lightbox and popup plugin, support images, inline contents, iframes, vimeo and youtube videos. 

[![Video](http://img.youtube.com/vi/njKeoZobbYo/0.jpg)](https://www.youtube.com/watch?v=njKeoZobbYo)

## Quick start

### Static HTML

Insert the required stylesheet at the [header](https://developer.yahoo.com/performance/rules.html#css_top) of your HTML document:

```html
<link rel="stylesheet" href="/flashy/flashy.min.css" />
```

Insert the script at the [footer](https://developer.yahoo.com/performance/rules.html#js_bottom) of your document:

```html
<script src="/jquery/jquery.js"></script>
<script src="/flashy/jquery.flashy.min.js"></script>
```

### Usage

Insert one or more links with its your own custom class

```html
<a class="gallery" href="image-big.jpg"><img src="image-small.jpg" alt="image alt"/></a>
```

Call the [plugin](https://learn.jquery.com/plugins/) function and your Flashy is ready for all the selected links.

```javascript
$(document).ready(function(){
  $('.gallery').flashy(); 
});
```

## License

Released under the MIT License
