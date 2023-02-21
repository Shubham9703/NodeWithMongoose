const { response } = require('express');
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const QRCode=require('qrcode')


module.exports = {
    signUp: async (req, res) => {
        try {
            Employee.findOne({ email: req.body.email }, (error, result) => {
                if (error) {
                    return res.send({ responceCode: 500, responcemessage: "internal server error" })
                } else if (result) {
                    return res.send({ responceCode: 409, responcemessae: "email already exist" })
                } else {
                    let obj = {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: bcrypt.hashSync(req.body.password),
                    }

                    // For Uploading Single Image

                    // if(req.file){
                    //     obj.avatar=req.file.path
                    // }

                    // For Multiple Image

                    if (req.files) {
                        let path = " "
                        req.files.forEach(function (files, index, arr) {
                            path = path + files.path + ','
                        })
                        path = path.substring(0, path.lastIndexOf(","))
                        obj.avatar = path
                    }


                    new Employee(obj).save((saveError, saveResult) => {
                        if (saveError) {
                            console.log(saveError);
                            return res.send({ responcecode: 500, responcemessae: "internal server error" })
                        } else {
                            return res.send({ responceCode: 200, responceMessae: "Employee Registered successully", responceresult: saveResult })
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
            return res.send({ responceCode: 500, respocemessage: "catch Error" })
        }
    },

    login: (req, res) => {
        try {
            let query = {
                $and: [{ $or: [{ phone: req.body.phone }, { email: req.body.email }] }]
            }
            Employee.findOne(query, (findError, findResult) => {
                if (findError) {
                    return res.send({ responceCode: 500, responceMessae: "Internal server error" })
                } else if (!findResult) {
                    return res.send({ responceCode: 404, responceMessage: "user doesnot exit" })
                } else {
                    let checkPassword = bcrypt.compareSync(req.body.password, findResult.password);
                    if (checkPassword) {
                        const Token = jwt.sign({ id: findResult.id }, 'the-super-strong-secrect', { expiresIn: '2h' });
                        return res.send({ responceCode: 200, responcemessage: "login Successfully", responceresult: findResult, Token: Token })
                    } else {
                        console.log("Wrong password");
                        res.json({
                            message: "Password not matched"
                        })
                    }
                }

            })
        } catch (error) {
            return res.send({ responceCode: 500, responceMessae: "Catch error" })
        }
    },


    // EmployeeList: (req, res, next) => {
    //     let employeeID = req.body.employeeID
    //     Employee.findById(employeeID)
    //         .then(response => {
    //             res.json({
    //                 response
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             res.json({
    //                 message: "An error Occured"
    //             })
    //         })
    // },


    EmployeeList: (req, res, next) => {
        let employeeID = req.id
        console.log(employeeID);
        Employee.findById(employeeID)
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                console.log(error);
                res.json({
                    message: "An error Occured"
                })
            })
    },

    index: (req, res, next) => {
        Employee.find()
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured'
                })
            })
    },

    Payment: (req, res) => {
        try {
            // let data = "upi://pay?pa=9631250801@ybl&pn=Manish%20Upadhyay&mc=0000&mode=02&purpose=00"
           let data= "Shubham111111111"
           console.log(data);
            let qr = data.toString()
            QRCode.toDataURL(qr, (qrCodeError, qrCodeResult) => {
                if (qrCodeError) {
                    return res.send({ responceCode: 500, responseMessage: "internal server error: QR code Error" })
                } else {
                    return res.send({ responceCode: 200, responseResult: "qr code generated successfully", responseResult: qrCodeResult })
                }
            })
        } catch (error) {
            return res.send({ responceCode: 500, responceMessage: "something went wrong" })
        }
    },





}
