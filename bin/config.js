/**
 * @file YAML 形式の設定ファイルをパースする
 */

const fs = require("fs");
const YAML = require("yaml");
const path = require("path")

const srcConfigFilePath = path.join(process.cwd(), "/config.yml");
const distConfigFilePath = path.join(process.cwd(), "/config.json");

let yamlText;
try {
  yamlText = fs.readFileSync(srcConfigFilePath).toString();
} catch (error) {
  process.stderr.write(`${srcConfigFilePath} が存在しません。\n`);
  process.exit(1);
}

let config;
try {
  config = YAML.parse(yamlText);
} catch (error) {
  process.stderr.write(
    `${srcConfigFilePath} は正しい YAML 形式である必要があります。\n`
  );
  process.exit(2);
}

if (!config) {
  process.stderr.write(
    `${srcConfigFilePath} は正しい YAML 形式である必要があります。\n`
  );
  process.exit(3);
}

// 全ての設定は /config.json として出力する
fs.writeFileSync(distConfigFilePath, JSON.stringify(config, null, 2));
process.exit(0);
