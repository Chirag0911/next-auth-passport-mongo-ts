import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUserDetails } from "@/models/User";
import { comparePassword } from "@/app/utils/bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" } as {
      usernameField: string;
      passwordField: string;
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await comparePassword(
          password,
          user.password as string
        );

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser<IUserDetails>((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser<IUserDetails>((user: any, done) => {
  done(null, user);
});

export default passport;
