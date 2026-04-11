function parseRepoUrl(url){
    try{
        const parts = url.split("github.com/")[1].split("/");
        const owner = parts[0];
        const repo = parts[1];

        return {owner,repo};
    }
    catch(err){
         throw new Error("Invalid GitHub URL");
    }
}

module.exports = parseRepoUrl;