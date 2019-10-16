import { App } from './app';
import { dbConfig } from './config/database'
import { Project } from './domain/project.domain';

async function run() {
    dbConfig.authenticate();
    dbConfig.sync({ force: true }).then(() => {
        console.log('Drop and Resync with { force: true }');
    });
    var config = require('./config/config.json');
    const app = new App(config.server.port);
    await app.listen();
}

run();

