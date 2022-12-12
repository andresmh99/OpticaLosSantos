import { Schema, model } from "mongoose";
import bcrypt  from "bcryptjs";

interface Iuser extends Document{
    username:string;
    email:string;
    password:string;
    encryptPassword(password:string):Promise<string>;
    validatePassword(password:string):Promise<boolean>;
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps:true,
  versionKey:false
});

userSchema.methods.encryptPassword = async (password:string):Promise<string>=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
userSchema.methods.validatePassword = async function (password:string):Promise<boolean>{
   return await bcrypt.compare(password, this.password);
}

export const User = model<Iuser>('User', userSchema);