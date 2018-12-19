
# Advanced table – Contentstack Field Extension

#### About this Extension
Create a table with variable rows and columns.

#### Other Documentation
- [‘Extensions’ guide](https://www.contentstack.com/docs/guide/extensions)
- [Common questions about Extensions](https://www.contentstack.com/docs/faqs#extensions)


#### Modifying Extension

To modify the extension, first, you need to clone this repo and install the dependencies. Then, edit the HTML, CSS, and JS files from the source folder, and create a build using gulp task.

To install dependencies, run the following command in the root folder:

```
npm install gulp-cli -g
npm install
```
To create a new build for the extension, run the following command (index.html):
```
gulp
```

To run source watch, run the following command:
```
gulp watch
```
To create a build without linting, run the following command:
```
gulp inline
```

### Extension Best Practices

**Code Styling**
For styling JavaScript and CSS for extension kindly use the following guide.
 - [Airbnb JavaScript Styleguide](https://github.com/airbnb/javascript)
 - [Airbnb Css Styleguide](https://github.com/airbnb/css)

**Compression**
Kindly compress the CSS and JavaScript for extension to reduce extension size and reduce extension loading time.

**Window Resizing**
 - **window.updateHeight(height)** - Call this method once you have rendered the DOM for extension and your extension doesn't require resizing after DOM has loaded.
 - **window.enableAutoResizing()** - Call this method if your extension requires resizing multiple times after DOM is initially rendered.

**SDK & Extension Development**
Kindly note the below points for using extensions SDK , extensions CSS style guide and for extension development

 - Use specific version link instead of latest version link in script and link tag for SDK and CSS to avoid breaking of extension code when a new SDK version is released
 - Use extension CSS style guide to keep extension ui consistent with Contentstack entry page ui.
 - Use minimal dependencies to keep extension code light.
 - Always pass the config using extension config parameters from extension edit or create page.
 - Use proxy server or AWS lamda function for services with CORS issues or to store sensitive credentials.