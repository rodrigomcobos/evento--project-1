// models/Event.js
import { Model, DataTypes } from 'sequelize';

class Event extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        image_url: {
          type: DataTypes.STRING,
        },
        ticketmaster_id: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'Event',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Venue, { foreignKey: 'venueId' });
    this.belongsTo(models.Classification, { foreignKey: 'classificationId' });
    this.hasMany(models.Booking, { foreignKey: 'event_id' });
    this.hasMany(models.Review);
  }
}

export default Event;
