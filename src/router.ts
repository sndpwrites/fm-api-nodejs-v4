import {Router} from "express"
import {body,oneOf,validationResult} from 'express-validator'
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";
const router = Router()

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct);
router.post('/product', body('name').isString(),handleInputErrors, createProduct);
router.put('/product/:id', body('name').isString(),handleInputErrors, updateProduct);
router.delete('/product/:id', deleteProduct);

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);

router.post('/update',
 body('title').optional().isString(), 
body('body').optional().isString(),
body('productId').exists().isString(),
 createUpdate);

router.put('/update/:id', 
body('title').optional().isString(), 
body('body').optional().isString(), 
// oneOf('status',[body('IN_PROGRESS'),body('SHIPPED'),body('DEPRECATED')]),
body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(), 
body('version').optional(), updateUpdate);

router.delete('/update/:id', deleteUpdate);

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

router.use((err, req, res, next) => {
console.log(err)
res.json({message: 'in router handler'})
})
export default router;