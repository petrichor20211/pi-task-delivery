import { constants } from "node:fs";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const extensionDir = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(extensionDir, "..", "templates");
const documentNames = ["SPEC.md", "CHECKLIST.md", "DEBUGLOG.md", "CHECKLOG.md"];

async function findGitRoot(pi: ExtensionAPI, cwd: string): Promise<string | undefined> {
  const result = await pi.exec("git", ["-C", cwd, "rev-parse", "--show-toplevel"], {
    timeout: 3000,
  });
  if (result.code !== 0) return undefined;
  return result.stdout.trim() || undefined;
}

async function isBlankRepository(root: string): Promise<boolean> {
  const entries = await readdir(root);
  return entries.every((entry) => entry === ".git" || entry === ".gitignore");
}

async function initializeDocuments(root: string): Promise<string[]> {
  const docsDir = join(root, "docs");
  await mkdir(docsDir, { recursive: true });

  const created: string[] = [];
  for (const name of documentNames) {
    try {
      await copyFile(join(templatesDir, name), join(docsDir, name), constants.COPYFILE_EXCL);
      created.push(`docs/${name}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  return created;
}

export default function taskDelivery(pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    if (!ctx.isProjectTrusted()) return;

    const root = await findGitRoot(pi, ctx.cwd);
    if (!root || !(await isBlankRepository(root))) return;

    const created = await initializeDocuments(root);
    if (created.length > 0 && ctx.hasUI) {
      ctx.ui.notify(`Task delivery initialized: ${created.join(", ")}`, "info");
    }
  });

  pi.on("before_agent_start", async (event) => ({
    systemPrompt: `${event.systemPrompt}\n\n## Task Delivery\n\nFollow the task-delivery skill. Before repository work, read the current docs/SPEC.md and docs/CHECKLIST.md when present. Only the user may edit these two files.`,
  }));
}
