'use strict';
const
    path              =  require('path'),
    RequestHandler    =  require(path.resolve('./library/helper/RequestHandler')),
    Logger            =  require(path.resolve('./library/helper/logger')),
    logger            =  new Logger(),
    requestHandler    =  new RequestHandler(logger);
const
    InterFace =  require('../../library/_interface/interface');

class User extends  InterFace{
    static async SaveChat (mess , user){
        try {
            console.log("<<<<<<<<<<<<<< Create Controller >>>>>>>>>>>>>>>>>>")
            const R = super.saveInterface(mess, user);
        } catch (e) {
            console.log('=====', e)
        }
    }

}

module.exports = User;
