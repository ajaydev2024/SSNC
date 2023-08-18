module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
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
    plugins: ['node'], // Add 'node' to the plugins array
    rules: {
        // ... other rules
        'react/react-in-jsx-scope': 'off', // Disable React scope rule
        'react/prop-types': 'off' // Disable prop-types validation for now
      }
      
}
