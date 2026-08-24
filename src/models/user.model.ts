import mongoose, { Document } from "mongoose";

enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
};

interface IUser extends Document {
    full_name: string;
    email: string;
    password: string;
    role: Role;
    profile_image?: string;
    phone_number?: string;
};

const userSchema = new mongoose.Schema<IUser>({
    full_name: {
        type: String,
        required: [true, "full name is required"],
        minLength: [6, "full name must be at least 5 chr. long"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "user with this email already exists"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    profile_image: {
        type: String,
        default: null
    },
    phone_number: {
        type: String,
        
        default: null
    },

}, {timestamps: true});

const User = mongoose.model("user", userSchema);
export default User;