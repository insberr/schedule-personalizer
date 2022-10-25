const { exec: e } = require('child_process');
const { promisify } = require("util")
const eraw = promisify(e)
let { task, desc } = require('jake');
const { writeFile, appendFile } = require('fs/promises');
const rim = require('rimraf');
const rimraf = promisify(rim)

function exec(command, cwd) {
    return new Promise((r,j) => {
        const proc = e(command, {cwd}, (e) => {
            if (e) {
                j(e)
            } else {
                r()
            }
        })
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
    })
}


function execTask(command) {
    return () => {
        return exec(command)
    }
}

desc("builds for production")
task("build", execTask("yarn parcel build --detailed-report"))

desc("legal")
task("legal", async () => {
    await writeFile("src/legal.mdx", "# Licenses\n```\n");
    await appendFile("src/legal.mdx", (await eraw("yarn licenses generate-disclaimer --production")).stdout)
    await appendFile("src/legal.mdx","\n```")
})


desc("splash")
task("splash", execTask("pwa-asset-generator ../src/icons/icon.svg ./splashscreens --background #272727 --splash-only --index index.html --type png --padding \"calc(50vh - 20%) calc(50vw - 40%)\"", "src"))


task("preqBuild", ["legal","splash"], {concurrency: 2}, () => {})

desc("cloudflare")
task("cloudflare", ["clean", "preqBuild","build"], () => {})

desc("clean")
task("clean", () => {
    return Promise.all([rimraf("dist"), rimraf(".parcel-cache")])
})


task("checktypes", execTask("yarn tsc"))

task("checkeslint", execTask("yarn eslint src"))

desc("format")
task("format", execTask("yarn prettier --write ."))

desc("check")
task("check", ["checktypes","checkeslint"], {concurrency:2},() => {})


desc("gh-pages")
task("gh-pages", [], execTask("parcel build --public-url . --detailed-report"))