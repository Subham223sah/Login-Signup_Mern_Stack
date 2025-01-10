const USerModals = require("../models/UserSchema");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')



// Signup controll for signup validation
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await USerModals.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User is already exist, you can login', success: false })
        }
        const userModal = new USerModals({ name, email, password });

        userModal.password = await bcrypt.hash(password, 10);

        await userModal.save();
        res.status(200).json({
            message: "Signup Successfully",
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await USerModals.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: 'Authentication is failed email or password is invalid', success: false })
        }
        const issPassEqal = await bcrypt.compare(password, user.password);

        if (!issPassEqal) {
            return res.status(403).json({ message: "Password is Wrong", success: false })
        }

        const jwtToken = jsonwebtoken.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )

        res.status(200).json({
            message: "Login Successfully",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}


module.exports = {
    signup,
    login
};