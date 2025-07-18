export async function POST(req: Request) {
  const { token } = await req.json();

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    },
  );

  const data = await response.json();

  return new Response(JSON.stringify({ success: data.success }));
}
