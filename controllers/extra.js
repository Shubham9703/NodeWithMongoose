const index = (req, res, next) => {
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
}
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured"
            })
        })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    employee.save()
        .then(response => {
            res.json({
                message: 'Employee successfully added'
            })

        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })

}
// **************************************************************************************
// exports.registraction = (req, res, next) => {
//   try {
//     let query = {
//       $and: [{ $or: [{ email: req.body.email }, { username: req.body.username }] }]
//     }
//     user.findOne(query, (findError, findResult) => {
//       if (findError) {
//         return res.send({ status_code: 500, message: "  Internal server error" });
//       } else if (findResult) {
//         if (findResult.email == req.body.email) {
//           return res.send({ status_code: 409, message: "email is already taken." });
//         } else if (findResult.username == req.body.username) {
//           return res.send({ status_code: 409, message: "username  is already taken." });
//         }
//       } else {
//         let otp = commonFunction.getOtp();
//         let obj = {
//           email: req.body.email,
//           username: req.body.username,
//           otp: otp,
//           otpTime: new Date().getTime(),

//         }
//         new user(obj).save((saveError, saveResult) => {
//           if (saveError) {
//             return res.send({ status_code: 500, message: " Internal server error" });
//           } else {
//             let subject = "verify your otp";
//             let text = `Hey ${obj.username},We will send you a four-digit code to your email address Please verify your otp: ${otp}`;
//             commonFunction.sendMail(obj.email, subject, text, (sendMailError, sendMailResult) => {
//               if (sendMailError) {
//                 return res.send({ status_code: 500, message: "  Internal server error" });
//               } else {
//                 let token = authJwt.generateAuthJwt({
//                   id: saveResult._id,
//                   email: saveResult.email,
//                   expires_in: env.TOKEN_EXPIRES_IN
//                 });
//                 return res.send({ success: true, status_code: 200, message: "A verifivation code is sent on your email id", result: { token: token }, time: new Date().getTime() });
//               }
//             });
//           }
//         });
//       }
//     });
//   } catch (error) {
//     res.send({ status_code: 500, message: "catch error" });
//   }
// }

// exports.verify_Otp = (req, res, next) => {
//   try {
//     let query = {
//       _id: req.id
//     }
//     user.findOne(query, (findError, findResult) => {
//       if (findError) {
//         return res.send({ status_code: 500, message: "  Internal server error" });
//       } else if (!findResult) {
//         return res.send({ status_code: 404, message: "user does't exist" });
//       } else {
//         if (findResult.otpVerify != true) {
//           let otpTimeDifference = (new Date().getTime()) - findResult.otpTime;
//           if (otpTimeDifference <= (30 * 60 * 1000)) {
//             if (findResult.otp == req.body.otp) {
//               user.findByIdAndUpdate({ _id: findResult._id }, { $set: { otpVerify: true } }, { new: true }, (updateError, updateResult) => {
//                 if (updateError) {
//                   return res.send({ status_code: 500, message: "Internal server error" });
//                 } else {
//                   let token = authJwt.generateAuthJwt({
//                     id: findResult._id,
//                     email: findResult.email,
//                     expires_in: env.TOKEN_EXPIRES_IN
//                   });
//                   return res.send({ success: true, status_code: 202, message: "Email verified successfully", result: { token: token }, time: new Date().getTime() });
//                 }
//               });
//             } else {
//               return res.send({ success: false, status_code: 401, message: "Wrong otp" })
//             }
//           } else {
//             return res.send({ success: false, status_code: 410, message: "otp expired" });
//           }
//         } else {
//           return res.send({ status_code: 409, message: "otp already verified...." });
//         }
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send({ status_code: 500, message: "catch  error" });
//   }
// }

// exports.createPassword = (req, res, next) => {
//   try {
//     let query = {
//       _id: req.id
//     }
//     user.findOne(query, (findError, findResult) => {
//       if (findError) {
//         return res.send({ status_code: 500, message: "Internal server error" });
//       } else if (findResult) {
//         let obj = {
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//           password: req.body.password,
//           confirm_password: req.body.confirm_password
//         }
//         if (obj.password == obj.confirm_password) {
//           user.findByIdAndUpdate({ _id: findResult._id }, { $set: { first_name: obj.first_name, last_name: obj.last_name, password: bcrypt.hashSync(req.body.password) } }, { new: true }, (updateError, updateResult) => {
//             if (updateError) {
//               return res.send({ status_code: 500, message: "Internal server error" });
//             } else {
//               let token = authJwt.generateAuthJwt({
//                 id: findResult._id,
//                 email: findResult.email,
//                 expires_in: env.TOKEN_EXPIRES_IN
//               });
//               return res.send({ success: true, status_code: 200, message: "user signed up successfully", result: updateResult, token, time: new Date().getTime() });
//             }
//           });
//         } else {
//           return res.send({ success: false, status_code: 500, message: "password and confirm_password does not match" })
//         }

//       }
//     });
//   } catch (error) {
//     return res.send({ status_code: 500, message: "catch  error" });
//   }

// }

// exports.resendOtp = (req, res,next) => {
//   try {
//     let query = {
//       email: req.body.email
//     }
//     user.findOne(query, (findError, findResult) => {
//       if (findError) {
//         return res.send({ status_code: 500, message: "Internal server error" });
//       } else if (!findResult) {
//         return res.send({ status_code: 403, message: "email not exist" });
//       } else {
//         let otp = commonFunction.getOtp();
//         let otpTime = new Date().getTime();
//         let subject = " verify your otp";
//         let text = `Hey ${findResult.username},We will send you a four-digit code to your email address Please verify your otp: ${otp}`;
//         commonFunction.sendMail(findResult.email, subject, text, (sendMailError, sendMailResult) => {
//           if (sendMailError) {
//             return res.send({ status_code: 500, message: "Internal server error" });
//           } else {
//             user.findByIdAndUpdate({ _id: findResult._id }, { $set: { otp: otp, otpTime: otpTime, otpVerify: false } }, { new: true }, (updateError, updateResult) => {
//               if (updateError) {
//                 return res.send({ status_code: 500, message: "Internal server error" });
//               } else {
//                 let token = authJwt.generateAuthJwt({
//                   id: findResult._id,
//                   email: findResult.email,
//                   expires_in: env.TOKEN_EXPIRES_IN
//                 });
//                 return res.send({success:true,status_code: 200, message: "A Verification code is send on your emai id", result: token, time: new Date().getTime() });
//               }
//             });
//           }
//         });
//       }
//     });
//   } catch (error) {
//     return res.send({ status_code: 500, message: "server error" });
//   }
// }
