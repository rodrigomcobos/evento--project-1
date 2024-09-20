import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async () => {
  const dbName = process.env.VITE_DB_NAME;
  const dbUser = process.env.VITE_DB_USER;
  const dbPassword = process.env.VITE_DB_PASSWORD;
  const dbHost = process.env.VITE_DB_HOST;
  const dbPort = process.env.VITE_DB_PORT;

  console.log(`Connecting to DB: ${dbName} on ${dbHost}:${dbPort}`);

  const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true,
      timestamps: false,
    },
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to DB successfully');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to DB:', error);
    throw error;
  }
};

export { connectToDB };
