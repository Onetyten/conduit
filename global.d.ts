// global.d.ts
import mongoose from 'mongoose';

declare global {
  interface global { // change here
    mongoose: {
      conn: mongoose.Connection | null;
      promise: Promise<mongoose.Mongoose> | null;
    };
  }
}