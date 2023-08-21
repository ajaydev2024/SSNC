module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "next",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: ['react', 'node'], // Make sure 'node' is listed as a plugin
    rules: {
        "react/no-unescaped-entities": "off",
        "@next/next/no-page-custom-font": "off"

    },
    settings: {
        react: {
            version: 'detect'
        }
    },

}
