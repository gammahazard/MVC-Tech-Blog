// include bcrypt to hash sensitive user info, create model and fetch connection info
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// extend model, comparesync counters timing attacks
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
// model properties
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10); //(before creationg) 10 salt rounds, hash + salt ensures hashing algorithim is no longer predictable (ie same passwords will not generate the same hashes)
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);// salted again before updating in db?
                return updatedUserData;
            },
        },
        //secondary properties of model
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user', // model name is user
    }
);

module.exports = User;