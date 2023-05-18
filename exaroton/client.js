import exaroton from 'exaroton';
import tokenConfig from '../config.json' assert { type: "json" };

export class ExarotonClient{
    static instance = null;

    client = null;

    constructor(){
        this.server = tokenConfig.exoratonServer;
    }

    async connect(){
        try{
            this.client = new exaroton.Client(tokenConfig.exoratonToken);
        } catch(e){
            console.log('Error while connecting to Exaroton API, retrying in 5 seconds...')
            await new Promise(resolve => setTimeout(resolve, 5000));
            await this.connect();            
        }
    }

    static async getInstance(){
        if(ExarotonClient.instance == null){
            ExarotonClient.instance = new ExarotonClient();
            await ExarotonClient.instance.connect();
        }
        return ExarotonClient.instance;
    }

}