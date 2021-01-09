import express,{Application} from 'express';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000)
    }

    routes(): void {

    }

    start(): void{
        this.app.listen(this.app.get("port"), () => {
            console.log("Server run on http://localhost:" + this.app.get('port'))
        })
    }
}

const server = new Server();
server.start()