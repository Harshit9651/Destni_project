
exports.protecteddata = async(req,res)=>{
    req.session.userId = req.user.id;
    console.log(`User ID set: ${req.session.userId}`);
    res.json({ message: 'You have accessed a protected route in destni_post!', user: req.user });
}
exports.testproteacteddata = async(req,res)=>{
    console.log(`User ID is: ${req.session.userId}`); 
    res.json({ userId: req.session.userId });
}
