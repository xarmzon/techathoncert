import { connect } from "mongoose";

export const connectDB = async () => {
  await connect(process.env.DB_URI!);
};
