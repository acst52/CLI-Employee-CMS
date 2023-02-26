const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Role extends Model{
  // add instance methods here if req
}

Role.init(
  {
    // add obj & attributes here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
)

// Role.addHook('beforeCreate', async(newUserData)=>{});

// Define the associations between Department, Employee and Role models:
Role.hasMany(Employee, {
  foreignKey: 'roleId'
});

module.exports = Role;