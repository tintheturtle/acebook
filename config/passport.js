import { JwtStrategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'
import User from '../models/users'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.secretOrKey

const passport = () => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user)
                    }
                    return does(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}
export default passport