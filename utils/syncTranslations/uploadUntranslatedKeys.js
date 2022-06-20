const {GoogleSpreadsheet} = require('google-spreadsheet');
const fs = require('fs');
const secret = require('./secret.json');

const doc = new GoogleSpreadsheet(secret.sheetId);

const init = async () => {
  await doc.useServiceAccountAuth({
    client_email: secret.client_email,
    private_key: secret.private_key,
  });
};

const readLocalKeys = () => {
  console.log('Reading local keys...');
  let rawdata = fs.readFileSync('./translations/i18n/es.json');
  let keys = JSON.parse(rawdata);
  return keys;
};

const uploatKeys = async data => {
  // TODO: Antes de subir las keys, descargar las del archivo remoto y verificar que no sean igualaes a las archivo local.
  // Si son iguales, no subirlas, o sea, no pisar las keys del archivo remoto.
  console.log('Uploading keys...');
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle.main;
  sheet.clearRows();

  const rows = Object.keys(data).map((row, index) => ({
    key: row,
    en: `=GOOGLETRANSLATE($A${index + 2};"es"; "en")`,
    es: `=GOOGLETRANSLATE($A${index + 2};"es"; "es")`,
    pt: `=GOOGLETRANSLATE($A${index + 2};"es"; "pt")`,
  }));

  sheet.addRows(rows);
};

init()
  .then(() => readLocalKeys())
  .then(data => uploatKeys(data))
  .finally(() => console.log('Done!'))
  .catch(err => console.log('Error uploading keys!', err));
