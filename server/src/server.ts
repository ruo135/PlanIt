// Ruo Yang Jiang 261055118

import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import MongoStore from 'connect-mongo'

// Create express app
const app = express()
app.use(express.json())

// Setup cors based on node type
if (process.env.NODE_ENV === 'production')
  app.use(
    cors({
      origin: 'https://plan-it-sandy.vercel.app',
      methods: 'GET,POST,PATCH,DELETE',
      credentials: true, // Include cookies if necessary
    })
  )
else
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET,POST,PATCH,DELETE',
      credentials: true, // Include cookies if necessary
    })
  )

// Connect to mongoose
const clientP = mongoose
  .set('strictQuery', false)
  .connect(process.env.MONGO_URI as string, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })
  .then((m) => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MongoDB and listening on port ` + process.env.PORT
      )
    })
    return m.connection.getClient()
  })

// Middleware
// Print the request payload to console
app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    console.log(req.method, req.path, res.statusCode)
  })

  next()
})

// Handles login session based on node type
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  app.use(
    session({
      name: 'connect.sid',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: false,
        sameSite: 'none',
        domain: 'planit-bc9a.onrender.com',
        maxAge: 60 * 60 * 1000,
      },
      rolling: true,
      store: MongoStore.create({
        clientPromise: clientP,
        dbName: 'PlanItDB',
      }),
    })
  )
} else {
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000,
      },
      rolling: true,
      store: MongoStore.create({
        clientPromise: clientP,
        dbName: 'PlanItDB',
      }),
    })
  )
}

// Import routes from routes folder
import { requireAuth } from './middleware/auth'
import UserRoute from './routes/UserRoute'
import TagRoute from './routes/TagRoute'
import TodoRoute from './routes/TodoRoute'
import EventRoute from './routes/EventRoute'
import ThemeRoute from './routes/ThemeRoute'

// Make app use routes
app.use('/api/user', UserRoute)
app.use('/api/tag', requireAuth, TagRoute)
app.use('/api/event', requireAuth, EventRoute)
app.use('/api/todo', requireAuth, TodoRoute)
app.use('/api/theme', requireAuth, ThemeRoute)

// More Middleware

//Sets the landing page to the api docs
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the PlanIt API!</h1>
    <p>For more information, check out the <a href="https://docs.google.com/document/d/1GIYxOdDdsm5uYbpB8FaRAuf55Qzk0M4fPMpoYcl41Sg/edit?usp=sharing" target="_blank">documentation</a>.</p>
  `)
})

// Handles wrong endpoint
app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found ( ╹ -╹)?'))
})

// Handles error: used in catch block of every fct that interacts with the db
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  let errorMessage = 'An unknown error occured.'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.statusCode
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
})

// </Middleware
