
// Requisão ->Middleware -> 
// Rota(Controllers) -> Resposta 

/*function middleware(req, res, next){
    1. Fazer algo com a requisão
     -> Validar as informações
     -> verificar se o usr tem conta
     2. Modificar a resposta
    -> dar uma resposta ao cliente
     3. Chamar o next()para passar para 
     o proximo middleware(agente)
    -> ou encessa com res.send()

}*/



export function validate (schema){
    return (req, res, next) => {
        
        try {
            /*Validar o corpo da requisição contra
            schema fornecido*/
            const validatedData = schema.parse(req.body)

           /*Substituir o body pelos dados validados*/
           req.body = validatedData

           /*Chamo o proximo agente(middleware)*/
           next()
        }catch(error){
            return res.status(400).json({
                mensagem: "Error de validação",
                erro: error.message
            })
        }    
    }   
}