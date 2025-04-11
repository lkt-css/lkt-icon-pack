import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    define: {
        'process.env': {}
    },
    plugins: [vue()],
    resolve: {
        alias: {'@': src, '@test': test}
    },
    build: {
        target: 'es6',
        lib: {
            entry: `${src}/index.ts`,
            name: 'LktIconPack',
            fileName: 'build',
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                'vue-router',
                'lkt-field',
                'lkt-button',
                'lkt-string-tools',
                'lkt-http',
                'lkt-http-client',
                'lkt-vue-kernel',
                'lkt-i18n',
                'lkt-session'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    "vue-router": 'VueRouter',
                    "lkt-string-tools": 'LktStringTools',
                    "lkt-http": 'LktHttp',
                    "lkt-i18n": 'LktI18n',
                    "lkt-session": 'LktSession',
                },
                sourcemapExcludeSources: true
            }
        }
    },
    test: {
        coverage: {
            reporter: ['text', 'lcov']
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${snapshots}/${path[0]}/${path[1]}${snapExtension}`;
        }
    }
};