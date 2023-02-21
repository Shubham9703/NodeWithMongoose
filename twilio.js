var sid = ''
var auth_token= ''

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
