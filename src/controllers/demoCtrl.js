class Demo{

    qw(req, res , next){

        console.log('1----------------',req.sessionID)
        console.log('----------- 2',req.sessionID)
        res.status(200).json({"HttpCode":res.statusCode ,"message": "success"  })
    }
}

module.exports = Demo;
