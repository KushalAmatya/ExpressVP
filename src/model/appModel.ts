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

const formUploadSchema: Schema = new Schema({
  personal: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
});

export const formUploadModel = mongoose.model("formUpload", formUploadSchema);
export const appModel = mongoose.model<IApp>("app", AppSchema);
