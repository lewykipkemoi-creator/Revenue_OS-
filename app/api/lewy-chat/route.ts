import { NextResponse } from "next/server";

// This route runs only on the server, so GEMINI_API_KEY is never exposed to the browser.
const GEMINI_MODEL = "gemini-2.5-flash";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set on the server." },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { message, business } = body as {
    message: string;
    business?: {
      businessType?: string | null;
      voice?: string | null;
      description?: string;
      answers?: Record<string, string>;
    };
  };

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Missing 'message'." }, { status: 400 });
  }

  const answers = business?.answers ?? {};
  const knowledgeLines = Object.entries(answers)
    .filter(([, v]) => v && v !== "Not specified yet")
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");

  const systemPrompt = `You are Lewy, an AI customer-response assistant for a business on WhatsApp/Instagram/website chat.
Business type: ${business?.businessType || "not specified"}
Tone of voice: ${business?.voice || "friendly"}
Business description: ${business?.description || "not specified"}
Known facts about the business (use these, never invent facts beyond them):
${knowledgeLines || "(none provided yet)"}

Rules:
- Reply the way Lewy would reply to this customer message, in the specified tone.
- Keep replies short — 1 to 3 sentences, like a real chat message.
- If the customer mentions a complaint, a payment method, or price negotiation/bargaining, do not resolve it yourself — say a team member will step in shortly.
- Never invent prices, policies, or facts that are not listed above.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      return NextResponse.json(
        { error: `Gemini API error (${res.status}). Check GEMINI_API_KEY and model access.` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini returned no usable reply." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    return NextResponse.json({ error: "Failed to reach Gemini." }, { status: 502 });
  }
}
