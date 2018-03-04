const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

module.exports = bundler => {

  bundler.on('bundled', async (bundle) => {
    if (process.env.NODE_ENV === 'production') {
      const dir = path.dirname(bundle.name)

      var output = fs.createWriteStream(path.parse(dir).name + '.zip')
      var archive = archiver('zip')

      archive.on('error', err => {throw err})

      archive.pipe(output);
      archive.directory(path.parse(dir).name, false)
      archive.finalize()

      function removeFile() {
        return new Promise((resolve, reject) => {
          fs.readdir(dir, (err, files) => {
            files.forEach(file => {
              fs.unlink(path.join(dir, file), err => {console.log(err)})
              resolve(6)
            })
          })
        })
      }

      async function removeDir() {
        await removeFile()
        fs.rmdir(dir, function (err) {
          if (err) return console.error(err)
          console.log("success!")
        })
      }
      removeDir()
    }
  })
}