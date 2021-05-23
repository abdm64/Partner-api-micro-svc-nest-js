const axiosOne = require('axios')
const errors = require('../Helpers/errors')
const https = require('https')
const axios = axiosOne.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });



  exports.getDbssInfo =  async (msisdn) => {

    let dbssInfo = {};
    const DBSS_API_SUBS = process.env.DBSS_API+'/api/v1/subscriptions/?filter%5Bmsisdn%5D='
    const filter = "filter%5Bstatus%5D=active&filter%5Bstatus%5D=dormant"
    const url =  `${DBSS_API_SUBS}${msisdn}&${filter}`
    let res = await axios.get(url)
    const dataChecker = res.data.data.length
    

    
    if (  dataChecker === 0){


        return {
            err : true,
            message : errors.dbssIdErr
        }
      }

      
      let id = parseInt(res.data.data[0].id)

      const  notAllowedProfile =    await notEligibleProfile(id)
      const simCardType = await getSimCardType(id)


      if (notAllowedProfile){
        

        return {
            
              eligible: false,
              profile : 'profile Not eligible '
          

        }
        


       } else {

        return {
           
            eligible: true,
            profile:  simCardType
            
  
          }


       }








  }


  const  notEligibleProfile = async (id) => {


    let isCompany = await isCompanyFunc(id)
   const notEligibleProfilesArr = [ 'EmployesPost','SyndicateCtrl','EmployesData','VIP']
   const simCardType = await getSimCardType(id)
   
   
   
   return ( notEligibleProfilesArr.includes(simCardType) || simCardType.toLowerCase().includes('b2b')  || isCompany  )

     }


        const getSimCardType = async (id) => {
        let dbssSimCardTypeUrl= buildUrl(id).simCardType
        let res = await axios.get(dbssSimCardTypeUrl) 
        let simCardType = res.data.data.attributes.code 

        return simCardType


      }


        const  isCompanyFunc = async (id) => {
        
        let dbssownerCustomer= buildUrl(id).ownerCustomer
        let res = await axios.get(dbssownerCustomer) 
        let isCompany = res.data.data.attributes["is-company"] 
        
                 return isCompany
    
          }



          const buildUrl = (id) =>{
    
            return  {
              
            balanceApi :  process.env.DBSS_API + `/api/v1/subscriptions/${id}/balances` ,
            simCardType : process.env.DBSS_API + `/api/v1/subscriptions/${id}/subscription-type`,
            ownerCustomer: process.env.DBSS_API + `/api/v1/subscriptions/${id}/owner-customer`
            
            
            }
          }
    
