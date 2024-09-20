import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  static attributes = {
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
  };

  static associate(models) {
    this.hasMany(models.User);
  }
}

export default Role;
