const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const checkQuery = `SELECT * FROM users WHERE email = ?`;

        db.get(checkQuery, [email], async (err, user) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (user) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = `
                INSERT INTO users(name, email, password, role)
                VALUES (?, ?, ?, ?)
            `;

            db.run(
                insertQuery,
                [name, email, hashedPassword, "patient"],
                function(err) {

                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.status(201).json({
                        message: "Patient registered successfully"
                    });
                }
            );
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const login = (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const query = `SELECT * FROM users WHERE email = ?`;

        db.get(query, [email], async (err, user) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                role: user.role
            });
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    register,
    login
};