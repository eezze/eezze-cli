global["ckCmdArgs"]=function(options,cmdArgs){if(!Array.isArray(options))return;if(typeof cmdArgs!="object")return;for(let o of options){if(o.required&&typeof cmdArgs[o.name]=="undefined"){throw`Required arg "${o.name} (-${o.alias})" was not set", example "-${o.alias} -${o.example||"example"}" \n`}}};