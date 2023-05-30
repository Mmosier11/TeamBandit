export function getBaseURL() {
  return process.env.VERCEL_URL
    ? `https://YOUR_APP_NAME.vercel.app`
    : `http://localhost:${process.env.PORT ?? 3000}`;
}
