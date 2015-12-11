var socket = io()

var btns = []
btns[0] = document.querySelector('#btn1')
btns[1] = document.querySelector('#btn2')
btns[2] = document.querySelector('#btn3')
btns[3] = document.querySelector('#btn4')

var votes = []
votes[0] = document.querySelector('#vote1')
votes[1] = document.querySelector('#vote2')
votes[2] = document.querySelector('#vote3')
votes[3] = document.querySelector('#vote4')

btns.forEach(function (btn) {
  btn.addEventListener('click', sendToServer)
})

function sendToServer (event) {
  var btn = event.target
  console.log(btn.name)
  var choice = {
    sid: socket.id,
    button: btn.id,
    index: btn.name - 1,
    answer: btn.textContent
  }
  socket.emit('player choice', choice)
}

function incrementVote (index) {
  votes[index].textContent = Number(votes[index].textContent) + 1
}

socket.on('tally', function (tally) {
  votes.forEach( function (vote, index) {
    vote.textContent = tally[index]
  })
})

socket.on('from server', function (choice) {
  incrementVote(choice.index)
})
