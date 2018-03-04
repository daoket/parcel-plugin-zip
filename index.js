const fs = require('fs')
const path = require('path')
var fsextra = require('fs-extra')
const archiver = require('archiver')

module.exports = bundler => {

  bundler.on('bundled', async (bundle) => {
    if (process.env.NODE_ENV === 'production') {
      const dir = path.dirname(bundle.name)

      function zipFile() {
        return new Promise(resolve => {
          var output = fs.createWriteStream(path.parse(dir).name + '.zip')
          var archive = archiver('zip')

          archive.on('error', err => { throw err })
          output.on('close', function () {
            resolve('Data has been close')
          })

          archive.pipe(output);
          archive.directory(path.parse(dir).name, false)
          archive.finalize()
        })
      }
      async function removeDir() {
        await zipFile()
        fsextra.remove(dir, function (err) {
          if (err) return console.error(err)
          console.log("success!")
        })
      }
      removeDir()
    }
  })
}