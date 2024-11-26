import { Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { successResponse, errorResponse } from "@/utils/response"
import { 
  getProductList, 
  getProductById, 
  addProductList, 
  editProductById, 
  checkExistProduct, 
  deleteProductById 
} from '@/services/product'


export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const productList = await getProductList()

    if (!productList) {
      return errorResponse(res, StatusCodes.BAD_GATEWAY, 'Not found products.') 
        
    }
    return successResponse(res, StatusCodes.OK,'Products retrieved successfully.', { products: productList })    

  } catch (error) {
    console.log(error)
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error.')
  }  
}

export const getProductByIdHandler  = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id

    const product = await getProductById(productId)

    if (!product) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'Not found product.')      
    }
    return successResponse(res, StatusCodes.OK, 'Product retrieved successfully.', { product: product })
    
  
  } catch (error) {
    console.log(error)
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error.')
  }
}

export const addProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productList } = req.body

    if (productList.length === 0) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'Not found products.')      
    }
    await addProductList(productList)
    return successResponse(res, StatusCodes.OK, 'Added new products successfuly.', { products: productList })
    
  } catch (error) {
    console.log(error)
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error.')
  }
}

export const editProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = req.body
    const productId = req.params.id

    const existProduct = await checkExistProduct(productId)

    if (!existProduct) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'Product not found')
    }     
    await editProductById(productId, product)
    return successResponse(res, StatusCodes.OK, 'Edited product successfuly.') 
    
  } catch (error) {
    console.log(error)
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: string = req.params.id
    const existProduct = await checkExistProduct(productId)

    if (!existProduct) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'Product not found')          
    }
    await deleteProductById(productId)
    return successResponse(res, StatusCodes.OK, 'Deleted product successfuly.') 

  } catch (error) {
    console.log(error)
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  }
}