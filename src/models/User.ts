import mongoose, { Schema, model, models } from "mongoose";

export interface IUserDetails extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  loginType?: string;
  createdAt: Date;
  role?: string;
}

const userSchema = new Schema<IUserDetails>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  password: { type: String },
  loginType: { type: String },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "user" },
});

const User = models.User || model<IUserDetails>("User", userSchema);

export default User;
