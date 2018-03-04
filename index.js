var fs = require('fs');
var archiver = require('archiver');


var output = fs.createWriteStream('dist.zip');
var archive = archiver('zip');

archive.on('error', function (err) {
	throw err;
});

archive.pipe(output);
archive.directory('dist/')
archive.finalize();