const commandLineArgs=require("command-line-args"),mainDefinitions=[{name:"command",defaultOption:!0},{name:"help",alias:"h",defaultValue:"helpme"}],mainOptions=commandLineArgs(mainDefinitions,{stopAtFirstUnknown:!0}),argv=mainOptions._unknown||[],TAKEN_COMMAND_ALIASES=["h"];module.exports={cmds:{},cmdsLoaded:!1,initCmds:function(e,i=[],n="cmds",a){const s=require("fs");let t=this;s.readdirSync(e).forEach(o=>{if(!(i.indexOf(`