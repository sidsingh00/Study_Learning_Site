import mongoose from 'mongoose';
require('dotenv').config();

const dbURL: string = process.env.DB_URI || '';

const connectDB = async () => {
	try {
		await mongoose.connect(dbURL).then((data: any) => {
			console.log(`Database Connect with ${data.connection.host}`);
		});
	} catch (error:any) {
        setTimeout(connectDB,5000)
	}
};

export default  connectDB
