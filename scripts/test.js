// This simple script will make it more cross-platform ready
const cp = require("child_process");

cp.execSync("yarn mocha -r ts-node/register 'src/**/*.spec.ts'", {
    env: {
        TS_NODE_COMPILER_OPTIONS: JSON.stringify({
            module: "commonjs"
        }),
        FORCE_COLOR: true
    },
    stdio: 'inherit',
    shell: true
});
