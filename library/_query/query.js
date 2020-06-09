'use strict'
const
    path = require('path');

const Chat = require(path.resolve('./src/models/chatModel'));

class Query {
    static async save_query(Model, Query) {
        const session = await Chat.startSession();
        session.startTransaction({ readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
        try {
            console.log('============= IN QUERY INTERFACE ===============')
            const opts = { session, returnOriginal: false };
            // console.log('===-=', opts)
            const _save = new Chat(Model, Query)
            const s = await _save.save();
            console.log('===-=', s)

            await session.commitTransaction();
            session.endSession();
            return true;
        }
        catch (e) {
            await session.abortTransaction();
            session.endSession();
            throw e;
        }
    }

}

module.exports = Query;
