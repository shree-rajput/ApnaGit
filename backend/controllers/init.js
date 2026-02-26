const fs = require('fs').promises;
const path = require('path');

async function InitRepo(){
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitPath = path.join(repoPath, "commit");

  try{
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitPath , {recursive : true});
    await fs.writeFile(
      path.join(repoPath , "config.json"),
      JSON.stringify({bucket : process.env.S3_BUCKET})
    )
 console.log("Repository initialized successfully 🚀");
  }catch(err){
    console.log("Error initializing repository:", err);
  }
 
};

module.exports = { InitRepo };