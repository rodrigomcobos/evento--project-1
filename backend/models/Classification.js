// models/Classification.js
import { Model, DataTypes } from 'sequelize';

class Classification extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        segment: {
          type: DataTypes.STRING,
        },
        genre: {
          type: DataTypes.STRING,
        },
        ticketmaster_id: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'Classification',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Event);
  }
}

export default Classification;
