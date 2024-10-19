import jwt from 'jsonwebtoken';

export const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}