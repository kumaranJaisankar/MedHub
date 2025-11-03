const fs = require("fs");
const path = require("path");

const pkgPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-idle-timer",
  "package.json"
);

try {
  if (!fs.existsSync(pkgPath)) {
    console.log("react-idle-timer package.json not found at", pkgPath);
    process.exit(0);
  }

  const content = fs.readFileSync(pkgPath, "utf8");
  const pkg = JSON.parse(content);

  if (pkg.type === "module") {
    console.log("react-idle-timer already has type: module");
    process.exit(0);
  }

  pkg.type = "module";
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log(
    'Patched react-idle-timer package.json to include "type": "module"'
  );
} catch (err) {
  console.error("Failed to patch react-idle-timer package.json:", err);
  process.exit(1);
}
