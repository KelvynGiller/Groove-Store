const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('./db');



module.exports = (passport) => {
    passport.use(
        new localStrategy(async(username, password, done) => {
            try {
                const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
                const user = result.rows[0];
                
                if(!user) {
                    return done(null, false, { message: 'Incorrect username'});
                }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return done(null, false, { message: 'Incorrect password'});
            }

            return done(null, user);

            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, result.rows[0]);
    });
};