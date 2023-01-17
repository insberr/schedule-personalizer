/** @type {import('jest').Config} */
let config = {
"testPathIgnorePatterns": [
    "/node_modules/"
  ],
  "moduleNameMapper": {
    "^\\$lib(.*)$": "<rootDir>/src/lib$1",
    "^\\$types$": "<rootDir>/src/types.ts"
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "node",
  "modulePaths": ["src", "node_modules"],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ]
}

export default config;