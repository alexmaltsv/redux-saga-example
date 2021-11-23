module.exports = {
    "extends": [
        "react-app",
        "react-app/jest",
        "airbnb-typescript",
    ],
    "parserOptions": {
        project: `./tsconfig.json`
    },

    "globals": {
        "window": true,
        "document": true,
    },
};
