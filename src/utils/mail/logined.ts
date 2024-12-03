import { EmailParams, Recipient, Sender } from "mailersend";
import { mailerSend } from ".";

export const loginedMail = async (
  email: string,
  { name, ip, userAgent }: { name: string, ip: string, userAgent: string }
) => {
  const sentFrom = new Sender("auth@shooclzt10.site", "School 10");

  const recipients = [
    new Recipient(email, "Client")
  ];

  const personalization = [
    {
      email: email,
      data: {
        name,
        ip,
        userAgent
      },
    }
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Обнаружен новый вход на ваш сайт")
    .setTemplateId('vywj2lpdmeql7oqz')
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);
}