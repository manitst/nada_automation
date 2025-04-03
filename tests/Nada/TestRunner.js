import { chromium } from '@playwright/test'


export default class TestRunner {
    
    

    constructor() {
        
        this.browser = null;
        this.page = null;
        this.testCases = [];
    }
    

    async setup() {
        
        this.browser = await chromium.launch({ headless: false });
        this.page = await this.browser.newPage();
       
    }

    addTest(testInstance, tags) {
        this.testCases.push({ instance: testInstance, tags });
    }

     async runTests(filterTag) {
        for (let test of this.testCases) {
            if (!filterTag || test.tags.includes(filterTag)) {
                console.log(`Executing Test: ${test.instance.TestRunner} [Tag: ${test.tags.join(',')}]`);
                const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(test.instance));
                const testMethods = methodNames.filter(method => method !== 'constructor' && !method.startsWith('_'));
                console.log("Methods to execute:", testMethods);
                for (let method of testMethods) {
                    if (typeof test.instance[method] === "function") {
                        await test.instance[method]();
                }
                //await test.instance.execute(this.page);
                //await test.instance.verify(this.page);
                //await test.instance.clickApplyNowButton();
                
            }
        }
    }
}

    async cleanup() {
        await this.browser.close();
    }
}

//export default TestRunner;
