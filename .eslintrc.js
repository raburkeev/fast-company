module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never' }
        ],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'multiline-ternary': ["off"],
        'object-curly-spacing': ["error", "never"]
    }
}
