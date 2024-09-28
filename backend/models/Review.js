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
        timestamps: true, // this will add createdAt and updatedAt fields
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Review;
