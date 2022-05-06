export interface SendMailData {
    subject: string;
    body: string;
}

export interface MailAdapter {
    sendMail: (data : SendMailData) => Promisse < void >;
}
