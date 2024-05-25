const path = require('path');
const fs = require('fs');
const CleanCSS = require('clean-css');
const UglifyJS = require("uglify-js");
const handlebarsHelpers = require('handlebars-helpers')();

function n(n){
  return n > 9 ? "" + n: "0" + n;
}

module.exports = {

  ...handlebarsHelpers,

  format: (date) => {
    return n(date.getUTCDate()) + '-' + n(date.getUTCMonth() + 1) + '-' + (date.getUTCFullYear());
  },

  addText: (condition, var1, var2) => {
    if (condition) {
      return var1;
    } else {
      return var2;
    }
  },

  cssmin: (file) => {
    let content = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');
    return new CleanCSS({}).minify(content).styles;
  },

  jsmin: (file) => {
    const options = {
      sourceMap: {
        filename: "all.js",
        url: "all.js.map"
      }
    };
    let uglified = UglifyJS.minify(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'), options);

    fs.mkdir(path.resolve(process.cwd(), 'public/assets/js/'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'public/assets/js/all.js.map'), uglified.map, "utf8");
    return uglified.code;
  },

  setVar: (name, value, options) => {
    options.data.root[name] = value;
  },

  setVarFromObj: (name, tag, obj, options) => {
    let posts = [];

    obj.forEach(post => {
      if(post.tags.includes(tag)){
        posts.push(post);
      }
    })

    options.data.root[name] = posts;
  }

}
