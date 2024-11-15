import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async () => {
  // Retrieving database configuration from environment variables
  const dbName = process.env.VITE_DB_NAME;
  const dbUser = process.env.VITE_DB_USER;
  const dbPassword = process.env.VITE_DB_PASSWORD;
  const dbHost = process.env.VITE_DB_HOST;
  const dbPort = process.env.VITE_DB_PORT;

  console.log(`Connecting to DB: ${dbName} on ${dbHost}:${dbPort}`);

  // Creating a new Sequelize instance
  const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false, // Disable SQL query logging
    define: {
      underscored: true, // Use snake_case for database column names
      timestamps: false, // Don't add timestamp fields (createdAt, updatedAt)
    },
  });

  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connected to DB successfully');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to DB:', error);
    throw error;
  }
};

export { connectToDB };
