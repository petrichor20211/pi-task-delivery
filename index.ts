import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const taskDeliveryInstructions = `## Task Delivery

1. Understand the user's intent and keep the work within that scope.
2. For repository work, follow \`docs/SPEC.md\` and \`docs/CHECKLIST.md\`. Create missing task-delivery documents: \`docs/SPEC.md\`, \`docs/CHECKLIST.md\`, \`docs/DEBUGLOG.md\`, and \`docs/CHECKLOG.md\`.
3. Make the smallest direct change that completes the task.
4. Record real debugging work in \`docs/DEBUGLOG.md\` and real checking findings and fixes in \`docs/CHECKLOG.md\`.

- Only the user may edit \`docs/SPEC.md\` and \`docs/CHECKLIST.md\`.
- Follow file placement and naming rules from the project documentation.
- Do not over-engineer or expand a local change into a broad redesign.
- Do not create useless test files or run unrelated full-scale validation.
- Keep commits small and independent. Pull before committing, resolve conflicts, then commit and push according to the user's instructions.

Task-level training and development checks are outside the current scope.`;

export default function taskDelivery(pi: ExtensionAPI) {
  pi.on("before_agent_start", (event) => ({
    systemPrompt: `${event.systemPrompt}\n\n${taskDeliveryInstructions}`,
  }));
}
