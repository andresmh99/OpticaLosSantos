import express, { Request, Response, Router } from "express";
import pkg from '../../package.json';

const defautRoutes = Router();
const app = express();
app.set('pkg', pkg);

defautRoutes.get('/', (req:Request,res:Response)=>{
    console.log(pkg);

    return res.json({
        ok:true,
        msj:"oli estoy online online",
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
});

export default defautRoutes;