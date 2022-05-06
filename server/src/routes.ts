import express from 'express';
import {PrismaFeedbacksRepository} from './repositories/prisma/prismaFeedbacksRepository';
import {NodemailerMailAdapter} from './adapters/nodemailer/nodemailerMailAdapter';
import {SubmitFeedbackService} from './services/submitFeedbackService';

export const routes = express.Router()


routes.post('/feedbacks', (async (req, res) => {
    const {type, comment, screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);

    await submitFeedbackService.run({type, comment, screenshot});


    return res.status(201).send();
}));
