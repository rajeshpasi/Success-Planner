// config/db.js
import mongoose from 'mongoose'; // Mongoose library import ki

const connectDB = async () => {
  try {
    // MONGO_URI environment variable se database connection string li jayegi
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Connection successful hone par console par message
  } catch (error) {
    console.error(`Error: ${error.message}`); // Error hone par console par message
    process.exit(1); // Application ko band kar do agar database connect na ho paaye
  }
};

  export default connectDB; // connectDB function ko export kiya taaki server.js isse use kar sake