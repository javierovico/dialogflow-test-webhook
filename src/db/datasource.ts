import { DataSource, DataSourceOptions } from "typeorm";
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_SINCRONIZE,
    DB_SOCKET_PATH,
    DB_USERNAME,
    LOG_LEVEL
} from "../config";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    host: DB_HOST,
    socketPath: DB_SOCKET_PATH,
    database: DB_NAME,
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities: ['dist/**/*.entity.js'],
    // migrations: [__dirname + '/**/*.migrations{.ts,.js}'],
    migrations: ['dist/**/*.migrations.js'],
    synchronize: DB_SINCRONIZE, //DB_SINCRONIZE,
    ssl: false,
    charset: 'utf8mb4',
    logging: LOG_LEVEL,
    extra: {
        timezone: 'Z', // Establecer la zona horaria en UTC
    },
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
