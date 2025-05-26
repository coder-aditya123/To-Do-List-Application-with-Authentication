// server/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6.0+ के बाद ये ऑप्शंस अब ज़रूरी नहीं हैं और इन्हें हटा दिया गया है
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // कनेक्शन फेल होने पर प्रोसेस को एग्जिट कर दें
    process.exit(1);
  }
};

export default connectDB;