const { execFile: e } = require('child_process');
const { promisify } = require('util');
const eraw = promisify(e);
let { task, desc, file } = require('jake');
const { writeFile, appendFile, rm } = require('fs/promises');
const rim = require('rimraf');
const rimraf = promisify(rim);
const pwaAssetGenerator = require('pwa-asset-generator');
const { Parcel } = require('@parcel/core');
const { chdir } = require('process');

function exec(command, args, cwd, quiet) {
    return new Promise((r, j) => {
        let o = '';
        const proc = e(command, args, { cwd, shell: true }, (e) => {
            if (e) {
                j(e);
            } else {
                r(o);
            }
        });
        proc.stdout.on('data', (d) => {
            o += d;
        });
        if (!quiet) {
            proc.stdout.pipe(process.stdout);
            proc.stderr.pipe(process.stderr);
        }
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
            BUNDLE_BUDDY: 'true',
        },
        additionalReporters: [
            {
                packageName: '@parcel/reporter-cli',
                resolveFrom: __dirname + '/node_modules/@parcel/reporter-cli',
            },
        ],
        defaultTargetOptions: {
            engines: {
                browsers: 'defaults and not ie >0 and not ie_mob >0',
            },
        },
    });
    let { bundleGraph, buildTime } = await bundler.run();
    console.log('Build Complete, now exiting process.');
    process.exit(); // stupid github actions. i swear if this doesnt work
});

desc('legal');
file('src/legal.mdx', ['package.json', 'yarn.lock'], async () => {
    const proc = await exec('yarn', ['licenses', 'generate-disclaimer', '--production'], undefined, true);
    const licence = '# Licenses\n```\n' + proc + '\n```';
    await writeFile('src/legal.mdx', licence);
});

desc('splash');
file('src/splashscreens/splash.html', ['src/icons/icon.svg'], async () => {
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

    console.log('starting the generation of splashscreens');
    const d = await pwaAssetGenerator.generateImages('./src/icons/icon.svg', './src/splashscreens', {
        background: '#272727',
        splashOnly: true,
        /*index: 'src/index.html',*/
        pathOverride: './splashscreens',
        type: 'png',
        padding: 'calc(50vh - 20%) calc(50vw - 40%)',
    });
    await writeFile('src/splashscreens/splash.html', d.htmlMeta.appleLaunchImage);
    //await writeFile('src/splashscreens/splash.hold', 'this file is to prevent useless rebuilding of splash screens');
});

task('preqBuild', ['src/legal.mdx', 'src/splashscreens/splash.html'], { concurrency: 2 });

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
task('gh-pages', ['preqBuild'], async () => {
    let bundler = new Parcel({
        mode: 'production',
        entries: ['./src/index.html'],
        env: {
            NODE_ENV: 'production',
        },
        additionalReporters: [
            {
                packageName: '@parcel/reporter-cli',
                resolveFrom: __dirname + '/node_modules/@parcel/reporter-cli',
            },
        ],
        defaultTargetOptions: {
            engines: {
                browsers: 'defaults and not ie >0 and not ie_mob >0',
            },
            publicUrl: './',
        },
    });
    let { bundleGraph, buildTime } = await bundler.run();
    console.log('Build Complete, now exiting process.');
    process.exit(); // stupid github actions. i swear if this doesnt work
});
