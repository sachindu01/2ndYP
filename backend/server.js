import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import inventoryReqRouter from './routes/inventoryReqRoutes.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewears

app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',inventoryReqRouter)


app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>console.log('Server Started on port: '+port))