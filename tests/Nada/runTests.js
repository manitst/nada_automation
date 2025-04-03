import TestRunner from '../Nada/TestRunner.js';
import HomePage from '../Nada/Pages/homePage.js';
import ContactPage from '../Nada/Pages/contactPage.js';

(async () => {
    const runner = new TestRunner();
    

    await runner.setup();
    //console.log("Page after setup:", runner.page);


    const contactpage = new ContactPage(runner.page);
   

    // Adding test cases with tags
    runner.addTest(new HomePage(runner.page), ['sanity', 'smoke']);
    runner.addTest(new ContactPage(runner.page), ['regression']);

    // Run only tests tagged as 'sanity'
    console.log("Test Cases Array:", runner.testCases);
    runner.testCases.forEach(test => console.log("Instance:", test.instance));


    await runner.runTests('regression');

    await runner.cleanup();
})();