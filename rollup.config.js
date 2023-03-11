import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const options = {
    sourceMapsEnabled: false
};

const outputs = {
    unminified: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'named',
            plugins: [],
        },
        {
            file: 'dist/index.esm.mjs',
            format: 'esm',
            exports: 'named',
            sourcemap: options.sourceMapsEnabled,
            plugins: [],
        },
    ]
};

export default {
    input: 'src/index.ts',
    output: [...outputs.unminified],
    plugins: [
        replace({
            values: {
                __buildDate__: () => new Date().toISOString(),
                __buildVersion__: () => require('./package.json').version,
            },
            preventAssignment: true,
        }),
        commonjs(),
        typescript(),
    ],
    external: ['ansi-regex', 'ansi-styles'],
};
