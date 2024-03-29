const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// calling on comment attribute, delete cascade will delete child tables containing specific user id when deleted in parent
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    /* if its post_id:null */
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});



module.exports = { User, Post, Comment };
