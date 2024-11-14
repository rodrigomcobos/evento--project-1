import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory path for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the backend directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const connectToDB = async () => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  try {
    let sequelize;

    if (isDevelopment) {
      // Development configuration
      console.log('Initializing development database connection...');

      // Use connection string if available, otherwise use individual parameters
      if (process.env.VITE_DB_URI) {
        console.log('Using database connection string');
        sequelize = new Sequelize(process.env.VITE_DB_URI, {
          dialect: 'postgres',
          logging: false,
          define: {
            underscored: true,
            timestamps: false,
          },
        });
      } else {
        console.log('Using individual database parameters');
        sequelize = new Sequelize({
          database: process.env.VITE_DB_NAME || 'event_booking_system',
          username: process.env.VITE_DB_USER || 'rodrigocobos',
          password: process.env.VITE_DB_PASSWORD || 'brasil21',
          host: process.env.VITE_DB_HOST || 'localhost',
          port: process.env.VITE_DB_PORT || 5432,
          dialect: 'postgres',
          logging: false,
          define: {
            underscored: true,
            timestamps: false,
          },
        });
      }
    } else {
      // Production configuration for Render
      console.log('Initializing production database connection...');

      if (!process.env.DATABASE_URL) {
        throw new Error(
          'DATABASE_URL is not defined in production environment'
        );
      }

      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
        define: {
          underscored: true,
          timestamps: false,
        },
      });
    }

    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Log connection info (without sensitive data)
    console.log('Database connection details:');
    console.log('Environment:', isDevelopment ? 'Development' : 'Production');
    console.log('Host:', sequelize.config.host);
    console.log('Database:', sequelize.config.database);
    console.log('Port:', sequelize.config.port);

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Log more detailed error information
    if (error.original) {
      console.error('Original error:', {
        code: error.original.code,
        errno: error.original.errno,
        syscall: error.original.syscall,
        address: error.original.address,
        port: error.original.port,
      });
    }
    throw error;
  }
};

export { connectToDB };
