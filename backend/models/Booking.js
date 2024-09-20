import { Model, DataTypes } from 'sequelize';

class Booking extends Model {
  static attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
    },
  };

  static associate(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.Event);
    this.hasOne(models.Payment);
  }
}

export default Booking;
