import { DataTypes, Model } from 'sequelize';
import DBSequelize from '../../common/db/dBSequelize';

class UserClass extends Model {}

const UserDao = UserClass.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Email is not correct!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
        max: 50,
        notNull: {
          msg: 'Email is required!'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Rol is required!'
        }
      }
    }
  },
  { tableName: 'Users', sequelize: DBSequelize.getSequelize() }
);

export default UserDao;
