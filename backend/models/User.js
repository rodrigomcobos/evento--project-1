import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }

  static associate(models) {
    // Define associations here
    // The User model has a BelongsTo relationship with the Role model
    // The foreign key is role_id
    this.belongsTo(models.Role, { foreignKey: 'role_id' });
    // The User model has a HasMany relationship with the Booking model
    // The foreign key is user_id
    this.hasMany(models.Booking);
    // The User model has a HasMany relationship with the Review model
    // The foreign key is user_id
    this.hasMany(models.Review);
  }
}

export default User;
