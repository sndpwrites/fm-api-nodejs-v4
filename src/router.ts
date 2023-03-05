import {Router} from "express"
import {body,oneOf,validationResult} from 'express-validator'
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";
const router = Router()

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct);
router.post('/product', body('name').isString(),handleInputErrors, createProduct);
router.put('/product/:id', body('name').isString(),handleInputErrors, updateProduct);
router.delete('/product/:id', deleteProduct);

router.get('/update', ()=> {});
router.get('/update/:id', ()=> {});

router.post('/update',
 body('title').optional().isString(), 
body('body').optional().isString(),
body('productId').exists().isString(),
 ()=> {});

router.put('/update/:id', 
body('title').optional().isString(), 
body('body').optional().isString(), 
// oneOf('status',[body('IN_PROGRESS'),body('SHIPPED'),body('DEPRECATED')]),
body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']), 
body('version').optional(), ()=> {});

router.delete('/update/:id', ()=> {});

router.get('/updatepoint', ()=> {});
router.get('/updatepoint/:id', ()=> {});
router.post('/updatepoint', 
body('title').optional().isString(), 
body('body').optional().isString(),
body('updateId').exists().isString(),
()=> {});
router.put('/updatepoint/:id', 
body('title').optional().isString(), 
body('body').optional().isString(),
()=> {});
router.delete('/updatepoint/:id', ()=> {});

export default router;