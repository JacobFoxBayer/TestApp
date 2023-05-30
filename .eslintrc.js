module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "env": {
        "mocha": true,
        "node": true,
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
    ],
    "settings": {
        "react": {
            "pragma": "React",
            "version": 'detect'
        }
    },
    "globals": {
        "should": true,
        "sinon": true
    },
    rules: {
        "no-mixed-spaces-and-tabs": "off",
        "no-unused-vars": "off",
        "no-console": "off"
    },
    "overrides": [
        {
            "files": ["*.js"],
            "processor": "@graphql-eslint/graphql"
        },
        {
            "files": ["*.graphqls"],
            "parser": "@graphql-eslint/eslint-plugin",
            "plugins": ["@graphql-eslint"],
            "rules": {
                // Rules can be found out: https://github.com/B2o5T/graphql-eslint/blob/master/docs/README.md
                "@graphql-eslint/require-description": "off",
                "@graphql-eslint/strict-id-in-types": "off",
                "@graphql-eslint/naming-convention": "off"
            },
            "parserOptions": {
                "schema": "./src/api/schema.graphqls"
            },
            "extends": "plugin:@graphql-eslint/schema-recommended"
        }
    ]
}

