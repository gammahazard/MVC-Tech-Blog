const router = require('express').Router();
// fetch post user comment models for displaying comments on homepage
const { Post, User, Comment } = require('../models');

const enableAuth = require('../utils/auth');
// get all posts, with user id info (exclude pw)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
            attributes: { exclude: ['password'] },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        //render post on homepage w/ handlebars
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            // logged_name defined after sign on
            logged_name: req.session.logged_name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// find comment using id number, and fetch model user and comment
router.get('/posts/:id', enableAuth, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment
                },
            ],
        });
        // retrieve info for every single post
        const post = postData.get({ plain:true });
        res.render('single-post', {
            ...post,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
            logged_name: req.session.logged_name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
// render login and establish route
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//render signup if not logged in and establish route
router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


module.exports = router;