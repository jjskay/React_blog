import mongoose from 'mongoose';
import serverConfig from '../configs/server';

let UserSchema = new mongoose.Schema({
    _id:String,
    username:String
})

let UserMeta = mongoose.model('user', UserSchema, 'user');

export default UserMeta;