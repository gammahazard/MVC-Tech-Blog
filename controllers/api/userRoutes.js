// fetch user models
const router = require('express').Router();
const { User } = require('../../models');
// waiting for user to enter sign up credentials
router.post('/', async (req,res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            password: req.body.password,
        });
// save credentials if required, initiate logged in session.
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            //logged_name is what username will be saved as on page
            req.session.logged_name = userData.name;
            res.status(200).json(userData);
        })
    } catch (error) {
        res.status(400).json(error);
    }
});
// user already created account, entering credentials, matching with stored info, if matches initiate logged in session
router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.name } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect name or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect name or password, please try again' });
            return;
        }
        // initiates logged in session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            // logged_name can be used for personlized greeting
            req.session.logged_name = userData.name
            res.json({ user: userData, message: 'You are now logged in' });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

// logout route, only present if login session is detected
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;