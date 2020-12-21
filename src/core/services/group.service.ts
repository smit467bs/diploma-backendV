import { Group } from '../models';
import { GroupsCollection } from "../schemas";
import { Types } from "mongoose";

export const create = (body: Group, user_id: string) => {
    const group = {
        admin: user_id,
        ...body,
    };
    return GroupsCollection.create(group)
};

export const getAll = () => {
    return GroupsCollection.find({});
};

export const getById = (id: string) => {
    return GroupsCollection.findById(id)
        .populate({path: 'admin', select: '_id email displayed_name'})
        .populate({path: 'participants', select: '_id email displayed_name'})
        .populate({path: 'invited', select: '_id email displayed_name'})
        .populate({path: 'requested', select: '_id email displayed_name'});
};

export const getGroupPreview = (userId: string) => {
    return GroupsCollection.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: "admin",
                foreignField: "_id",
                as: "admin"
            }
        },
        {$unwind: "$admin"},
        {
            $project: {
                "_id": 1,
                "label": 1,
                "admin._id": 1,
                "admin.displayed_name": 1,
                "participants": {$size: {$ifNull: ["$participants", []]}},
                "requested": {$in: [Types.ObjectId(userId), "$requested"]},
                "invited": {$in: [Types.ObjectId(userId), "$invited"]},
                "participated": {$in: [Types.ObjectId(userId), "$participants"]}
            }
        }
    ]);
};

export const addUserTo = (groupId: string, userId: string, addTo: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {$push: {[addTo]: userId}})
};

export const removeUserFrom = (groupId: string, userId: string, removeFrom: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {$pull: {[removeFrom]: userId}});
};
