import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient()

const register = async (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = await prisma.user.findUnique({ email_id })
    if (existingUser) {
        return res.json({ status: "Account already exists", statusCode: 401 })
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (!err) {

                const user = await prisma.user.create({
                    data: {
                        user_id: uuidv4(),
                        user_name: username,
                        email_id: email,
                        password: hash,
                        role: "user",
                    },
                })

                return res.json({
                    user_id: user.user_id,
                    status: "Account Created",
                    status_code: 200,
                })
            } else {
                return res.json({
                    status: err.message,
                    status_code: 500,
                })
            }
        });
    });
}

const adminRegister = async (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = await prisma.user.findUnique({ email_id })
    if (existingUser) {
        return res.json({ status: "Account already exists", statusCode: 401 })
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (!err) {

                const user = await prisma.user.create({
                    data: {
                        user_id: uuidv4(),
                        user_name: username,
                        email_id: email,
                        password: hash,
                        role: "admin",
                    },
                })

                return res.json({
                    user_id: user.user_id,
                    status: "Account Created",
                    status_code: 200,
                })
            } else {
                return res.json({
                    status: err.message,
                    status_code: 500,
                })
            }
        });
    });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await prisma.user.findUnique({ username })

    bcrypt.compare(password, existingUser.password, function (err, res) {
        if (res == true) {
            const token = jwt.sign({ user_id: existingUser.user_id, role: existingUser.role, username }, process.env.secretKey, { expiresIn: '1h' });
            return res.json({ status: "Login Succesfull", status_code: 200, user_id: existingUser.user_id, access_token: token })
        }
        else {
            return res.json({
                "status": "Incorrect username/password provided. Please retry",
                "status_code": 401
            })
        }
    });
}

export {
    register,
    loginUser,
    adminRegister
}