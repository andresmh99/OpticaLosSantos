import { Request, Response} from "express";
import { User } from "../models/usuarios.model";
import  jwt  from "jsonwebtoken";

export const profile = async (req:Request, res:Response) => {
    const user = await User.findById(req.userId, {password:0});
    if (!user) {
        return res.status(400).json({
            ok:false,
            msj: "Usuario no encontrado"
        });
    }
    return res.json({
        ok:true,
        user
    });
};

export const signup = async (req:Request, res:Response) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    //token
    const token:string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET_KEY || 'TokenIvalid');

    return res.header('auth-token', token).json({
        ok: true,
        msj:"Usuario creado satisfactoriamente",
        savedUser
    });

};

export const signin = async (req:Request, res:Response) => {
    console.log(req.body.email)
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).json("El email o la contraseña no son correctos");
        const correctPassword: boolean = await user.validatePassword(req.body.password);
        if(!correctPassword) return res.status(400).json("El email o la contraseña no son correctos");

        const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_KEY || 'TokenIvalid', {expiresIn: 30000});

        return res.header('auth-token', token).json({
            ok: true,
            msj:"Ingreso Correcto",
            user
        });
    } catch (error) {
        console.log(error);
    }

};

