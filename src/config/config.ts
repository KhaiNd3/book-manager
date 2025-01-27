import appConfig from './app.config';
import databaseConfig from './database.config';

export default () => ({
    app: appConfig(),
    database: databaseConfig(),
});
