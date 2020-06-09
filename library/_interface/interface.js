'use strict';

const
    QueryInteface  = require ('../_query/query');

class InterFace  extends QueryInteface{
    static async saveInterface(Model, Query){
        try {
            console.log("<<<<<<<<<<<<<< User Inter Face >>>>>>>>>>>>>>>>>>")
            await super.save_query(Model , Query);
        } catch (e) {
            console.log(e)
        }
    }

}


module.exports = InterFace;
