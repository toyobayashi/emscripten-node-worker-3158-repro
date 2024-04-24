const { Worker, isMainThread } = require('worker_threads')

if (isMainThread) {
  console.log(`node version: ${process.versions.node}`)
  new Worker(__filename)
} else {
  const init = require('./out/lib.js')
  init(/* {
    locateFile (path, scriptDirectory) {
      const defaultResult = scriptDirectory + path

      // emscripten 3.1.58 bug introduced by
      // https://github.com/emscripten-core/emscripten/pull/21701
      if (!require('fs').existsSync(defaultResult)) {
        const overwrite = require('path').join(__dirname, 'out', path)
        return overwrite
      }

      return defaultResult
    }
  } */).then(Module => {
    console.log(Module._add_int_thread())
  })
}
