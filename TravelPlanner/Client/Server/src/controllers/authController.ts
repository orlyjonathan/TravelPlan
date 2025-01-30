import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel/userModel');

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

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: (error as Error).message });
      }
}

export async function login (req:Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }
};

export default { register, login };