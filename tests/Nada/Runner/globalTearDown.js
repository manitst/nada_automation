import { execSync } from 'child_process';

import axios from 'axios'; 

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

export default async function globalTearDown() {
    try {
        console.log("🚀 Generating Allure report...");
        execSync('allure generate allure-results --clean -o allure-report');
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("✅ Allure report generated successfully!");

        await new Promise(resolve => setTimeout(resolve, 5000));


        // Optionally, open the report automatically
        //execSync('allure open allure-report');
       
        await sendReportToSlack();


    } catch (error) {
        console.error("❌ Error generating Allure report:", error);
    }
}


//const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/YOUR_WEBHOOK_URL";

async function sendReportToSlack() {
    try {
        const reportTitle = "📊 Allure Test Report";
        const message = { text: `${reportTitle}\n✅ View results: http://192.168.0.246:9090/index.html` };

        await axios.post(SLACK_WEBHOOK_URL, message);
        console.log("✅ Report sent to Slack successfully!");
    } catch (error) {
        console.error("❌ Error sending report to Slack:", error);
    }
}

(async () => {
   // await sendReportToSlack();
})();

//export default globalTeardown;