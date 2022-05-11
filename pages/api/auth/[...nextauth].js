import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const Datastore = require("nedb-promises");
const dataStore = Datastore.create("data/users.db");

import { verifyPassword } from "../../../utils/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let user;

        try {
          user = await dataStore.findOne({ email: credentials.email });
        } catch (err) {
          res;
          throw new Error("Error retrieving user");
        }

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        return { email: user.email };
      },
    }),
  ],
});
