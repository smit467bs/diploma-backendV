import { v4 as uuid } from 'uuid';

import InterviewCollection from "../schemas/interview";
import { Interview } from "../models";

export const add = (body: Interview) => {
    const interview = {
        ...body,
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
