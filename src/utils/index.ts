export const generateRandomDigits = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function getIp(request: Request): string {
  const headers = request.headers
  let ip = ''

  if (headers['real-ip']) {
    ip = headers['real-ip']
  } else if (headers['cf-connecting-ip'] !== '185.125.102.208') {
    ip = headers['cf-connecting-ip']
  } else if (headers['x-forwarded-for']) {
    ip = headers['x-forwarded-for'].split(',')[0]
  } else {
    ip = '8.8.8.8'
  }

  return ip;
}