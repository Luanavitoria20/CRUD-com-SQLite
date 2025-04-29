import express from "express"
import userRoutes from "./routes/userRoutes.js"

const app = express()

/* Permite que o Express entenda
JSON no corpo da requisição*/
app.use(express.json())

/*Define o endpoint (prefixo)/userpara as rotas de usuario*/
app.use("/users", userRoutes)



export default app;