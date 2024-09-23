// models/Venue.js
import { Model, DataTypes } from 'sequelize';

class Venue extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
        },
        city: {
          type: DataTypes.STRING,
        },
        country: {
          type: DataTypes.STRING,
        },
        ticketmaster_id: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'Venue',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Event);
  }
}

export default Venue;
