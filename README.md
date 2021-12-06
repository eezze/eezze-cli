# Eezze CLI

## Table of contents

- [Introduction](#introduction)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Project Folder Structure](#project-folder-structure)
- [Help](#help)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## Introduction

Eezze CLI is a cross platform tool for **(Windows/Linux/macOS)** that will help you rapidly create CLI tools. This is the first version and a huge revamp is on the way which will support js and typescript. 

If you would like to request a feature, [please open a new issue](https://github.com/eezze/eezze-cli/issues/new).

Note: This was a rapid prototype and the code is due for a huge clean up, therefore we've minified the code and haven't released out dev version for now. We'll release the dev code once we've been able to clean up the v1 for js and typescript. 

If you choose to use this version, only in unforeseen circumstances can there be breaking changes. The aim is to make it fully compatible with this version.

## Quick start

#### Install

```bash
# npm install eezze-cli --save or npm i eezze-cli -s
```

#### Dependencies

**Linux:**
```bash
 $: apt-get install figlet
```

**Mac:**
```bash
 - Press Command+Space and type Terminal and press enter/return key.
 - Run in Terminal app: 
    - ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 2> /dev/null
      and press enter/return key. If you are prompted to enter your Mac's user password, enter it (when you type it, you wont see it on your screen/terminal.app but it would accept the input; this is to ensure no one can see your password on your screen while you type it. So just type password and press enter, even if you dont see it on your screen). Then wait for the command to finish.
 - Run:
    - brew install figlet
      Done! You can now use figlet
```

**Windows:**
 - Not currently supported

Please note that in the next release we'll be using the [Figlet]: https://www.npmjs.com/package/figlet node dependency

```

## Usage

Create and index.js in the root of your project with the template below:
```node
#!/usr/bin/env node
// I like to use this to clear the console every time I run a command but this is optional
console.clear();

(async () => await require('eezze-cli')())();
```

**index.js Options**

 - doLogging: Boolan, Default "true" - This setting controls the logging output. If set to false then all the default logging in the framework will be turned off other than the following: 
   - Criticals - These are critical errors that will cause the tool to work incorrectly
   - Operational warnings - These are instances when the user hasn't create a dependancy in a particular location etc.

 - doLoggingExtraSpacing:, Default "true" - This controls the default logger extra spacing, indenting and extra lines. If set to false then all but one line will be ignored and the extra indentation will also be ignored.

 - cmdRoot: String, Default "cmds": This value controlls the root of the folder which compiles all the available cmds in the clients program / CLI tool.

 - ignoreRoutes: Array<String> (string[]), Default: [] - All file paths in this array will be ignored in the "{{ cmdRoot }}" folder. If you would like to ignore a folder then an entry including the whole path is required. For eg. "cmds/path/folder" all files would be ignored from that folder.

**package.json**
Then add an entry into the "bin" section of your package.json.
```json
{
    "bin": {
        "command-alias": "./index.js"
    }
}
```

**Note**: Above where it says "command-alias" is what your command alias that will be used on the terminal / command line. So if I put "ryn" as the key in the bin section of my package.json then on the command line I would use this as my CLI command. For e.g: 
```bash
  $ ryn command --args

```

Lastly we need to add our project details to the config.json to the root of your project:
 ```json
{
    "projectName": "App Name",
    "cmdAlias": "ryn",
    "description": "App Description"
}
```
**Note:** This file will be created automatically if it doesn't exist in the root of your project. This file is for the information that users will see on the command line when they run your command. Please note that the "cmdAlias" must be the same as the name in the above step.

## Project Folder Structure

- Example 1:
   - The basic command needs to be structured like "basic-cmd" and contain 2 files, an options.js and a run.js.

- Example 2:
   - The next is an example of a command group. This is basically just like your github type of cli's where you can run a command "cmd cmd-group:cmd". At the moment we only support one level of cmd grouping, but if you would like to have commands like the following example "tool multi-group:cmd:group1:group2 --arg1" then on the inner group cmd folder name you need to add "_" in the name of the folder name. The underscores are replaced with ":". If this isn't clear then please see "multi-group" 3.

**Note:** Do not use any ":" colon's in your file path as this will break on windows. Butno issues on linux and also presumed to work on Mac (Not tested)

```text
├ project-root/
├── config.json
├── package.json
└── cmds/
    ├── cmd-group/
    │   ├── group-cmd/
    │   │   ├── options.js
    │   │   └── run.js
    |   │   
    │   └── multi-group_group1_group2/
    │       ├── options.js
    │       └── run.js
    |     
    └── basic-cmd/
        ├── options.js
        └── run.js
```

### options.js
```node
module.exports = {
	title: 'Test tile',
	desc: 'Short description ...',
	params: [
		{
			name: 'testParam',
			alias: 'p',
			example: 'test-value',
         defaultValue: 'optional default value'
		},
	]
}
```

**Note:** Each of the params can be used from the command line by adding -(alias) (value), For eg. -p value

### run.js
```node
module.exports = async function (options, logger) {
    // ...do something
}
```

### Logger

**Methods**:
 - critical
    - params:
      - message: string
 - error
    - params:
      - message: string
 - warn
    - params:
      - message: string
 - success
    - params:
      - message: string
 - info
    - params:
      - message: string
      - showLabel: boolean

### Help

Every cli tool comes with a built in command that is the "-h (help)" command. This will print out all your cmd, params and usage examples.
If you would like more out of the box functionality like "-v" for tool version output according to the project package.json etc then please put in a feature request.
Thank you.

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/eezze/eezze-cli/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/eezze/eezze-cli/issues/new).

## Contributing

Please read through our [contributing guidelines](https://github.com/eezze/eezze-cli/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## Creators

**TheGuy686**

- <https://github.com/TheGuy686>

## Copyright and license

Code and documentation copyright 2021 Eezze. Code released under the [MIT License](https://reponame/blob/master/LICENSE).

Enjoy!
