import { exec } from 'child_process';
import fetch from 'node-fetch'; // Ensure you have 'node-fetch' installed

const TAG = process.argv[2] || '@regression'; // Pass the tag dynamically
const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"; // Replace with your Slack webhook

const sendSlackMessage = async (message) => {
  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
};

const runPlaywrightTests = () => {
  const command = `npx playwright test --headed --project=firefox --workers=1 --grep="${TAG}" --reporter=allure-playwright,html`;

  exec(command, async (error, stdout, stderr) => {
    console.log(stdout);

    if (error) {
      console.error(`❌ Some tests failed.\n`, stderr);
      await sendSlackMessage("❌ Playwright tests failed! Check the logs.");
      process.exit(1);
    } else {
      console.log('✅ All tests passed!');

      exec(`npx allure generate allure-results --clean -o allure-report`, async (err, out, serr) => {
        //console.log(out);

        if (err) {
          console.error(`⚠️ Failed to generate Allure report.\n`, serr);
          await sendSlackMessage("⚠️ Failed to generate Allure report.");
        } else {
          console.log('📊 Allure Report successfully generated!');
          await sendSlackMessage("✅ Playwright tests passed! View the Allure report: http://127.0.0.1:7070/allure-report/index.html");
        }
      });
    }
  });
};

// Run the test runner
runPlaywrightTests();

