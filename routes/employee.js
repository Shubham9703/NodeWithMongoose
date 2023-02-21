const express=require('express')
const router=express.Router();
const EmployeeController=require('../controllers/employee');
const upload=require('../middleware/upload')
const auth=require('../middleware/auth')

// router.post('/signUp',upload.single('avatar'),EmployeeController.signUp)  // For Single Image
router.post('/signUp',upload.array('avatar[]'),EmployeeController.signUp)   //  For Multiple Image
router.post('/EmployeeList',auth,EmployeeController.EmployeeList)
router.get('/list',EmployeeController.index)
router.post('/Login',EmployeeController.login)
router.post('/Payment',EmployeeController.Payment);

module.exports=router