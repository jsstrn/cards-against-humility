const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

var tally = [0, 0, 0, 0]

io.on('connection', (socket) => {
  console.log('A player has joined the game.')
  socket.emit('tally', tally)

  socket.on('player choice', (choice) => {
    tally[choice.index] += 1
    console.log(choice.sid, choice.button, choice.answer)
    io.emit('from server', choice)
  })

  socket.on('disconnect', () => {
    console.log('Player has left the game.')
  })
})

const PORT = process.env.PORT || 8080
http.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`)
})
