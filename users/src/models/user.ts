import mongoose from 'mongoose';
import {Role} from "./role";

interface UserAttrs {
    name: string;
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    imageUrl: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: Role,
        default: Role.Writer,
        required: true
    },
    // TODO: change default url
    imageUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        required: true
    }
}, {
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User };
