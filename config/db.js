import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI;
  const dbName = "event-hub";
  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log(`Connected to database ${dbName}`);
  } catch (err) {
    console.log("Initial connection error", err.message);
    process.exit(1);
  }
}

mongoose.connection.on("error", (err) => {
  console.error("Connection error:", err.message);
});

export default connectDB;
