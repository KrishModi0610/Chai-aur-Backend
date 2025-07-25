import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
   watchHistory: [
      {
         type: Schema.Types.ObjectId,
         ref: "Video"
      }
   ],
   username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
   },
   fullName: {
      type: String,
      required: true,
      index: true,
      trim: true
   },
   avatar: {
      type: String, // Cloudinray Image
      required: true 
   },
   coverImage: {
      type: String,
   },
   password: {
      type: String,
      required: [true, "Password is mandatory"]
   },
   refreshToken: {
      type: String,
   }


}, {timestamps: true})

// --> Dont use arrow function as this keyword cannot be passed using arrow function
userSchema.pre("save", async function(next) {
   if(this.isModified("password"))
      this.password = bcrypt.hash(this.password, 10)
   return next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
   return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
   }
   )
}

userSchema.methods.generateRefreshToken = function() {
   return jwt.sign({
      _id: this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
   }
   )
}



export const User = mongoose.model("User", userSchema)