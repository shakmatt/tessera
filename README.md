## Synopsis

Template provides all you need to start a new AngularJS project. In order to set up the project, use *grunt function*s and edit *Gruntfile.js*. Only app.js and main.js are present. No API's used. Only Bootstrap and font-awesome included in template.

## grunt Functions

* grunt deploy:dev
* grunt deploy:test
* grunt deploy:prod
* grunt deployopen:dev
* grunt deployopen:test
* grunt deployopen:prod
* grunt bump:pre
* grunt bump:bug
* grunt bump:minor
* grunt bump:major
* grunt serve
* grunt build
* grunt (by default will run jshint and grunt build)

## Renaming App

Use **grunt renameapp:newNameForApp**
The script will automatically define the name in the places where it must be replaced.

## Versioning

Initial version is 0.0.0. Use grunt **bump:[type]** to version up.