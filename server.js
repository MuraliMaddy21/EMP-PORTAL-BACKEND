const express = require("express");
const parser = require("xml2js")
const fs = require("fs");
const bodyParser = require("body-parser");
var cors = require("cors")
const {response} = require('express')
const app = express();
const X2JS = require('x2js')
const { exit } = require("process");
require('dotenv').config()
const accountSid = 'ACdbc551338855ad25fedecadf7207e3b2'; 
const authToken = process.env.AUTH; 
const client = require('twilio')(accountSid, authToken); 
const folderPath = "D:/payslip";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(cors())




app.use(bodyParser.json())

var empid;
var password;
var auth;
var otp;


app.post('/otp',function(req,res)
{
  otp=req.body.otp;
  console.log(otp);
  const message=`Hello your Login otp is ${otp}!`
   client.messages 
      .create({ 
         body: message,  
         messagingServiceSid: 'MG3b1bb34d27f2176205c43dbd554b58e0',      
         to: '+919150064160' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

      const msg = {
        to: 'muraliramboo12@gmail.com', 
        from: 'muralidharanportals@proton.me', 
        subject: 'LOGIN ATTEMPT-Reg',
        html: `Hello your Login otp is ${otp}!`,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
      

   res.send("OTP SENT SUCCESSFULLY")

})



app.post('/eplogin',function(req,res) 
{

  var result1;
    console.log(req.body.empid)
    console.log(req.body.password)
    empid = req.body.empid
    password = req.body.password

    auth={
      "eid":empid
    }
    

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_EMPLOYEEPORTAL&receiverParty=&receiverService=&interface=SI_EMP_LOGIN_MD&interfaceNamespace=http://EMPLOYEE-PORTAL-MD.com',
  'headers': {
    'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTIyODA0MzMFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMjI4MDQzMzEzWjAjBgkqhkiG9w0BCQQxFgQUKi%2FQsf7wMRRak79FJ6cK6bxty18wCQYHKoZIzjgEAwQwMC4CFQDPCrsyr%2Fgi5B2sOdSsBlg!zczQOgIVAIsA2jv!QNM9wBof9%2FnV2SZXatdS; JSESSIONID=M_qTK1mI1AjZr2jQBFhA5ZZAfQFXhQF-Y2kA_SAPzRdLtBxmIf6WgZfBnnGd3kHd; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_LOGIN_EP_MD>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <I_EMP_ID>${empid}</I_EMP_ID>\r\n         <I_PASSWORD>${password}</I_PASSWORD>\r\n      </urn:ZFM_LOGIN_EP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result1 = x2js.xml2js(response.body)
  result1 = JSON.stringify(result1)
  console.log(result1)
  var status = response.body;
  status = x2js.xml2js(status)
  console.log(status)
  status=status['Envelope']['Body']['ZFM_LOGIN_EP_MD.Response']['RETCODE']
  console.log(status)
  res.send(result1 )
  if(status == "S")
  {
    client.messages 
      .create({ 
         body: 'EMPLOYEE-PORTAL-Login Attempt Made!Login Successful!',  
         messagingServiceSid: 'MG3b1bb34d27f2176205c43dbd554b58e0',      
         to: '+919150064160' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

      const msg = {
        to: 'muraliramboo12@gmail.com', 
        from: 'muralidharanportals@proton.me', 
        subject: 'LOGIN ATTEMPT-Reg',
        text: 'EMPLOYEE-PORTAL-Login Attempt Made!Login Successful!',
        html: '<strong>EMPLOYEE-PORTAL-Login Attempt Made!Login Successful!</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
      
  }
  else{
    client.messages 
      .create({ 
         body: 'EMPLOYEE-PORTAL-Login Attempt Made!Login Failure!Check Credentials',  
         messagingServiceSid: 'MG3b1bb34d27f2176205c43dbd554b58e0',      
         to: '+919150064160' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

  const msg = {
  to: 'muraliramboo12@gmail.com', 
  from: 'muralidharanportals@proton.me', 
  subject: 'LOGIN ATTEMPT-Reg',
  text: 'EMPLOYEE-PORTAL-Login Attempt Made!Login Failure!Check Credentials',
  html: '<strong>EMPLOYEE-PORTAL-Login Attempt Made!Login Failure!Check Credentials!</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

  
  }
 
 });

})


app.get('/getauth',function(req,res)
{

 
  res.json(auth)

})



app.get('/epprofile',function(req,res) 
{
  var result2;

  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_EMPLOYEEPORTAL&receiverParty=&receiverService=&interface=SI_EMP_PROFILE_MD&interfaceNamespace=http://EMPLOYEE-PORTAL-MD.com',
  'headers': {
    'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTIyODA0MzMFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMjI4MDQzMzEzWjAjBgkqhkiG9w0BCQQxFgQUKi%2FQsf7wMRRak79FJ6cK6bxty18wCQYHKoZIzjgEAwQwMC4CFQDPCrsyr%2Fgi5B2sOdSsBlg!zczQOgIVAIsA2jv!QNM9wBof9%2FnV2SZXatdS; JSESSIONID=M_qTK1mI1AjZr2jQBFhA5ZZAfQFXhQF-Y2kA_SAPzRdLtBxmIf6WgZfBnnGd3kHd; JSESSIONMARKID=iDzWyw6meYq06gm96b1t3y7glGYGZmiXauln5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_PROFILE_EP_MD>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <I_EMP_ID>${empid}</I_EMP_ID>\r\n         <COMP_ADDRESS>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </COMP_ADDRESS>\r\n         <COMP_STRUCT>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n               <!--Optional:-->\r\n               \r\n         </COMP_STRUCT>\r\n      </urn:ZFM_PROFILE_EP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result2 = x2js.xml2js(response.body)
  result2 = JSON.stringify(result2)
  res.send(result2)
});


});


app.get('/epempleave',function(req,res)
{
  var result3;
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_EMPLOYEEPORTAL&receiverParty=&receiverService=&interface=SI_EMPLEAVE_MD&interfaceNamespace=http://EMPLOYEE-PORTAL-MD.com',
  'headers': {
    'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTIyODA0MzMFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMjI4MDQzMzEzWjAjBgkqhkiG9w0BCQQxFgQUKi%2FQsf7wMRRak79FJ6cK6bxty18wCQYHKoZIzjgEAwQwMC4CFQDPCrsyr%2Fgi5B2sOdSsBlg!zczQOgIVAIsA2jv!QNM9wBof9%2FnV2SZXatdS; JSESSIONID=M_qTK1mI1AjZr2jQBFhA5ZZAfQFXhQF-Y2kA_SAPzRdLtBxmIf6WgZfBnnGd3kHd; JSESSIONMARKID=w97oLgr7zWpVe3Rwv-N13698z-K3jW-5BxmH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_EP_EMPLEAVE_MD>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <I_EMP_ID>${empid}</I_EMP_ID>\r\n         <IT_EMPLEAVE>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </IT_EMPLEAVE>\r\n      </urn:ZFM_EP_EMPLEAVE_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result3 = x2js.xml2js(response.body)
  result3 = JSON.stringify(result3)
  res.send(result3)
});



})

app.get('/eppayslip',function(req,res)
{
  var result4;
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_EMPLOYEEPORTAL&receiverParty=&receiverService=&interface=SI_EMPPAYSLIP_MD&interfaceNamespace=http://EMPLOYEE-PORTAL-MD.com',
  'headers': {
    'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTIyODA0MzMFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMjI4MDQzMzEzWjAjBgkqhkiG9w0BCQQxFgQUKi%2FQsf7wMRRak79FJ6cK6bxty18wCQYHKoZIzjgEAwQwMC4CFQDPCrsyr%2Fgi5B2sOdSsBlg!zczQOgIVAIsA2jv!QNM9wBof9%2FnV2SZXatdS; JSESSIONID=M_qTK1mI1AjZr2jQBFhA5ZZAfQFXhQF-Y2kA_SAPzRdLtBxmIf6WgZfBnnGd3kHd; JSESSIONMARKID=w97oLgr7zWpVe3Rwv-N13698z-K3jW-5BxmH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_EP_EMPPAYSLIP_MD>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <I_EMP_ID>${empid}</I_EMP_ID>\r\n         <!--Optional:-->\r\n         <IT_PAY>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </IT_PAY>\r\n      </urn:ZFM_EP_EMPPAYSLIP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result4 = x2js.xml2js(response.body)
  result4 = JSON.stringify(result4)
  res.send(result4)
});


})

app.get('/eppayslippdf',function(req,res)
{
  var result5;
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_EMPLOYEEPORTAL&receiverParty=&receiverService=&interface=SI_EMPPAYSLIP_PDF_MD&interfaceNamespace=http://EMPLOYEE-PORTAL-MD.com&SOAPAction="http://sap.com/xi/WebService/soap1.1"&Content-Type=text/xml;charset=UTF-8',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDEwMjA5NTMFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMTAyMDk1MzQ4WjAjBgkqhkiG9w0BCQQxFgQUMTSRSEqnoD5hjBn8qEmAX5%2FRM9owCQYHKoZIzjgEAwQvMC0CFQCgdnKWLylmctkqdnaSkljbd89UBwIUSa3vb9VzD12JXFUBCZQhYkNAS%2FA%3D; JSESSIONID=JlfIj_CgrfEn4WdAVZMu5REpy-ZxhQF-Y2kA_SAP5b_zMUavZZqcwUFRR4Zgqn3k; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_EP_EMPPAYSLIP_MD_PDF>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <I_EMP_ID>${empid}</I_EMP_ID>\r\n         <!--Optional:-->\r\n         <I_PAYSLIP_VARIANT></I_PAYSLIP_VARIANT>\r\n         <I_SEQNO>0001</I_SEQNO>\r\n      </urn:ZFM_EP_EMPPAYSLIP_MD_PDF>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result5 = x2js.xml2js(response.body)
  result5 = JSON.stringify(result5)
  res.send(result5)
});


})


app.get('/shutdown',function(req,res)
{

 
  exit();


})

app.get('/pdf',function(req,res)
{

 
  res.download(folderPath+'/PAYSLIP.pdf', function(err) {
    if(err) {
        console.log(err);
    }


  })


})


app.listen(3030,()=>
{
    console.log("server listening on port 3030")
});
