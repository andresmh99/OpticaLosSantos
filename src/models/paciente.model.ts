import  { Document, model, Schema } from "mongoose";

interface Ipaciente extends Document{
    nombre:string;
    run:string;
    correo:string;
    diagnostico:string;
    receta:string;
    fechaCita?:Date;
}

const pacienteSchema = new Schema ({
    nombre: {
        type: String, 
        required: true
    },
    run: {
        type: String, 
        required: true
    },
    correo: {
        type: String, 
        required: true
    },
    diagnostico: {
        type: String, 
        required: true
    },
    receta: {
        type: String, 
        required: true
    },
    fechaCita: {
        type: Date
    }
},
{
    timestamps:true,
    versionKey:false
});
   
export const Paciente = model<Ipaciente>('Paciente', pacienteSchema);