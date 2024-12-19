// Ruo Yang Jiang 261055118

import mongoose from 'mongoose'

declare module 'express-session' {
  interface SessionData {
    userId: mongoose.Types.ObjectId
  }
}
