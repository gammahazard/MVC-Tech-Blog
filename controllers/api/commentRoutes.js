// define routing, fetch comment model, only available if login session detected
// comments are under posts
const router = require('express').Router();
const { Comment } = require('../../models');
const enableAuth = require('../../utils/auth');
// post comment checking for auth
router.post('/', enableAuth, async (req,res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
// after redirect to newly created comment
        res.redirect( req.header( 'Referrer' ) );

    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;