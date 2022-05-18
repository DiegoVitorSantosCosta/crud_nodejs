const AppError = require('../../erros/AppError');
const { verify, Secret } = require('jsonwebtoken');
const authConfig = require('../../../config/auth');
module.exports = {
    isAuthenticated(request, response, next) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError('Token não informado', 401);
        }
        try {
            const decodedToken = verify(authHeader, authConfig.jwt.secret);
            request.user = {
                id: decodedToken.sub,
                expiresIn: decodedToken.exp
            };

            return next();
        } catch {
            throw new AppError('Invalid JWT Token.');
        }
    }
}