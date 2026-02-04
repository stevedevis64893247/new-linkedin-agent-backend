import { fileSearchTool, Agent, Runner, withTrace } from "@openai/agents";

/**
 * CONTENT AGENT (Posts)
 */
const fileSearchContent = fileSearchTool([
  "vs_69838649217c8191bc1496dbbe7ca9c2"
]);

const contentgpt = new Agent({
  name: "contentgpt",
  instructions: `PASTE YOUR AGENT 1 INSTRUCTIONS HERE (UNCHANGED)`,
  model: "gpt-5.2",
  tools: [fileSearchContent],
  modelSettings: {
    reasoning: { effort: "low", summary: "auto" },
    store: true
  }
});

/**
 * DM / SALES NAV / PROFILE AGENT
 */
const fileSearchDM = fileSearchTool([
  "vs_69838917127c819183aac78b345b2113"
]);

const dmgeneratoragent = new Agent({
  name: "dmgeneratoragent",
  instructions: `PASTE YOUR AGENT 2 INSTRUCTIONS HERE (UNCHANGED)`,
  model: "gpt-5.2",
  tools: [fileSearchDM],
  modelSettings: {
    reasoning: { effort: "low", summary: "auto" },
    store: true
  }
});

export async function runContentWorkflow(input_as_text) {
  return await withTrace("LinkedIn Content Workflow", async () => {
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "vercel",
        workflow_id: "wf_697c8efbe54481908b2df121a105818d0260455c98beeb34"
      }
    });

    const run = await runner.run(contentgpt, [
      { role: "user", content: [{ type: "input_text", text: input_as_text }] }
    ]);

    if (!run.finalOutput) throw new Error("Agent result is undefined");
    return { output_text: run.finalOutput };
  });
}

export async function runDMWorkflow(input_as_text) {
  return await withTrace("LinkedIn DM Workflow", async () => {
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "vercel",
        workflow_id: "wf_698388cbfb488190a1535159b037431104106ce6ff2dfb46"
      }
    });

    const run = await runner.run(dmgeneratoragent, [
      { role: "user", content: [{ type: "input_text", text: input_as_text }] }
    ]);

    if (!run.finalOutput) throw new Error("Agent result is undefined");
    return { output_text: run.finalOutput };
  });
}
