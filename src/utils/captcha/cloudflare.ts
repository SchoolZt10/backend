import { v4 as uuidv4 } from 'uuid';

export class CloudflareCaptcha {
  static async verifyCaptcha(token: string, ip: string): Promise<boolean> {
    let formData = new FormData();
    formData.append("secret", '0x4AAAAAAA0d5nsioVLkkki_Q7Dbv_4vUMs');
    formData.append("response", token);
    formData.append("remoteip", ip);
    const idempotencyKey = uuidv4();
    formData.append("idempotency_key", idempotencyKey);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const firstResult = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const captchaVerifyResult = await firstResult.json();
    if (captchaVerifyResult.success) {
      return true;
    }

    return false;
  }
}
