const colors=require("colors");module.exports=class{critical(o){"object"==typeof o&&(o=JSON.stringify(o)),console.error("\n\t[CRITICAL]:".bold.red+` ${o}`.red),process.exit(1)}error(o,e=!1){e&&console.log(require("stacktrace-js").getSync()),console.error("\n\t[ERROR]:".bold.red+` ${o}`.red)}warn(o){console.warn("\n\t[WARN]:".bold.yellow+` ${o}`.yellow)}success(o){console.log("\n\t[SUCCESS]:".bold.green+` ${o}`.green)}info(o,e=!0){e?console.info("\n\t[INFO]:".bold.white+`\t${o}`.white):console.log("\n\t".bold.white+`\t${o}`.white)}};