const ts = require('typescript');
const fs = require("fs").promises;
const path = require("path");

async function convertMainTsToJs() {
    const mainTsPath = path.join(process.cwd(), 'electron/main.ts');
    const mainJsPath = path.join(process.cwd(), 'electron/main.js');

    const tsConfig = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS
    };

    const tsCode = await fs.readFile(mainTsPath, 'utf-8');
    const jsCode = ts.transpileModule(tsCode, { compilerOptions: tsConfig }).outputText;

    await fs.writeFile(mainJsPath, jsCode);
}

function electron() {
    return {
        name: 'electron',
        async buildStart() {
            await convertMainTsToJs();
        }
    };
}

module.exports = electron;
