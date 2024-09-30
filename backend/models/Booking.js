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
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        event_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        transaction_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        event_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        event_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        event_time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        event_location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ticket_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seat_zone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        zone_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image_url: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
          defaultValue: 'confirmed',
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
    // this.belongsTo(models.Event, {
    //   foreignKey: 'event_id',
    //   targetKey: 'ticketmaster_id',
    // });
    this.hasOne(models.Payment);
  }
}

export default Booking;
