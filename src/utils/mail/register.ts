import { EmailParams, Recipient, Sender } from "mailersend";
import { mailerSend } from ".";

export const registerMail = async (
  email: string,
  { url, name }: { url: string; name: string }
) => {
  const sentFrom = new Sender("auth@shooclzt10.site", "School 10");

  const recipients = [
    new Recipient(email, "Client")
  ];

  const personalization = [
    {
      email: email,
      data: {
        url: url,
        name: name
      },
    }
  ];

  console.log(personalization);


  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Створення облікового запису")
    .setTemplateId('0r83ql3x1zplzw1j')
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);
}