import { model, Schema } from "mongoose";

import { Group, GroupType } from "../models";

const GroupSchema: Schema = new Schema({
    label: {type: String, required: true},
    participants: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    admin: {type: Schema.Types.ObjectId, ref: 'Users'},
    type: {type: GroupType},
    isDeleted: {type: Boolean},
}, {versionKey: false});

export default model<Group>('Groups', GroupSchema);
