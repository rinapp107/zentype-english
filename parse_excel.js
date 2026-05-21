const xlsx = require('xlsx');
const fs = require('fs');

try {
  const workbook = xlsx.readFile('English từ vựng.xlsx');
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
  fs.writeFileSync('excel_data.json', JSON.stringify(data, null, 2));
  console.log('Success: Wrote ' + data.length + ' rows to excel_data.json');
} catch (error) {
  console.error('Error reading excel file:', error);
}
