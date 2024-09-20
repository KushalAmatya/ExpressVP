import mongoose, { Schema, Document } from "mongoose";

interface IApp extends Document {
  title: string;
  description: string;
}

const AppSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const appModel = mongoose.model<IApp>("app", AppSchema);
