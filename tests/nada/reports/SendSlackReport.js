// This script sends a Slack message with a link to the Allure report after the tests have finished running.
// It uses the Slack Incoming Webhooks API to send the message.
import fs from 'fs';
import axios from 'axios';
import path from 'path';

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
const ALLURE_REPORT_PATH = 'allure-report/index.html'; // Relative path to the Allure report

//const ALLURE_REPORT_URL = 'http://192.168.0.246:5050/allure-report/index.html';
//const ALLURE_REPORT_URL = "c:/manikandan/automation projects/playwright_automation/allure-report/index.html";
const ALLURE_REPORT_URL = 'http://127.0.0.1:9090/allure-report/index.html';



class SendSlackReport {
    constructor(options) {
        this._options = options;
    }

    async onEnd(result) {
        try {
            const absoluteReportPath = path.resolve(ALLURE_REPORT_PATH);
            console.log("Allure Report Path:", absoluteReportPath);
            console.log("Allure Report URL:", ALLURE_REPORT_URL);

            if (!fs.existsSync(absoluteReportPath)) {
                console.error("❌ Allure report not found at:", absoluteReportPath);
                return;
            }

            let reportTitle = "Allure Test Report";
            try {
                const reportContent = fs.readFileSync(absoluteReportPath, 'utf8');
                const titleMatch = reportContent.match(/<title>(.*?)<\/title>/);
                if (titleMatch && titleMatch[1]) {
                    reportTitle = titleMatch[1];
                }
            } catch (titleError) {
                console.warn("⚠️ Could not extract report title:", titleError);
            }

            const message = {
                text: `📊 *${reportTitle}* \n ✅ View the latest test results: ${ALLURE_REPORT_URL}`
            };

            await axios.post(SLACK_WEBHOOK_URL, message);
            console.log("✅ Report sent to Slack successfully!");
        } catch (error) {
            console.error("❌ Error sending report:", error);
        }
    }
  
    
   
}

export default SendSlackReport;

