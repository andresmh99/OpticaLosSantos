
import { Request, Response, Router } from "express";
import { Paciente } from "../models/paciente.model";


const pacienteRoutes: Router = Router();

pacienteRoutes.get('/', async (req:Request, res:Response) => {

    const pacientes = await Paciente.find();
    return res.json({
        pacientes
    });

});

pacienteRoutes.get('/:id', async (req:Request, res:Response) => {

    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findById(pacienteId);

        if (paciente == null) {
            return res.json({
                ok:false,
                msj:"Registro NO encontrado",
            })
        }

        return res.json({
            paciente
        });

    } catch (error) {
        console.log(error);
    }
});

pacienteRoutes.post('/', async (req:Request, res:Response) => {

    const data = req.body;
    const paciente = {
        nombre: data.nombre,
        run: data.run,
        correo: data.correo,
        diagnostico: data.diagnostico,
        receta: data.receta,
        fechaCita: data.fechaCita,
    }
    console.log(req.body);

    Paciente.create(paciente).then(pacienteDb =>{
        console.log(pacienteDb);
        return res.json({
            ok:true,
            msj:"Registro creado correctamente",
            pacienteDb
        });
    }).catch(err => {
        console.log(err);
        return res.json({
            ok:false,
            msj:"Ocurrio un error al Registrar al paciente",
            err 
        });
    });
});

pacienteRoutes.put('/:id', async (req:Request, res:Response) => {

    try {
        const pacienteId = req.params.id;
        const respuesta = await Paciente.findById(pacienteId);
        if(respuesta==null){
            return res.json({
                     status: false,
                     message:'No se a encontrado ningun registro'
                 });
         }
        const data = req.body;
        const paciente = {
            nombre: data.nombre,
            run: data.run,
            correo: data.correo,
            diagnostico: data.diagnostico,
            receta: data.receta,
            fechaCita: data.fechaCita,
        }
    
        const pacienteDb = await Paciente.findByIdAndUpdate(pacienteId, paciente);
    
        return res.json({
            ok:true,
            msj:"Registro actualizado exitosamente",
            pacienteDb
        });
    } catch (error) {
        res.send(error);
    }
});

pacienteRoutes.delete('/:id', async (req:Request, res:Response) => {

    const pacienteId = req.params.id;
    const pacienteDb = await Paciente.findByIdAndRemove(pacienteId);

    return res.json({
        ok:true,
        msj:"Registro eliminado exitosamente",
        pacienteDb
    })
});

export default pacienteRoutes;
