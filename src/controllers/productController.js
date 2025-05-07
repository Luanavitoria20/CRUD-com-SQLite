import {PrismaClient} from "@prisma/client"
import e from "express"

const prisma = new PrismaClient()

//[Get]products → Lista todos os produtos.
export const getAllProducts = async (req, res) => { 
    try {
      const products = await prisma.product.findMany(); 
      res.status(200).json(products); 
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar os produtos",
        erro: error.message
      });
    }
  };

/*[POST]products → Cria um novo produto (dados no corpo da
requisição)*/
export const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
  
    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
        },
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({
        mensagem: 'Erro ao criar o novo produto',
        erro: error.message,
      });
    }
};

/*PUT /products/:id → Atualiza um produto pelo ID.*/
export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, description, price, stock } = req.body;
  
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, description, price, stock },
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({
        mensagem: 'Erro ao atualizar o produto',
        erro: error.message,
      });
    }
  };
  
/*[DELETE]products/:id → Remove um produto pelo ID*/
export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(404).json({
      mensagem: 'Produto não encontrado',
      erro: error.message,
    });
  }
};

/*[GET]products/:id → Busca um produto pelo ID.*/
