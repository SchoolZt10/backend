import { MailerSend } from "mailersend";

console.log(process.env.MAILSENDER_API_KEY);


export const mailerSend = new MailerSend({
  apiKey: process.env.MAILSENDER_API_KEY,
});

