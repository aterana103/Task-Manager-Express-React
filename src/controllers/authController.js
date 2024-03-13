import User from '../models/user.model.js';
import {createAuthToken} from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userFound = await User.findOne({ email});
        if (userFound) return res.status(400).json(['Email already use']);
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: passwordHash,
        });

        const saveUser = newUser.save();
        const token = await createAuthToken({id: saveUser._id});
        res.cookie('token', token)
        res.status(201).json({
            username: saveUser.username,
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json(["Something went wrong"])
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFind = await User.findOne({  email });
        if (!userFind) return res.status(400).json(["User not found"]);

        const isMatch = await bcrypt.compare(password, userFind.password);
        if (!isMatch) return res.status(400).json(["Invalid credentials" ]);

        const token = await createAuthToken({id: userFind._id});
        res.cookie('token', token)

        res.status(200).json({
            username: userFind.username,
            message: "User logged in successfully" 
        });
    } catch (error) {
        res.status(500).json(["Something went wrong"])
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json(["Logged out successfully"]);
};

export const profile = async (req, res) => {
    const userFind = await User.findById(req.user.id);
    if (!userFind) return res.status(400).json(["User not found"]);
    res.status(200).json({
        username: userFind.username,
        email: userFind.email,
        message: "Welcome to your profile"
    });
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    if (!token) return res.status(401).json(["Unauthorized"]);
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json(["Unauthorized"]);
        const userFind = await User.findById(user.id);
        if (!userFind) return res.status(401).json(["Unauthorized"]);
        return res.json({
            id: userFind._id,
            username: userFind.username,
            email: userFind.email,
        });
    });
};