#!/usr/bin/env node
console.log("CLI started");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { InitRepo } = require("./controllers/init");
const {add} = require('./controllers/add.js');
const {commitRepo} = require('./controllers/commit.js');
const {pullRepo} = require('./controllers/pull.js');
const {pushRepo} = require('./controllers/push.js');
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
  .command(
    "init",
    "Initialize the repository",
    () => {},       // builder (leave empty for now)
    InitRepo        // handler (this runs)
  ).
  command("add <file>" , "add file to the repository", (yargs) => {
    yargs.positional("file" ,{
        describe : "file add to the staging area",
        type : "string"
    }
    );
  },(argv) => {
    add(argv.file);
  }).
  command("commit <message>" ,
     "commit changes to the repository",
     (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string"
      });
     },
     commitRepo
  ).
  command('push', 'push changes to the repository to S3',{}, pushRepo ).
  command('pull' , "pull changes to the repository to S3" ,{} , pullRepo).
  command('revert <commitID>', "revert the repository to the previous commit"
    , (yargs) => {
      yargs.positional("commitID", {
        describe: "commit ID to revert to",
        type: "string"
      });
     },
       revertRepo
   )
  .demandCommand(1)
  .help()
  .parse();