import fs from "node:fs";
import path from "node:path";
import {
  fileURLToPath
} from "node:url";

const currentFile = fileURLToPath(import.meta.url);

const currentDir = path.dirname(currentFile);

const root = path.resolve(currentDir, "..");

const errors = [];

const skillDirs = fs.readdirSync(root, {
  withFileTypes: true
}).filter(entry => {
  return entry.isDirectory() && fs.existsSync(path.join(root, entry.name, "SKILL.md"));
}).map(entry => {
  return entry.name;
}).toSorted((a, b) => {
  return a.localeCompare(b, "en");
});

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function checkCodeFences(file) {
  const text = read(file);

  const count = (text.match(/^```/gm) || []).length;

  if (count % 2 !== 0) {
    errors.push(`${file}: code fences are not balanced`);
  }
}

function listMarkdownFiles(dir) {
  const result = [];

  const entries = fs.readdirSync(dir, {
    withFileTypes: true
  });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...listMarkdownFiles(full));

      continue;
    }

    if (entry.isFile() && full.endsWith(".md")) {
      result.push(full);
    }
  }

  return result;
}

for (const dir of skillDirs) {
  const skillFile = path.join(root, dir, "SKILL.md");

  const skillText = read(skillFile);

  const frontmatter = skillText.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatter) {
    errors.push(`${dir}: missing SKILL.md frontmatter`);

    continue;
  }

  const nameMatch = frontmatter[1].match(/^name:([^\r\n]+)$/m) || [];

  const descriptionMatch = frontmatter[1].match(/^description:([^\r\n]+)$/m) || [];

  const trimmedName = nameMatch[1]?.trim();

  const trimmedDescription = descriptionMatch[1]?.trim();

  if (trimmedName !== dir || !(/^[a-z0-9-]+$/).test(trimmedName || "")) {
    errors.push(`${dir}: invalid name "${trimmedName || ""}"`);
  }

  if (!trimmedDescription || trimmedDescription.length < 80 || trimmedDescription.length > 1024) {
    errors.push(`${dir}: description length must be 80-1024 chars`);
  }

  if (skillText.includes("../")) {
    errors.push(`${dir}: SKILL.md should not reference parent directories; keep the skill self-contained`);
  }

  for (const match of skillText.matchAll(/`(references\/[^`]+)`/g)) {
    const refFile = path.join(root, dir, match[1]);

    if (!fs.existsSync(refFile)) {
      errors.push(`${dir}: missing reference ${match[1]}`);
    }
  }

  const openaiFile = path.join(root, dir, "agents", "openai.yaml");

  if (fs.existsSync(openaiFile)) {
    const yaml = read(openaiFile);

    const shortDescriptionMatch = yaml.match(/short_description:\s*"([^"]+)"/);

    const defaultPromptMatch = yaml.match(/default_prompt:\s*"([^"]+)"/);

    const shortDescription = shortDescriptionMatch?.[1];

    const defaultPrompt = defaultPromptMatch?.[1];

    if (!shortDescription || shortDescription.length < 25 || shortDescription.length > 64) {
      errors.push(`${dir}: short_description length must be 25-64 chars`);
    }

    if (!defaultPrompt?.includes(`$${dir}`)) {
      errors.push(`${dir}: default_prompt should mention $${dir}`);
    }
  } else {
    errors.push(`${dir}: missing agents/openai.yaml`);
  }
}

for (const file of listMarkdownFiles(root)) {
  checkCodeFences(file);
}

if (errors.length > 0) {
  process.exit(1);
}

console.info(`OK ${skillDirs.length} skills validated`);
