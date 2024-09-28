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
    // Associate the Event model with the Venue model, with the foreign key 'venueId'.
    // This is a BelongsTo relationship, meaning one Event can only have one Venue.
    this.belongsTo(models.Venue, { foreignKey: 'venueId' });
    // Associate the Event model with the Classification model, with the foreign key 'classificationId'.
    // This is a BelongsTo relationship, meaning one Event can only have one Classification.
    this.belongsTo(models.Classification, { foreignKey: 'classificationId' });
    // Associate the Event model with the Booking model, with the foreign key 'event_id'.
    // This is a HasMany relationship, meaning one Event can have many Bookings.
    this.hasMany(models.Booking, { foreignKey: 'event_id' });
  }
}

export default Event;
