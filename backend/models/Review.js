import { Model, DataTypes } from 'sequelize';

class Review extends Model {
  static init(sequelize) {
    super.init(
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
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
        },
        comment: {
          type: DataTypes.TEXT,
        },
        title: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Review',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    // Remove the association with Event model
    // this.belongsTo(models.Event, { foreignKey: 'event_id' });
  }
}

export default Review;
