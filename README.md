# pluralsight-gulp
This repository is used in the pluralsight course "Ajavascript Build Automation With Guls.js"

Gulp examples with some common packages like jshint and jscs.

Some interesting things:
- It uses gulp-load-plugins to automatically load gulp packages.
- It also uses a separate config file for gulp - gulp.config.js that contains some shared objects.
- Originally a callback function was used in a streamless clean-styles task to notify that the task was done.
I return the del function instead since it uses a promise in the newer versions.
- Added watch for styles changes.
- Uses gulp-plumber for handling errors

This repository also contains .jscsrs and .jshintrs files that are used by your editor like Code (if you have the right plugins) and the gulp tasks.


