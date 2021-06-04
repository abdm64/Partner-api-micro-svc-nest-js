const dbssIdErr =  {
    source: 'DBSS',
    statusCode : 400,
    Message : "Error performing the API call: Data empty! Subscriber ID can not be identified"
} 


const simCardTypeErr =  {
    source: "dte-dnbo",
    statusCode: 400,
    Message: "Profile not eligible",
    errCode: 300
  }




  module.exports ={

dbssIdErr, simCardTypeErr, 
   
       
     }
     