const router = require('express').Router();
// fetch user and post models
const { User, Post } = require('../models');

const enableAuth = require('../utils/auth');

router.get('/', enableAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in,
            logged_name: req.session.logged_name,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
// new post route established, redirect to dashboard after
router.get('/newpost', enableAuth, (req, res) => {
    try {
        if(req.session.logged_in) {
            res.render('new-post',{
                logged_in: req.session.logged_in
            });
            return;
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json(error);
    }
    
});

// get post by id and render edit post page when clicking on post
router.get("/edit/:id", enableAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });
        const post = postData.get({ plain: true });
        res.render('edit', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;