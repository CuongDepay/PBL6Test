/**
 * Code formatting configuration
 */
module.exports = {
    // Maximum number of characters in a line
    printWidth: 150,
    // Specifies the number of spaces per indentation level
    tabWidth: 2,
    // use tabs instead of spaces for indentation
    useTabs: false,
    // Whether a semicolon is required at the end of the statement
    semi: true,
    // Whether to use single quotes
    singleQuote: true,
    // When to change properties of the referenced object Optional value "<as-needed|consistent|preserve>"
    quoteProps: 'as-needed',
    // Use single quotes instead of double quotes in JSX
    jsxSingleQuote: false,
    // Print trailing commas when possible on multiple lines. (For example, a single-line array will never end with a comma.) Optional value "<none|es5|all>", default none
    trailingComma: 'none',
    // print spaces between parentheses in object literals
    bracketSpacing: true,
    // The back angle brackets of jsx tags need to wrap
    jsxBracketSameLine: false,
    embeddedLanguageFormatting: 'off',
    // Include parentheses around individual arrow function arguments always: (x) => x \ avoid: x => x
    arrowParens: 'always',
    // These two options can be used to format codes that start and end at a given character offset (inclusive and exclusive, respectively)
    rangeStart: 0,
    rangeEnd: Infinity,
    // Specify the parser to use, no need to write @prettier at the beginning of the file
    requirePragma: false,
    // No need to automatically insert @prettier at the beginning of the file
    insertPragma: false,
    // Use the default wrapping standard of always\never\preserve
    proseWrap: 'preserve',
    // Specify the global whitespace sensitivity of HTML files css\strict\ignore
    htmlWhitespaceSensitivity: 'css',
    // Vue file script and style tag indentation
    vueIndentScriptAndStyle: false,
    // In the windows operating system, the line break is usually a carriage return (CR) plus a line feed separator (LF), that is, a carriage return line feed (CRLF),
    // However in Linux and Unix only the simple line feed separator (LF) is used.
    // The corresponding control characters are "\n" (LF) and "\r\n" (CRLF). auto means to keep the existing line endings
    // Line breaks use lf ending with optional value "<auto|lf|crlf|cr>"
    endOfLine: 'auto'
};
