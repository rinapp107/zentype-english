const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('excel_data.json', 'utf8'));
  let advancedWords = [];

  function parseWordCell(text) {
    if (!text) return null;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return null;

    // Line 1 typically: Promote (v) /prəˈməʊt/
    const line1 = lines[0];
    const match = line1.match(/^([a-zA-Z\s\-]+)\s*(?:\(([a-z]+)\))?\s*(\/.*\/)?/);
    if (!match) return null;

    const word = match[1].trim();
    const pos = match[2] || '';
    const phonetic = match[3] || '';
    const meaning = lines.slice(1).join(' - ');

    return { word, pos, phonetic, meaning };
  }

  function parseStructures(text) {
    if (!text) return [];
    const blocks = text.split(/\r?\n\r?\n/).filter(b => b.trim());
    return blocks.map(block => {
      const lines = block.split(/\r?\n/).filter(l => l.trim());
      return {
        formula: lines[0] || '',
        meaning: lines[1] || '',
        example: lines[2] || ''
      };
    });
  }

  function parseCollocations(text) {
    if (!text) return [];
    return text.split(/\r?\n/).filter(l => l.trim());
  }

  // To group related words, we will keep track of the "current main word" for column 1 and column 5
  let currentWord1 = null;
  let currentWord5 = null;

  for (const row of data) {
    // Column 1-3
    if (row['__EMPTY_1']) {
      const parsed = parseWordCell(row['__EMPTY_1']);
      if (parsed) {
        // If it has structures or collocations, it's a main word
        if (row['__EMPTY_2'] || row['__EMPTY_3']) {
          currentWord1 = {
            ...parsed,
            isAdvanced: true, // flag for new UI
            structures: parseStructures(row['__EMPTY_2']),
            collocations: parseCollocations(row['__EMPTY_3']),
            relatedForms: []
          };
          advancedWords.push(currentWord1);
        } else {
          // It's a related form to the current main word, or just a simple word
          if (currentWord1) {
            currentWord1.relatedForms.push(parsed);
          } else {
            advancedWords.push({
              ...parsed,
              isAdvanced: true,
              structures: [],
              collocations: [],
              relatedForms: []
            });
          }
        }
      }
    }

    // Column 5-7
    if (row['__EMPTY_5']) {
      const parsed = parseWordCell(row['__EMPTY_5']);
      if (parsed) {
        if (row['__EMPTY_6'] || row['__EMPTY_7']) {
          currentWord5 = {
            ...parsed,
            isAdvanced: true,
            structures: parseStructures(row['__EMPTY_6']),
            collocations: parseCollocations(row['__EMPTY_7']),
            relatedForms: []
          };
          advancedWords.push(currentWord5);
        } else {
          if (currentWord5) {
            currentWord5.relatedForms.push(parsed);
          } else {
            advancedWords.push({
              ...parsed,
              isAdvanced: true,
              structures: [],
              collocations: [],
              relatedForms: []
            });
          }
        }
      }
    }
  }

  // Create JS content
  const jsContent = `/* ============================================
   ZenType English — Advanced Vocabulary (From Excel)
   ============================================ */

if (window.ZenData && window.ZenData.topics) {
  window.ZenData.topics.push({
    id: 'advanced', 
    name: 'Từ Vựng Mở Rộng', 
    icon: 'fa-book-open', 
    color: '#f43f5e',
    words: ${JSON.stringify(advancedWords, null, 2)}
  });
}
`;

  fs.writeFileSync('js/data_advanced.js', jsContent);
  console.log('Successfully processed ' + advancedWords.length + ' advanced words.');
} catch (error) {
  console.error('Error:', error);
}
