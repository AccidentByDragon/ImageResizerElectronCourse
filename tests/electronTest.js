const { fixture, test } = require("testcafe");
const path = require('path');

fixture`Electron Tests`
  .page('file:///' + path.resolve(__dirname, '../index.html'));
;

test('Text typing basics', async t => {
  await t
})
