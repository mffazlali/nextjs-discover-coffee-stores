

import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const connectDB = (handler:(req: NextApiRequest, res: NextApiResponse)=>any) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler;
  }
  // Use new db connection
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

  return handler;
};

export default connectDB;
