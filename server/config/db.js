import mongoose from 'mongoose';

export const connectDB = async () => {
  // try {
  await mongoose.connect(process.env.MONGO_URI);
  // } catch (err) {
  //   console.error(err.message);
  //   process.exit(1);
  // }
};
