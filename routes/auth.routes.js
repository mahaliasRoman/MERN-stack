import {Router} from "express";
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Config from 'config'
import {check, validationResult} from 'express-validator'

const router = Router()

// /api/auth
router.post(
    '/register',
    [
      check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length 6 char').isLength({min: 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            res.status(400).json({message: 'That user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({massage : 'User created'})

    } catch (e) {
        res.status(500).json({ message: "Something going wrong.... try again"})
    }
})

router.post(
    '/login',
    [
        check('email','Enter your email').normalizeEmail().isEmail(),
        check('password','Enter your password').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if(!user) {
                return res.status(400).json({ message:'User is not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password, try again'})
            }

            const token = jwt.sign(
                { userId: user.id },
                Config.get('jwtSecret'),
                { expiresIn: '1h'}
            )

            res.json({ token, userId: user.id})



        } catch (e) {
            res.status(500).json({ message: "Something going wrong.... try again"})
        }
})


export default router