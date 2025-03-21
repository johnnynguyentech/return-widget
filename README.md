# Return Widget

A sleek and intuitive mock return widget built with React, designed to streamline the return process for e-commerce platforms. This responsive, customizable widget guides users through return requests, allowing easy input of product details and feedback. With flexible styling options, it integrates seamlessly into any store.



## How To View The Widget

View the widget through this Firebase hosted link: https://return-widget.web.app/



## How To Embed the Widget Into Your Webpage

To add the widget to your webpage, include the following script at the bottom of your `<body>` tag in your HTML file. The widget will then be rendered inside the specified `<div>` tag.

```html
<div id="widget-container"></div>

<script src="https://return-widget.web.app/static/js/main.70344ef0.js" defer></script>
<script>
    window.renderReturnWidget('widget-container', {
      fontFamily: "Poppins",
      fontSize: '14px',
      color: '#007bff',
      backgroundColor: '#383838',
      logo: 'path/to/logo.png'
    });
</script>
