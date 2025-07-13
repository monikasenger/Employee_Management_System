import mongoose from 'mongoose';

const connectDB = async () => {
   
        // Event listeners before connecting
        mongoose.connection.on('connected', () => console.log("Database Connected"));
      
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/employee_management`)
          
}

export default connectDB;