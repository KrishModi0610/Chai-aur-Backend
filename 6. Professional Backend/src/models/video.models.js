import mongoose, {Schema} from "mongoose";
import aggregatePagination from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({
   videoFile: {
      type: String, // Cloudinary Url
      required: true
   }, 
   thumbnail: { // Cloudinary Url
      type: String,
      required: true
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is must"]
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
   },
   duration: {
      type: Number,
      required: true
   },
   views: {
         type: String,
         required: true, 
         default: 0
   },
   isPublished: {
      type: Boolean,
      required: true
   }
}, {timestamps: true})

videoSchema.plugin(aggregatePagination)

export const Video = mongoose.model("Video", videoSchema)