import mongoose from 'mongoose'

mongoose.Promise = global.Promise
const connectDB = async () => {
  mongoose
    .set('strictQuery', true)
    .connect(process.env.CONNECTION_STRING_REMOTE!, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log('Database connection is ready...')
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

export default connectDB
