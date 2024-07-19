const axios = require("axios");
exports.fatchdata= async(req,res)=>{
try{
    const data = await axios.get('http://localhost:3001/find/alluser')
const renderdata = data.data;
const userid = req.session.userId;
console.log(userid)
res.render('renders.ejs',{renderdata,userid});


}catch(error){
    res.status(500).send({error:"error accured"});

}
 } 
