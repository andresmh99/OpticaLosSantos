import  mongoose  from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import Server from "./classes/server";
import pacienteRoutes from "./routes/paciente.routes";
import defautRoutes from "./routes/default.routes";
import authRoutes from "./routes/auth.routes";

const server = new Server();
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
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(helmet());
//midellweres
server.app.use(morgan('dev'));
//Routes
server.app.use('/auth', authRoutes);
server.app.use('/api', defautRoutes);
server.app.use('/pacientes', pacienteRoutes);
//server.app.use('/signin', signinRoutes);
//server.app.use('/users', usersRoutes);
//Database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.QUERY_STRING_DATABASE || 'queryIvalid', (error) =>{
    if(error){
        throw error;
    }

    console.log('Base de datos Online');
});


server.Start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}` );
})

