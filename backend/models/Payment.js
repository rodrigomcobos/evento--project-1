import { Model, DataTypes } from 'sequelize';

class Payment extends Model {
  static attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    booking_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    transaction_id: {
      type: DataTypes.STRING,
    },
  };

  static associate(models) {
    this.belongsTo(models.Booking);
  }
}

export default Payment;
