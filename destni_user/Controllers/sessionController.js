exports.sessionId = async(req,res)=>{
    const userId = req.session.userId;
    console.log(userId);
    res.send(userId)

}