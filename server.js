const express = require("express");
const parser = require("xml2js")
const fs = require("fs");
const bodyParser = require("body-parser");
var cors = require("cors")
const {response} = require('express')
const app = express();
const X2JS = require('x2js')

app.use(cors())

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


app.use(bodyParser.json())

var empid;
var password;
var auth;



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
  res.send(result1)
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
  'url': 'https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zws_cp_md_credeb/100/zws_cp_md_credeb/zws_cp_md_credeb',
  'headers': {
    'Content-Type': 'Content-Type: application/soap+xml;charset=UTF-8;action="urn:sap-com:document:sap:rfc:functions:ZWS_CP_MD_CREDEB:ZFM_CREDIT_DEBIT_MEMO_CP_MDRequest"',
    'Authorization': 'Basic YWJhcGVyMTphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_CREDIT_DEBIT_MEMO_CP_MD>\r\n         <!--Optional:-->\r\n         <IT_CRE>\r\n            <!--Zero or more repetitions:-->\r\n         \r\n         </IT_CRE>\r\n         <!--Optional:-->\r\n         <IT_DEB>\r\n            <!--Zero or more repetitions:-->\r\n           </IT_DEB>\r\n         <I_CUS_ID>${customerid}</I_CUS_ID>\r\n      </urn:ZFM_CREDIT_DEBIT_MEMO_CP_MD>\r\n   </soap:Body>\r\n</soap:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result5 = x2js.xml2js(response.body)
  result5 = JSON.stringify(result5)
  res.send(result5)
});


})




app.listen(3030,()=>
{
    console.log("server listening on port 3030")
});
