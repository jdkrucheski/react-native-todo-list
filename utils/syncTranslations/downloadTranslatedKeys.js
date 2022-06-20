const {GoogleSpreadsheet} = require('google-spreadsheet');
const secret = require('./secret.json');

const fs = require('fs');
// Initialize the sheet
const doc = new GoogleSpreadsheet(secret.sheetId);

// Initialize Auth
const init = async () => {
  await doc.useServiceAccountAuth({
    client_email: secret.client_email, //don't forget to share the Google sheet with your service account using your client_email value
    private_key: secret.private_key,
  });
};

const read = async () => {
  console.log('Downloading keys...');
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByTitle.main; //get the sheet by title, I left the default title name. If you changed it, then you should use the name of your sheet
  await sheet.loadHeaderRow(); //Loads the header row (first row) of the sheet

  const colTitles = sheet.headerValues;
  const rows = await sheet.getRows({limit: sheet.rowCount});

  let result = {};
  rows.map(row => {
    colTitles.slice(1).forEach(title => {
      result[title] = result[title] || [];
      const key = row[colTitles[0]];
      result = {
        ...result,
        [title]: {
          ...result[title],
          [key]: row[title] !== '' ? row[title] : undefined,
        },
      };
    });
  });
  return result;
};

const write = data => {
  console.log('Writing keys...');
  Object.keys(data).forEach(key => {
    fs.writeFile(
      `./translations/i18n/${key}.json`,
      JSON.stringify(data[key], null, 2),
      err => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Generated ${key}.json`);
        }
      },
    );
  });
};

init()
  .then(() => read())
  .then(data => write(data))
  .finally(() => console.log('Done!'))
  .catch(err => console.log('Error downloading keys!', err));
