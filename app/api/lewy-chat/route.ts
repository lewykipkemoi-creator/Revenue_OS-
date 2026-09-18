import { NextResponse } from "next/server";

// This route runs only on the server, so GEMINI_API_KEY is never exposed to the browser.
// Gemini 3 uses the newer Interactions API (different endpoint + request/response shape
// from the older generateContent API). See https://ai.google.dev/gemini-api/docs/gemini-3
const GEMINI_MODEL = "gemini-3-flash-preview";

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
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        system_instruction: systemPrompt,
        input: message,
        generation_config: { thinking_level: "low" }, // fast, chat-style replies
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      return NextResponse.json(
        { error: `Gemini API error (${res.status}). Check GEMINI_API_KEY and that ${GEMINI_MODEL} is enabled for this key.` },
        { status: 502 }
      );
    }

    const data = await res.json();

    // The Interactions API returns a `steps` array; the reply text lives in the
    // last "model_output" step's content. (SDKs expose this as `interaction.output_text`,
    // but that convenience field isn't present in raw REST responses.)
    const modelOutputStep = [...(data.steps ?? [])]
      .reverse()
      .find((s: { type?: string }) => s.type === "model_output");

    const reply: string | undefined = modelOutputStep?.content?.find(
      (c: { type?: string }) => c.type === "text"
    )?.text;

    if (!reply) {
      console.error("Unexpected Gemini response shape:", JSON.stringify(data));
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
