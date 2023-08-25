const ts = require('typescript');
const fs = require("fs").promises;
const path = require("path");
const terser = require('terser');

async function convertMainTsToJs() {
    const mainTsPath = path.join(process.cwd(), 'electron/main.ts');
    const mainJsPath = path.join(process.cwd(), 'build/main.js');

    const tsConfig = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS
    };

    const tsCode = await fs.readFile(mainTsPath, 'utf-8');
    const jsCode = ts.transpileModule(tsCode, { compilerOptions: tsConfig }).outputText;

    const minifiedCode = await terser.minify(jsCode, { output: { inline_script: true } });
    await fs.mkdir(path.join(process.cwd(), 'build'), { recursive: true });
    await fs.writeFile(mainJsPath, minifiedCode.code);
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
