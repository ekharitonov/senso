const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();

        // Intercept API calls
        await page.route('https://formspree.io/f/xwvngvge', async route => {
            await route.fulfill({ status: 200, json: { ok: true } });
        });
        await page.route('http://localhost:7861/api/v1/diagnostic-booth', async route => {
            const mockResponse = {
                session_complete: true,
                diagnosis: "Core systemic misalignment between Technical Leadership and Product Vision.",
                rootCause: "Ego clash and lack of shared OKRs. The CTO feels bypassed by the new VP of Product's agile rollout.",
                impact: "$340,000 in delayed releases, elevated technical debt.",
                intervention: "Immediate: Facilitate a structured 3-way alignment session.",
                spokenResponse: "I see what's happening. The cost of this friction is huge. Let me generate your report.",
                nodes: [], edges: []
            };
            await route.fulfill({ json: mockResponse });
        });

        console.log("Navigating to Live Demo...");
        await page.goto('http://localhost:5174/live-demo');

        await page.waitForSelector('textarea:not([disabled])', { timeout: 10000 });

        console.log("Sending message to trigger mock backend...");
        await page.fill('textarea', "My team is struggling.");
        await page.press('textarea', 'Enter');

        console.log("Waiting for PDF button...");
        await page.waitForSelector('button:has-text("Get Full Action Plan (PDF)")', { state: 'visible', timeout: 10000 });
        console.log("✅ PDF Download Button appeared!");

        console.log("Opening Contact Gate...");
        await page.click('button:has-text("Get Full Action Plan (PDF)")');

        console.log("Filling out Contact Gate form...");
        await page.waitForSelector('#rg-name', { state: 'visible', timeout: 5000 });
        await page.fill('#rg-name', 'Test User');
        await page.fill('#rg-email', 'test@example.com');
        await page.fill('#rg-company', 'Test Corp');

        console.log("Submitting form and waiting for PDF download...");
        const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 15000 }),
            page.click('button:has-text("Send & Download")')
        ]);

        const savePath = './SENSO_Diagnostic_Report.pdf';
        await download.saveAs(savePath);
        console.log("✅ Download saved successfully to:", savePath);
    } catch (e) {
        console.log("❌ Test failed.");
        console.error(e);
    } finally {
        await browser.close();
    }
})();
