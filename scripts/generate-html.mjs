import fs from "node:fs";
import path from "node:path";

function buildSpaIndex() {
  const publicOutDir = path.resolve(process.cwd(), ".output/public");
  const distDir = path.resolve(process.cwd(), "dist");
  const assetsDir = path.resolve(distDir, "assets");

  if (!fs.existsSync(assetsDir)) {
    console.warn("Assets directory not found:", assetsDir);
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
  const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
  const routesFile = files.find((f) => f.startsWith("routes-") && f.endsWith(".js"));

  const cssLink = cssFile
    ? `    <link rel="stylesheet" crossorigin href="/assets/${cssFile}">`
    : "";
  const routesScript = routesFile
    ? `    <script type="module" crossorigin src="/assets/${routesFile}"></script>`
    : "";
  const jsScript = jsFile
    ? `    <script type="module" crossorigin src="/assets/${jsFile}"></script>`
    : "";

  const scriptTags = [cssLink, routesScript, jsScript].filter(Boolean).join("\n");

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <title>Papá Plátano | Pollo a la Brasa Amazónica</title>
    <meta name="description" content="Papá Plátano: El auténtico sabor del pollo a la brasa con toque amazónico en Lima." />
    <meta property="og:title" content="Papá Plátano | Pollo a la Brasa Amazónica" />
    <meta property="og:description" content="Pollo a la brasa al carbón, combos familiares y guarniciones amazónicas." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet" />
${scriptTags}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

  fs.writeFileSync(path.join(distDir, "index.html"), htmlContent, "utf8");
  if (fs.existsSync(publicOutDir)) {
    fs.writeFileSync(path.join(publicOutDir, "index.html"), htmlContent, "utf8");
  }
  fs.writeFileSync(path.resolve(process.cwd(), "index.html"), htmlContent, "utf8");
  console.log("Successfully generated dist/index.html with production bundles.");
}

buildSpaIndex();
