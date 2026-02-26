const fs = require('fs').promises;
const path = require('path');

async function add(filePath) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagingPath = path.join(repoPath, "staging");
    try{ 
        await fs.mkdir(stagingPath,{recursive : true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added to staging area`);
    }catch(err){
        console.log("Error adding file to staging area:", err); 
    }
    console.log("Add command executed");
    console.log(filePath);
}

module.exports = { add };