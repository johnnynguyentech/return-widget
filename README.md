# Return Widget

A sleek and intuitive mock return widget built with React, designed to streamline the return process for e-commerce platforms. This responsive, customizable widget guides users through return requests, allowing easy input of product details and feedback. With flexible styling options, it integrates seamlessly into any store.



## How To View The Widget

View the widget through this Firebase hosted link: https://return-widget.web.app/



## How To Embed the Widget Into Your Webpage

To add the widget to your webpage, add the following CSS link to your `<head>` tag of your HTML file.
Then include the following script at the bottom of your `<body>` tag in your HTML file.
The widget will then be rendered inside the specified `<div>` tag which you can place any where on your webpage.

Place the follow `<div>` anywhere on your webpage:

```html
<div id="widget-container"></div>
```

Add the CSS link to your `head` tag in your HTML file:
```html
<link rel="stylesheet" href="https://return-widget.web.app/static/css/main.134fe262.css">
```


Add this script at the bottom of your `<body>` tag in your HTML file. The colors, fonts, and logo are set by default but as the admin, you may change it as you please with the follow attributes:

```javascript
<script src="https://return-widget.web.app/static/js/main.3ee49a93.js"></script>
<script>
    window.renderReturnWidget('widget-container', {
      fontFamily: "Georgia, serif",
      fontSize: '14px',
      color: '#007bff',
      backgroundColor: '#383838',
      fontColor: '#ffffff',
      logo: 'https://i.imgur.com/QSlM0Zo.png'
    });
</script>
```
