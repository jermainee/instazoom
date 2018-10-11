const path = require("path");
const config = {
    entry: ["./src/index.tsx"],
    output: {
        path: path.resolve("public", "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(sc|sa|c)ss?$/,
                use: [
                    'style-loader',
                    'css-loader', {
                        loader: 'sass-loader',
                        query: {
                            includePaths: ["node_modules/bulma/"]
                        }
                    }
                ]
            },
        ]
    }
};

module.exports = config;