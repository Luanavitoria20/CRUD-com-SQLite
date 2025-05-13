import {PrismaClient} from "@prisma/client"
import { comparePassword, generateToken, hashPassword } from "../utils/auth.js"

const prisma = new PrismaClient()

//[GET] professor
export const getAllUsers = async (req, res)=>{
   
    try{
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch(error){
        res.status(500).json({
            mensagem:"Erro ao criar o novo usuario",
            erro:error.message
        })
    }
}

/*
//[POST]
export const Newuser = (req, res)=>{
    const {name, email} = req.body
    const novoUser ={ 
    nome: nome,
    email: email
};
    res.status(200).json(novoUser)
}
*/

//professor fez
//[POST] criar produto
export const createUser = async(req, res)=>{
    const {name,email, password} =  req.body
    try{
        //tento fazer algo aqui
        const NewUser= await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        res.status(201).json(NewUser)
    }catch (error){
     //se der erro faça isso aqui
      res.status(500).json({
        mensagem:"Erro ao criar o novo usuario",
        erro:error.message //tem que ser ingles (message)
      })
    }
}

//[PUT] atualizar
export const updateUser = async (req,res)=>{

    const id = req.params.id
    const {name, email, password} = req.body

    try{
        const updatedUser = await prisma.user.update({
            where: {id: parseInt(id)},
            data:{name, email, password}
        })
        res.status(200).json(updateUser)
    }catch(error){
        res.status(400).json({
            mensagem:"Erro ao criar o novo usuario",
            erro:error.message 
          })
    }
}

//[DELETE] remove (prof)
export const deleteUser = async (req, res)=>{

    /*await prisma.user.deleteMany({})
    res.status(404)*/

    try{
        const id = req.params.id
         await prisma.user.delete({
        where: { id: Number(id)},
    });

    res.status(204).send()
    }catch (error){
        res.status(400).json({
            mensagem:"Erro ao criar o novo usuario",
            erro:error.message 
          })
    }

}  

// EU [get]
export const getUserId = async (req, res)=>{
    const id = req.params.id
    
    try {
        const getUserId = await prisma.user.findUnique({
         
            where: {id: Number(id)},
    
        })
      res.status(200).json(getUserId)
    } catch (error) {
        res.status(400).json({
            mensagem:"Erro ao atualizar usuário",
            erro: error.message
        })
    }
}

// professor fez
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        //Criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)
        //Criar usuario de dados
        const newRegisteredUser= await prisma.user.create({
            data:{
                name:name, 
                email: email, 
                password: hashedPassword
            }
        })

        // Gerar um token JWT
        const token = generateToken(newRegisteredUser)
        
        //Manda como resposta infos do usuario criado e o token de acesso
        res.status(201).json({
            name: newRegisteredUser.name,
            email: newRegisteredUser.email,
            token: token
        })

    }catch (error)
     {
        res.status(400).json({

            erro: "Erro ao criar o usuario!",
            detalhes: error.message
        })
    }
}


export const login = async (req, res)=>{
    const {email, password} = req.body

    try{
        //1. Buscar o usuario pelo email
        const user = await prisma.user.findUnique({
            where: {email}
        }) 
        if(!user){
            return res.status(401).json({
                mensagem: "Credenciais Inválidas!"
            })
        }

        //2. Compararca senha fornecida com senha hash armazenada
        const passwordMatch = await comparePassword(
            password, user.password
        )
        if(!passwordMatch){
            return res.status(401).json({
                mensagem: "Credenciais Inválidas!"
            })
        }
        
        // 3. Gerar o token jwt
        const token = generateToken(user)

        //4. Envia como resposta o usuario e o token
        res.json({
            usuario: {hame: user.name, email: user.email},
            token
        })


    }catch(error){
        res.status(500).json({
            mensagem: 'Erro ao fazer login!',
            erro: error.message
        })
    }
}