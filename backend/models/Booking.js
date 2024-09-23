// models/Booking.js
import { Model, DataTypes } from 'sequelize';

class Booking extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        status: {
          type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
          defaultValue: 'pending',
        },
        booking_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Booking',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Event, { foreignKey: 'event_id' });
    this.hasOne(models.Payment);
  }
}

export default Booking;
