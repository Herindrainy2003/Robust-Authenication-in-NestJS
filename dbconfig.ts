import { User } from "src/user/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";



export const dbconfig : PostgresConnectionOptions = {
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "db",
    type: "postgres",
    entities: [User],
    synchronize : true
} 