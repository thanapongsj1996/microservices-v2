const passport = require("passport")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_KEY
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = { userId: jwt_payload.userId, role: jwt_payload.role }
      if (user) {
        return done(null, user)
      }
    } catch (error) {
      done(error)
    }
  })
)

module.exports.authenticate = passport.authenticate("jwt", { session: false })
