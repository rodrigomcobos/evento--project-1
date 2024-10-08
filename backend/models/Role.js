import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: 'Role',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.User);
  }
}

export default Role;
