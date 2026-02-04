import { runDMWorkflow } from "../agent.mjs";

function assertAuth(req) {
  const expected = process.env.N8N_SHARED_SECRET;
  if (!expected) throw new Error("Missing N8N_SHARED_SECRET env var");

  const got = req.headers["x-api-key"];
  if (!got || got !== expected) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    assertAuth(req);

    const { input_as_text } = req.body || {};
    if (!input_as_text || typeof input_as_text !== "string") {
      res.status(400).json({ error: "input_as_text is required" });
      return;
    }

    const result = await runDMWorkflow(input_as_text);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in /api/run-dm:", err);
    res
      .status(err?.statusCode || 500)
      .json({ error: err?.message || "Internal server error" });
  }
}
