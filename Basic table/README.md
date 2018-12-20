
# Basic table – Contentstack Field Extension

#### About this Extension
Create a table with variable rows, you need to define columns in config like `{columns: ["column1", "columnn2"]}`.

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
