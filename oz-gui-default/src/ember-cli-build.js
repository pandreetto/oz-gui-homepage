/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var fs = require('fs');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['app/styles', 'app/styles/oneicons']
    },
    'ember-bootstrap': {
      'importBootstrapFont': true,
      'importBootstrapCSS': false
    }
  });

  // Generate app-config.json for environment that is used.
  // Currently app-config.json is always overwritten on build.
  var onedataAppConfig = {
    debug: !app.isProduction
  };
  fs.writeFile("public/app-config.json", JSON.stringify(onedataAppConfig), function(err) {
    if (err) {
      return console.error('Error on writing app-config.json: ' + err);
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import("bower_components/bind-first/release/jquery.bind-first-0.2.3.min.js");
  app.import("bower_components/jquery-mousewheel/jquery.mousewheel.min.js");
  app.import("bower_components/jquery-searchable/dist/jquery.searchable-1.1.0.min.js");

  app.import(app.bowerDirectory + '/spin.js/spin.js');

  return app.toTree();
};