// all copied from fullstack open part 3 examples

const { response } = require('express')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
morgan.token('requestdata', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestdata', 
{ stream: process.stdout }))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

// request = all information of http request
// response = how the request is responded to

// localhost:3001/
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

// localhost:3001/api/notes 
app.get('/api/notes', (request, response) => {
    response.json(notes) // note that json here is a string and not an object
})

// localhost:3001/api/notes/id
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    // find largest id number so far 
    // and assign new id to maxId + 1
    const maxId = notes.length > 0
    // create an array that contains the id of the notes
    // Math.max() returns the max value in the array
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
    const body = request.body
    
    // note can't be empty
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content, 
      important: body.important || false, // if important is missing, default is false
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

// listen to http requests to port 3001
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)