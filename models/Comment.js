
// creating model framework and getting connection info
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// extending model
class Comment extends Model {}
// model attributes for comment model on posts
Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true,
        },
        commentary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
        user_name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            },
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    // other model options, comment is model name
    {
        sequelize, // pass connection
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment', // model name 
    }
);

module.exports = Comment;