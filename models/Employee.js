const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },

// References and onUpdate attributes to establish the relationship between tables:
  departmentId: {
    type: DataTypes.INTEGER, // define foreign key
    allowNull: false,
    references: {
      model: Department,
      key: 'id'
    },
    onUpdate: 'CASCADE'
  },
  roleId: {
    type: DataTypes.INTEGER, // define foreign key
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    },
    onUpdate: 'CASCADE'
  }
});

// Define the associations between Department, Employee and Role models:
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Employee.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = Employee;
