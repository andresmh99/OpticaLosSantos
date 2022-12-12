"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paciente_model_1 = require("../models/paciente.model");
const pacienteRoutes = (0, express_1.Router)();
pacienteRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pacientes = yield paciente_model_1.Paciente.find();
    return res.json({
        pacientes
    });
}));
pacienteRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pacienteId = req.params.id;
        const paciente = yield paciente_model_1.Paciente.findById(pacienteId);
        if (paciente == null) {
            return res.json({
                ok: false,
                msj: "Registro NO encontrado",
            });
        }
        return res.json({
            paciente
        });
    }
    catch (error) {
        console.log(error);
    }
}));
pacienteRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const paciente = {
        nombre: data.nombre,
        run: data.run,
        correo: data.correo,
        diagnostico: data.diagnostico,
        receta: data.receta,
        fechaCita: data.fechaCita,
    };
    console.log(req.body);
    paciente_model_1.Paciente.create(paciente).then(pacienteDb => {
        console.log(pacienteDb);
        return res.json({
            ok: true,
            msj: "Registro creado correctamente",
            pacienteDb
        });
    }).catch(err => {
        console.log(err);
        return res.json({
            ok: false,
            msj: "Ocurrio un error al Registrar al paciente",
            err
        });
    });
}));
pacienteRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pacienteId = req.params.id;
        const respuesta = yield paciente_model_1.Paciente.findById(pacienteId);
        if (respuesta == null) {
            return res.json({
                status: false,
                message: 'No se a encontrado ningun registro'
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
        };
        const pacienteDb = yield paciente_model_1.Paciente.findByIdAndUpdate(pacienteId, paciente);
        return res.json({
            ok: true,
            msj: "Registro actualizado exitosamente",
            pacienteDb
        });
    }
    catch (error) {
        res.send(error);
    }
}));
pacienteRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pacienteId = req.params.id;
    const pacienteDb = yield paciente_model_1.Paciente.findByIdAndRemove(pacienteId);
    return res.json({
        ok: true,
        msj: "Registro eliminado exitosamente",
        pacienteDb
    });
}));
exports.default = pacienteRoutes;
//# sourceMappingURL=paciente.routes.js.map