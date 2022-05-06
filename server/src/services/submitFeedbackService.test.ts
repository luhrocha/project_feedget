import {SubmitFeedbackService} from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService({
    create: createFeedbackSpy
}, {sendMail: sendEmailSpy})

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.run({type: 'BUG', comment: 'exemplo', screenshot: 'data:image/pnp;base64;teste.jpg'})).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {

        await expect(submitFeedback.run({type: '', comment: 'exemplo', screenshot: 'data:image/pnp;base64;teste.jpg'})).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.run({type: 'BUG', comment: '', screenshot: 'data:image/pnp;base64;teste.jpg'})).rejects.toThrow();
    });

    it('should not be able to submit a feedback without an invalid screenshot', async () => {

        await expect(submitFeedback.run({type: 'BUG', comment: 'exemplo', screenshot: 'teste.jpg'})).rejects.toThrow();
    });
})
