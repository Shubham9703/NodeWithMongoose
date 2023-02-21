var sid = 'AC1241b16430d57b61f7f0b3d83ad9654b'
var auth_token= '86a17aae1845c2d19dd4a1eb148849d0'

var twilio=require('twilio')(sid,auth_token)

twilio.messages.create({
    from:"+13212958061",
    to:'+919772953851',
    body:"This is testing message"
})
.then((res)=>(console.log('message has sent')))
.catch((err)=>{
    console.log(err);
})