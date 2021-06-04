let express = require('express')
const cors = require('cors')


let app = new express()

const userRoute = require('./router/user.router')
const taskRoute = require('./router/task.router')
const connectRoute = require('./router/connect.router')

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:8081'
  }))

app.use(express.static('front/dist/user-angular'))


app.use('/api/users', userRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/connect' , connectRoute)

app.get('/', (req , res)=> {
    res.send('<h1> Hello </h1>')
})

app.listen(8081);