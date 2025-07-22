const mongoose = require('mongoose');
const Student = require('./models/student');
require('dotenv').config({ path: './backend/.env' });

async function createTestUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const existingUser = await Student.findOne({ username: 'bharat12' });
        if (existingUser) {
            console.log('Test user already exists');
            process.exit(0);
        }

        const newUser = new Student({
            username: 'bharat12',
            email: 'bharat12@example.com',
            password: 'Vivek@1',
            mentor: 'mentor1'
        });

        await newUser.save();
        console.log('Test user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1);
    }
}

createTestUser();
