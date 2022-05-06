import {MailAdapter, SendMailData} from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ef433911aa911f",
        pass: "1ae075f21ef106"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body} : SendMailData) {
        await transport.sendMail({from: 'Equipe Feedget <equipe@feedget.com>', to: 'Luana <luanarocha17@gmail.com>', subject, html: body});
    }

}
