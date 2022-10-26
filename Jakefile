const { execFile: e } = require('child_process');
const { promisify } = require('util');
const eraw = promisify(e);
let { task, desc, file } = require('jake');
const { writeFile, appendFile, rm } = require('fs/promises');
const rim = require('rimraf');
const rimraf = promisify(rim);
const pwaAssetGenerator = require('pwa-asset-generator');
const { Parcel } = require('@parcel/core');

function exec(command, args, cwd) {
    return new Promise((r, j) => {
        const proc = e(command, args, { cwd, shell: false }, (e) => {
            if (e) {
                j(e);
            } else {
                r();
            }
        });
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
    });
}

function execTask(command, args) {
    return () => {
        return exec(command, args);
    };
}

function yarnTask(args) {
    return execTask('yarn', args);
}

desc('builds for production');
task('build', ['preqBuild'], async () => {
    let bundler = new Parcel({
        mode: 'production',
        entries: ['./src/index.html'],
        env: {
            NODE_ENV: 'production',
        },
        defaultTargetOptions: {
            engines: {
                browsers: 'defaults and not ie >0 and not ie_mob >0',
            },
        },
    });
    return await bundler.run();
});

desc('legal');
file('src/legal.mdx', ['package.json', 'yarn.lock'], async () => {
    await writeFile('src/legal.mdx', '# Licenses\n```\n');
    await appendFile('src/legal.mdx', (await eraw('yarn', ['licenses', 'generate-disclaimer', '--production'])).stdout);
    await appendFile('src/legal.mdx', '\n```');
});

desc('splash');
file('src/splashscreens/splash.hold', ['src/icons/icon.svg'], async () => {
    /*await yarn(
        [
            'pwa-asset-generator',
            '../src/icons/icon.svg',
            './splashscreens',
            '--background',
            '#272727',
            '--splash-only',
            '--index',
            'index.html',
            '--type',
            'png',
            '--padding',
            'calc(50vh - 20%) calc(50vw - 40%)',
        ],
        'src'
    ),*/
    await pwaAssetGenerator.generateImages('src/icons/icon.svg', 'src/splashscreens', {
        background: '#272727',
        splashOnly: true,
        index: 'src/index.html',
        type: 'png',
        padding: 'calc(50vh - 20%) calc(50vw - 40%)',
    });
    await writeFile('src/splashscreens/splash.hold', 'this file is to prevent useless rebuilding of splash screens');
});

task('preqBuild', ['src/legal.mdx', 'src/splashscreens/splash.hold'], { concurrency: 2 });

desc('clean');
task('clean', () => {
    return Promise.all([rimraf('dist'), rimraf('.parcel-cache'), rm('src/legal.mdx', { force: true }), rimraf('src/splashscreens')]);
});

task('checktypes', yarnTask(['tsc']));

task('checkeslint', yarnTask(['eslint', 'src']));

desc('format');
task('format', yarnTask(['prettier', '--write', '.']));

desc('check');
task('check', ['checktypes', 'checkeslint'], { concurrency: 2 });

desc('gh-pages');
task('gh-pages', ['build']); // just an alias
