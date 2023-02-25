
// ***** COPIED FROM 10-Ins_Instance-Method *****

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// every model we create in sql extens the base model class. Normally empty.. now not:
  // instance method is a custom fcn created inside model that we can use in our API routes

class User extends Model {
  // we have table. now we create instance method: hasPets is a little function that performs 1 check: whether they have pets or not.
  // This instance method uses a conditional statement to check if a user has pets
  hasPets() {
    if (this.numberOfPets > 0) {
      return true;
    } else {
      return false;
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    numberOfPets: { // we have this field becuase we are getting this info from user (in the hasPets fcn), so it gets a field with user inputted value.
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      }, 
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
