var api        = require('glslify-api')('./.cache')
var http       = require('http')
var fs         = require('fs')
var Readable = require('stream').Readable

var port = process.env.PORT || 9006

http.createServer(function(req, res) {
  // index.html
  if (req.url === '/') {
    res.setHeader('content-type', 'application/json')
    var s = new Readable()
    s.push('{"glslify": true}')
    s.push(null)
    return s.pipe(res)
  }

  // API routes
  api(req, res, function(err) {
    if (err) {
      res.statusCode = 500
      res.end([err.message, err.stack].join('\n'))
    } else {
      res.statusCode = 404
      res.end('404')
    }
  })
}).listen(port, function(err) {
  if (err) throw err
  console.log('http://localhost:' + port)
})