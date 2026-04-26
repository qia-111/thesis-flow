export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const API_KEY = "sk-gtpgqzmpbuprsgcxlkczwregukmrnjytnknvosebunavfbyc"; 
  const API_URL = "https://api.siliconflow.cn/v1/chat/completions";

  try {
    const body = await request.json();
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2-7B-Instruct",
        messages: body.messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
