import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';

export default [

    // Base JS config
    {
        files: ['**/*.{js,jsx,ts,tsx}'],

        // Spread ESLint recommended config as base
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,  // enable JSX parsing
                },
                project: './tsconfig.json', // needed for type-aware linting in TS files
            },
            globals: {
                React: 'readonly',    // typical global for React projects
                JSX: 'readonly',      // if using JSX types
            },

        },
        linterOptions: {

        },
        ignores: ['!**/.server', '!**/.client'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            '@typescript-eslint': tseslint.plugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            formComponents: ['Form'],
            linkComponents: [
                { name: 'Link', linkAttribute: 'to' },
                { name: 'NavLink', linkAttribute: 'to' },
            ],
            'import/resolver': {
                node: {
                    extensions: ['.ts', '.tsx'],
                },
                typescript: {
                    alwaysTryTypes: true,
                },
            },
            'import/internal-regex': '^~/',
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,
            ...tseslint.configs.recommended.rules,
        },
    },


];
