module.exports = {
    env: {
        commonjs: true,
        node: true,
        es2020: true,
        jest: true
    },
    extends: ['airbnb-base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': 0,
        semi: 'off',
        'no-unused-vars': 'warn',
        'arrow-body-style': 'warn',
        'linebreak-style': ['off', 'windows'],
        indent: ['error', 4],
        'comma-dangle': 'off',
        'implicit-arrow-linebreak': 'off',
        'global-require': 'off'
    }
};
