const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        ticket_id:{
            type: Schema.Types.ObjectId
        },
        conversation : [{
            sender   : Schema.Types.ObjectId,
            message  : String,
            receiver : Schema.Types.ObjectId
        }]
      /*  phone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        }*/
    },
    {
        timestamps: true
    }
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;
