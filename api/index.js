import express from "express"
import cors from "cors"

const app  = express();
app.use(cors())
app.use(express.json())

app.get("/api/test",(req,res)=>{
    res.json("ok")
})
app.post("/api/transaction",(req,res)=>{
    res.json(req.body)

})
app.listen(4041,()=>{
    console.log("The server is running on port 4041")
})