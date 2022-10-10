require('dotenv').config();
const Language = require("./models/languages");
const dbConnect = require("./dbConnect");
const fs = require("fs");
const path = require("path");
const { connection } = require('mongoose');

(async () => {
  const connection= await dbConnect();
  const languages = await Language.find({});
  if (languages.length) {
    connection.disconnect();
    return;
  }
  const languagesFromGitHub = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "./data/languages-from-github.json"),
      "utf8"
    )
  );
  const languagesToAdd = Object.keys(languagesFromGitHub).map((key) => {
    const name = key;
    const iconKey = languagesFromGitHub[key];
    const iconUrl = `https://github.com/abrahamcalf/programming-languages-logos/raw/master/src/${iconKey}/${iconKey}.svg`;
    return { name, iconUrl };
  });
  try {
    await Language.insertMany(languagesToAdd);
    console.log("Languages added to database");
  } catch (e) {
    console.log("Error while instering languages", e);
  }
  connection.disconnect();
  process.exit(0);
})();