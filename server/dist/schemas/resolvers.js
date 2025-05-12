import User from "../models/User.js";
import { signToken, AuthenticationError } from "../services/auth.js";
console.log(AuthenticationError);
export const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
    Mutation: {
        addUser: async (_parent, { username, email, password, }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            const user = (await User.findOne({ email }));
            if (!user) {
                throw new AuthenticationError("No user found with this email address");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        saveBook: async (_parent, { bookData }, context) => {
            console.log(context.user);
            if (context.user) {
                return User.findByIdAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: bookData } }, { new: true, runValidators: true });
            }
            throw AuthenticationError;
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};
export default resolvers;
