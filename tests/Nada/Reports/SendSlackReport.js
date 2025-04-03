/*import fs from 'fs';
import axios from 'axios';

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"; // ✅ Replace with your webhook

async function sendReportToSlack() {
    // Read the latest Allure report
    const reportPath = 'allure-report/index.html'; // ✅ Adjust this path based on your setup
    if (!fs.existsSync(reportPath)) {
        console.error("Allure report not found!");
        return;
    }

    const message = {
        text: `📊 *Allure Test Report* \n ✅ View the latest test results: https://your-server.com/allure-report/index.html`
    };

    try {
        await axios.post(SLACK_WEBHOOK_URL, message);
        console.log("✅ Report sent to Slack successfully!");
    } catch (error) {
        console.error("❌ Error sending report:", error);
    }
}

await sendReportToSlack(); */
import fs from 'fs';
import axios from 'axios';

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"; // ✅ Replace with your Slack webhook

export default class SendSlackReport {
    constructor() {}

    async sendReport() {
        const message = {
            text: `📊 *Allure Test Report* \n ✅ View test results: http://127.0.0.1:49809/`
        };

        try {
            await axios.post(SLACK_WEBHOOK_URL, message);
            console.log("✅ Report sent to Slack successfully!");
        } catch (error) {
            console.error("❌ Error sending report:", error);
        }
    }
}