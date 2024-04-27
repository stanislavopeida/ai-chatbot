const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const httpServer = http.createServer()

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

io.on('connection', socket => {
  socket.on('sendMessage', data => {
    socket.emit('receiveMessage', data)
  })
})

const PORT = 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})
