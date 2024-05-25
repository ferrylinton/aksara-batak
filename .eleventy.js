const fs = require('fs');
const transforms = require('./src/config/transforms');
const handlebars = require('handlebars');
const handlebarsHelpers = require('./src/config/handlebars-helpers');

module.exports = function (config) {

  config.addWatchTarget("./src/");
  config.addWatchTarget("./eleventy.js");

  config.addPassthroughCopy({ "./src/assets/fonts": "./assets/fonts" });
  config.addPassthroughCopy({ "./src/assets/images": "./assets/images" });
  config.addPassthroughCopy({ "./src/favicon.ico": "./favicon.ico" });

  // Use handlebars
  config.setLibrary('hbs', handlebars);

  // Transforms
  Object.keys(transforms).forEach((key) => {
    config.addTransform(key, transforms[key])
  })

  // Install handlebars helpers
  Object.keys(handlebarsHelpers).forEach((key) => {
    config.addHandlebarsHelper(key, handlebarsHelpers[key])
  });

  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('public/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: ['hbs'],
    htmlTemplateEngine: 'hbs',
    passthroughFileCopy: true,
    dir: {
      input: './src/pages',
      includes: '../includes',
      layouts: '../layouts',
      data: '../data',
      output: './public'
    }
  }
}
