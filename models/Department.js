// ***** COPIED FROM 10-Ins_Instance-Method *****

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, // all set to no null b/c we dont want any empty fields
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
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
      validate: {
        len: [8],
      },
    },
  },
  {
//     // add hooks here via init() or after, see below. EX:
//     hooks: {
//       // Use the beforeCreate hook to work with data before a new instance (user) is created
//       beforeCreate: async (newUserData) => { // async arrow fcn that takes user data, below it's taking the email and chanching it to LC, then return new user data that now has a LC email
//         // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
//         newUserData.email = await newUserData.email.toLowerCase();
//         return newUserData;
//       },
//       // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
//       beforeUpdate: async (updatedUserData) => {
//         updatedUserData.email = await updatedUserData.email.toLowerCase();
//         return updatedUserData;
//       },
//     },
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'user',
    }
)

// Role.addHook('beforeCreate', async(newUserData)=>{}); // etc everything same as above. Use this way if above is too cluttered.


// Define the associations between Department, Employee and Role models:
Department.hasMany(Employee, {
  foreignKey: 'departmentId'
});

module.exports = Department;

// NOTE: FOREIGN KEYS MUST BE DEFINED IN EMPLOYEE AND ROLE TABLES!