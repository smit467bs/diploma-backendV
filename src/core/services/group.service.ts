import { Group } from '../models';
import { GroupsCollection } from "../schemas";

export const create = (body: Group, user_id: string) => {
    const group = {
        admin: user_id,
        ...body,
    };
    return GroupsCollection.create(group)
};

export const getAll = () => {
    return GroupsCollection.find({})
};

export const getGroupPreview = () => {
    return GroupsCollection.find({}).select('_id label admin')
        .populate({ path: 'admin', select: 'first_name surname' })
};
