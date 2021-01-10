import express,{Application} from 'express';
import morgan from 'morgan';
import routes from "./routes/routes";

const cors = require('cors');

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void {
        this.app.use('/api',routes)
    }

    start(): void{
        this.app.listen(this.app.get("port"), () => {
            console.log("Server run on http://localhost:" + this.app.get('port'))
        })
    }
}

const server = new Server();
server.start()