import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
      required: true,
    },
    dueDate: {
      type: Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
