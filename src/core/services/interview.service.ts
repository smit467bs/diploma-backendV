import { v4 as uuid } from 'uuid';

import InterviewCollection from "../schemas/interview.schema";
import { Interview } from "../models";

export const create = (body: Interview, user_id: string) => {
    const interview = {
        ...body,
        user_id,
        questions: body.questions.map(q => ({...q, id: uuid()})),
        created_at: new Date(),
        updated_at: new Date()
    };
    return InterviewCollection.create(interview)
};

export const getAll = () => {
    return InterviewCollection.find({}).limit(50);
};

export const getById = (id: string) => {
    return InterviewCollection.findById(id)
};
