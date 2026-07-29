export interface EnvConfig {
  apiKey: string;
  model: string;
}

export type EnvResult =
  | { ok: true; config: EnvConfig }
  | { ok: false; error: string };

export function getEnv(): EnvResult {
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      error:
        "MISTRAL_API_KEY is not configured. Please add it to .env.local.",
    };
  }

  return {
    ok: true,
    config: {
      apiKey,
      model: process.env.MISTRAL_MODEL || "mistral-small-latest",
    },
  };
}
