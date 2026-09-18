"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import LewyMark from "@/components/LewyMark";

type BusinessType = "Physical goods" | "Services" | "Both" | "Personal secretary/assistant";
type Voice = "Friendly" | "Professional" | "Funny/Playful" | "Formal" | "Casual/Sheng";

const STEPS = ["intro", "knowledge", "test", "connect", "terms", "done"] as const;
type Step = (typeof STEPS)[number];

const KNOWLEDGE_QUESTIONS = [
  { key: "businessName", label: "What's your business called?", placeholder: "e.g. Amani Home Goods" },
  { key: "greeting", label: "How should I greet a new customer?", placeholder: "e.g. Hi! Thanks for reaching out to Amani 🌿" },
  { key: "hours", label: "What are your business hours?", placeholder: "e.g. Mon–Sat, 9am–7pm EAT" },
  { key: "products", label: "What do you sell or offer, in a sentence?", placeholder: "e.g. Handmade home décor and gifting" },
  { key: "pricing", label: "Any pricing rules I should always follow?", placeholder: "e.g. Never discount below 10% without approval" },
  { key: "returns", label: "What's your refund or return policy?", placeholder: "e.g. Returns within 7 days with receipt" },
  { key: "neverSay", label: "Anything I should never say or promise?", placeholder: "e.g. Never guarantee delivery dates" },
] as const;

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [voice, setVoice] = useState<Voice | null>(null);
  const [hasLocation, setHasLocation] = useState<boolean | null>(null);
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [qIndex, setQIndex] = useState(0);
  const [testMessages, setTestMessages] = useState<{ role: "customer" | "lewy"; text: string }[]>([
    { role: "lewy", text: "Hey! I'm ready — send me a message like a real customer would." },
  ]);
  const [testInput, setTestInput] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  async function sendTestMessage() {
    if (!testInput.trim() || testLoading) return;
    const customerMsg = testInput.trim();
    setTestMessages((m) => [...m, { role: "customer", text: customerMsg }]);
    setTestInput("");
    setTestLoading(true);

    try {
      const res = await fetch("/api/lewy-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: customerMsg,
          business: { businessType, voice, description, answers },
        }),
      });
      const data = await res.json();

      setTestMessages((m) => [
        ...m,
        {
          role: "lewy",
          text: res.ok
            ? data.reply
            : `⚠️ ${data.error || "Lewy couldn't reply just now."}`,
        },
      ]);
    } catch {
      setTestMessages((m) => [
        ...m,
        { role: "lewy", text: "⚠️ Couldn't reach Lewy's brain — check your connection and try again." },
      ]);
    } finally {
      setTestLoading(false);
    }
  }

  const [saveError, setSaveError] = useState<string | null>(null);

  async function finishOnboarding() {
    setSaving(true);
    setSaveError(null);
    const supabase = createClient();

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(userError?.message || "No logged-in user found.");
      }

      const { error: upsertError } = await supabase.from("workspaces").upsert(
        {
          owner_id: user.id,
          business_type: businessType,
          brand_voice: voice,
          has_location: hasLocation,
          location_name: locationName || null,
          address: address || null,
          description: description || null,
          knowledge_answers: answers,
          onboarding_completed_at: new Date().toISOString(),
        },
        { onConflict: "owner_id" }
      );

      if (upsertError) {
        throw new Error(upsertError.message);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Onboarding save failed:", err);
      setSaveError(
        err instanceof Error
          ? err.message
          : "Something went wrong saving your setup. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-10 md:px-0">
      <div className="mx-auto h-1 w-full max-w-lg overflow-hidden rounded-full bg-surface2">
        <div
          className="h-full bg-gradient-to-r from-violet via-cyan to-amber transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto mt-14 max-w-lg">
        {step === "intro" && (
          <div className="text-center">
            <LewyMark size={96} className="mx-auto lewy-breathe" />
            <h1 className="mt-8 font-display text-2xl font-semibold tracking-tight">
              I&apos;m Lewy — your new business assistant.
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
              I read customer texts, photos and videos, and I can send back photos, videos,
              PDFs, catalogues, price lists and size charts the moment someone asks — once
              you&apos;ve shown me what to say.
            </p>
            <button
              onClick={() => setStep("knowledge")}
              className="focus-ring mt-9 rounded-full bg-text px-6 py-3 text-sm font-medium text-ink"
            >
              Teach me your business
            </button>
          </div>
        )}

        {step === "knowledge" && (
          <div>
            {businessType === null ? (
              <QuestionBlock title="What do you use me for?">
                <OptionGrid
                  options={["Physical goods", "Services", "Both", "Personal secretary/assistant"]}
                  onSelect={(v) => setBusinessType(v as BusinessType)}
                />
              </QuestionBlock>
            ) : voice === null ? (
              <QuestionBlock title="What should my tone sound like?">
                <OptionGrid
                  options={["Friendly", "Professional", "Funny/Playful", "Formal", "Casual/Sheng"]}
                  onSelect={(v) => setVoice(v as Voice)}
                />
              </QuestionBlock>
            ) : hasLocation === null ? (
              <QuestionBlock title="Do you have a physical office or shop?">
                <OptionGrid options={["Yes", "No"]} onSelect={(v) => setHasLocation(v === "Yes")} />
              </QuestionBlock>
            ) : hasLocation && !locationName ? (
              <QuestionBlock title="What's it called, and where is it?">
                <input
                  autoFocus
                  className="focus-ring mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none"
                  placeholder="Location name"
                  onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).value && setLocationName((e.target as HTMLInputElement).value)}
                />
                <p className="mt-2 text-xs text-muted">Press Enter to continue. Address is optional and can be added later in Settings.</p>
                <button className="focus-ring mt-4 text-sm text-cyan" onClick={() => setLocationName("Not specified yet")}>
                  Skip for now →
                </button>
              </QuestionBlock>
            ) : !description ? (
              <QuestionBlock title="Tell me about the business — what you do, your objectives, and anything you stand for.">
                <textarea
                  autoFocus
                  rows={5}
                  className="focus-ring mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none"
                  placeholder="We're a small home-goods brand focused on..."
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  className="focus-ring mt-4 rounded-full bg-text px-5 py-2.5 text-sm font-medium text-ink"
                  onClick={() => setDescription(address || "Not specified yet")}
                >
                  Continue
                </button>
              </QuestionBlock>
            ) : qIndex < KNOWLEDGE_QUESTIONS.length ? (
              <QuestionBlock title={KNOWLEDGE_QUESTIONS[qIndex].label}>
                <input
                  autoFocus
                  className="focus-ring mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none"
                  placeholder={KNOWLEDGE_QUESTIONS[qIndex].placeholder}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value;
                      setAnswers((a) => ({ ...a, [KNOWLEDGE_QUESTIONS[qIndex].key]: val }));
                      setQIndex((i) => i + 1);
                    }
                  }}
                />
                <div className="mt-4 flex items-center gap-4">
                  <p className="text-xs text-muted">
                    {qIndex + 1} of {KNOWLEDGE_QUESTIONS.length} · Press Enter to continue
                  </p>
                  <button
                    className="focus-ring text-xs text-cyan"
                    onClick={() => setQIndex((i) => i + 1)}
                  >
                    Skip →
                  </button>
                </div>
              </QuestionBlock>
            ) : (
              <div className="text-center">
                <h2 className="font-display text-xl font-semibold">That's plenty to start with.</h2>
                <p className="mt-2 text-sm text-muted">You can refine everything later in Lewy AI Controls.</p>
                <button
                  onClick={() => setStep("test")}
                  className="focus-ring mt-8 rounded-full bg-text px-6 py-3 text-sm font-medium text-ink"
                >
                  Try talking to me
                </button>
              </div>
            )}
          </div>
        )}

        {step === "test" && (
          <div>
            <h2 className="font-display text-xl font-semibold">
              Great! Now try talking to me as if you were a customer.
            </h2>
            <p className="mt-2 text-sm text-muted">See if my responses fit — you can correct me any time.</p>

            <div className="mt-6 h-72 space-y-3 overflow-y-auto rounded-2xl border border-border bg-surface p-4">
              {testMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "customer" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      m.role === "customer" ? "bg-surface2 text-text" : "bg-violet/15 text-text"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {testLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl bg-violet/15 px-4 py-2 text-sm text-muted">
                    Lewy is typing…
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendTestMessage()}
                placeholder="Type as a customer would…"
                disabled={testLoading}
                className="focus-ring flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none disabled:opacity-60"
              />
              <button
                onClick={sendTestMessage}
                disabled={testLoading}
                className="focus-ring rounded-xl bg-surface2 px-4 text-sm disabled:opacity-60"
              >
                Send
              </button>
            </div>

            <button
              onClick={() => setStep("connect")}
              className="focus-ring mt-6 w-full rounded-full bg-text py-3 text-sm font-medium text-ink"
            >
              This looks right — continue
            </button>
          </div>
        )}

        {step === "connect" && (
          <div className="text-center">
            <h2 className="font-display text-xl font-semibold">Connect an account</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Link WhatsApp Business, Instagram, Gmail, Messenger, Telegram or your website chat.
              You can add more later in Channels.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["WhatsApp Business", "Instagram DMs", "Gmail", "Messenger", "Telegram", "Website Chat"].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setStep("terms")}
                  className="focus-ring rounded-xl border border-border bg-surface px-4 py-3 text-left text-sm hover:border-cyan/60"
                >
                  {ch}
                </button>
              ))}
            </div>
            <button onClick={() => setStep("terms")} className="focus-ring mt-6 text-sm text-muted hover:text-text">
              I'll connect this later
            </button>
          </div>
        )}

        {step === "terms" && (
          <div className="text-center">
            <h2 className="font-display text-xl font-semibold">Before Lewy goes live</h2>
            <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-surface p-5 text-left text-sm leading-relaxed text-muted">
              Lewy will respond to customers on your behalf using what you've taught it, send
              approved media automatically, and hand off complaints, payment discussions and
              price negotiation to your team immediately. You stay in control from Lewy AI
              Controls at any time.
            </div>
            <button
              onClick={() => setStep("done")}
              className="focus-ring mt-6 rounded-full bg-gradient-to-r from-violet via-cyan to-amber px-6 py-3 text-sm font-medium text-ink"
            >
              I accept — activate Lewy
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="text-center">
            <LewyMark size={72} className="mx-auto" />
            <h2 className="mt-6 font-display text-xl font-semibold">Lewy is handling customers.</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              One more thing — add your product photos, videos and price lists so Lewy can send
              them the moment someone asks.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <button
                disabled={saving}
                onClick={finishOnboarding}
                className="focus-ring rounded-full bg-text px-5 py-2.5 text-sm font-medium text-ink disabled:opacity-50"
              >
                {saving ? "Setting up…" : "Go to Media"}
              </button>
              <button
                disabled={saving}
                onClick={finishOnboarding}
                className="focus-ring rounded-full border border-border px-5 py-2.5 text-sm text-muted hover:text-text"
              >
                Skip for now
              </button>
            </div>
            {saveError && (
              <p className="mx-auto mt-4 max-w-sm text-sm text-danger">⚠️ {saveError}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function QuestionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold leading-snug">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function OptionGrid({ options, onSelect }: { options: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="focus-ring rounded-xl border border-border bg-surface px-4 py-3 text-left text-sm hover:border-cyan/60"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
