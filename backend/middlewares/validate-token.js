import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        try {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken)
            jwt.verify(bearerToken, process.env.SECRET_KEY)
            next();

        } catch (error) {
            res.json('token no valido')
        }
    }else{
        res.json('Acceso denegado')
    }
};

export default validateToken
