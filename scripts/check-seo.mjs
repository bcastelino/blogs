import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { TOPIC_SEO } from '../lib/site.js';
import { runSeoAudit } from './seo-audit.mjs';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptsDir, '..');
const result = runSeoAudit({
  postsDir: path.join(projectDir, 'content', 'posts'),
  outDir: path.join(projectDir, 'out'),
  topicSeo: TOPIC_SEO,
});

if (result.errors.length > 0) {
  console.error(`SEO audit failed with ${result.errors.length} error(s):`);
  for (const error of result.errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `SEO audit passed: ${result.postCount} posts, ${result.indexablePageCount}/${result.pageCount} indexable pages, ${result.imageCount} images.`
  );
}
