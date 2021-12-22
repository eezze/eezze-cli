const nodePath=require("path").dirname(require.main.filename);const{exec:exec}=require("child_process");const commandLineArgs=require("command-line-args");const CCM=require("./cli-commmand-mapper");const fs=require("fs");const MAIN_ARGS=require("./consts/default-cmd-args");const mainOptions=commandLineArgs(MAIN_ARGS,{stopAtFirstUnknown:true}),argv=mainOptions._unknown||[];let cmd=mainOptions.command||false;function showHelpSection(errorMessage,projectConfCont,logger){if(errorMessage){logger.error("Error: "+errorMessage)}logger.warn(`Try "${projectConfCont.cmdAlias} -h" for further information`);if(Object.keys(CCM.cmds).length==0){logger.warn(`There wasn't any commands successfully registered yet. Please make sure you have a folder in your root folder named "cmds" with the following structure: \n\n\t\t    1. With a folder named what you want your command to be, for example if you want a command "test" then just put a folder with the name of "test" in the cmds folder.\n\t\t    2. Then place 2 folders named options.js and run.js into that folder.\n\n\t\t    This should successfully register a command\n`);process.exit()}let indent="\t\t  ";logger.warn(`Available commands: \n\n${indent} - ${Object.keys(CCM.cmds).join(`\n${indent} - `)}\n`);process.exit()}module.exports=async function(cmdRoot,ignoreRoutes,projectConfPath,logger,cmdsPrefix="cmds",initFunc){let projectConfCont,projectRoot=`${nodePath}/..`;exec(`cd ${projectRoot}`);try{projectConfCont=JSON.parse(fs.readFileSync(projectConfPath).toString())}catch(e){if(DO_TOOL_LOGGING)logger.critical('The project "config.json" wasn\'t valid json');process.exit()}if(typeof mainOptions.version!="undefined"){try{let packageJson=JSON.parse(fs.readFileSync(`${projectRoot}/package.json`)),eezzeCliPackageJson=JSON.parse(fs.readFileSync(`${__dirname}/package.json`));if(DO_TOOL_LOGGING)logger.info(`Current version: ${packageJson.version}`);else console.log(`Eezze CLI version "${eezzeCliPackageJson.version}",  "${projectConfCont.projectName} (${projectConfCont.cmdAlias})" version: ${packageJson.version}`)}catch(er){logger.critical(`Couldn't find "package.json" at "${projectRoot}" to read project version`)}}else if(mainOptions.help===null||!cmd){console.log(CCM.getHelpContents(cmd,cmdRoot,ignoreRoutes,projectConfCont))}else if(cmd){try{if(DO_TOOL_LOGGING)logger.info(CCM.getLogoContents(projectConfCont),false,false);CCM.initCmds(cmdRoot,ignoreRoutes,cmdsPrefix,logger);if(typeof initFunc=="function"){try{initFunc()}catch(e){logger.critical(`Eezze Cli.run: Couldn't run your init function "${e.message||e}`)}}await CCM.run(cmd,logger)}catch(e){console.log("Full error: ",e);if(DO_TOOL_LOGGING)logger.error('ERROR "run.cmd - try catch: '+(typeof e.message=="string"?e.message:e));showHelpSection(undefined,projectConfCont,logger)}}else{if(DO_TOOL_LOGGING)logger.info(CCM.getLogoContents(projectConfCont),false,false);showHelpSection(`Command "${cmd}" did not exist`,projectConfCont,logger)}};