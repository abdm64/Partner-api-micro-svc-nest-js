const dbssSevice = require('../service/dbss.service')


exports.getDbssInfo =  async (req,res) =>  {
  

    let msisdn = req.params.msisdn
   
    

    let dbssInfo = await dbssSevice.getDbssInfo(msisdn)
    let err = dbssInfo.err

    if (err){

      return  res.status(400).send(dbssInfo.message)


    }
    else {

return res.status(200).send(dbssInfo)

    }
    




}