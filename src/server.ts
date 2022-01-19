import { Application, config } from '../deps.ts'
import router from './routes/posts.routes.ts'

class Server {
    private app: Application
    private port: number
    constructor() {
        this.app = new Application()
        this.port = Number(config().PORT)
        this.routes()
    }

    routes() {        
        this.app.use(router.routes())
        this.app.use(router.allowedMethods())
    }

    async listen() {
        console.log('listen at port 🚀:', this.port)
        await this.app.listen({
            port: this.port
        })
    }
}


export default Server