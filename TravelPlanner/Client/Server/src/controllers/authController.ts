import { Request, Response } from 'express';
import bcrypt = require('bcrypt');
import jwt from 'jwt-simple';
import User from '../model/userModel/userModel';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


export async function addUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
    
            const user = new User({ name, email, password });
            await user.save();
    
            res.status(201).json({ message: 'User added successfully' });
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Error adding user' });
        }
    }

    export async function register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
    
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
    
            await newUser.save();
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle duplicate email error
            if ((error as any).code === 11000) {
                return res.status(400).json({ error: 'Email already in use' });
            }
    
            return res.status(500).json({ error: (error as Error).message });
        }
    }
    export async function login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            // Directly attempt to authenticate without using `findOne`
            const users = await User.find({ email }); 
            if (users.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            const user = users[0]; // Assuming email is unique, take the first result
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            const token = jwt.encode({ id: user._id, email: user.email }, JWT_SECRET);
    
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

export default { addUser, register, login };