"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const server_1 = __importDefault(require("./classes/server"));
const paciente_routes_1 = __importDefault(require("./routes/paciente.routes"));
const default_routes_1 = __importDefault(require("./routes/default.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const server = new server_1.default();
server.app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
//Settings
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use((0, helmet_1.default)());
//midellweres
server.app.use((0, morgan_1.default)('dev'));
//Routes
server.app.use('/auth', auth_routes_1.default);
server.app.use('/api', default_routes_1.default);
server.app.use('/pacientes', paciente_routes_1.default);
//server.app.use('/signin', signinRoutes);
//server.app.use('/users', usersRoutes);
//Database
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.QUERY_STRING_DATABASE || 'queryIvalid', (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos Online');
});
server.Start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
});
//# sourceMappingURL=index.js.map