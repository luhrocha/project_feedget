import {FeedbackRepository, FeedbackCreateData} from "../feedbacksRepository";
import {prisma} from '../../prisma';

export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create({type, comment, screenshot} : FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    }
}
