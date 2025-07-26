import express from "express" 
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

// used for Crossplatfrom Origin Resource Sharing -> Linking frontend with backend
app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials: true
}))

// json limit
app.use(express.json({limit: "16kb"}))

// url-encoded
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// static files - images, favcon
app.use(express.static("public"))

// Cookies - set and get cookies
app.use(cookieParser())

export default app;