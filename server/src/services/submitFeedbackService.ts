import {MailAdapter} from '../adapters/mailAdapter';
import {FeedbackRepository} from '../repositories/feedbacksRepository';

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackService {
    constructor(private feedbackRepository : FeedbackRepository, private mailAdapter : MailAdapter) {}

    async run(request : SubmitFeedbackServiceRequest) {
        const {type, comment, screenshot} = request;

        if (!type) {
            throw new Error('Type is required.');
        }


        if (!comment) {
            throw new Error('Comment is required.');
        }

        if (screenshot && !screenshot.startsWith('data:image/pnp;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        await this.feedbackRepository.create({type, comment, screenshot});
        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [`<div style="font-family: sans-serif; font-size: 16px; color:#111;">`, `<p>Tipo do feedback: ${type}</p>`, `<p>Comentário: ${comment}</p>`, `</div>`].join('\n')
        })
    }
}
