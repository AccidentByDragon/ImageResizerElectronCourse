const createTestCafe = require('testcafe');
const config = require('../.testcaferc.js');

//ChatGPT suggested creatign this, but it doesn't work
createTestCafe()
  .then(testcafe => {
    const runner = testcafe.createRunner();
    runner
      .src(['tests/electronTest.js']) // Your test file
      .browsers(config.browsers)
      .concurrency(config.concurrency)
      .selectorTimeout(config.selectorTimeout)
      .assertionTimeout(config.assertionTimeout)
      .pageLoadTimeout(config.pageLoadTimeout)
      .run()
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        testcafe.close();
      });
  })
  .catch(error => {
    console.error(error);
  });