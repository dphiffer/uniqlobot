const puppeteer = require('puppeteer');
const { promisify } = require('util');
const got = require('got');
const { CookieJar } = require('tough-cookie');
const cookieJar = new CookieJar();
const setCookie = promisify(cookieJar.setCookie.bind(cookieJar));

(async function() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://www.uniqlo.com/');
	// await page.screenshot({ path: 'shorts.png' });
	// await page.click('.add-to-card-btn');
	// await page.goto('https://www.uniqlo.com/us/en/cart/');
	// await browser.close();
	// That's the takeaway: set puppeteer cookies to CookieJar
	const cookies = await page.cookies()
	cookies.forEach(
		async cookie => {
			await setCookie(
				`${cookie.name}=${cookie.value}`,
				'https://www.uniqlo.com'
			)
		}
	);

	await setCookie('test_cookie=1', 'https://www.uniqlo.com');
	const { request } = await got('https://www.example.com', { cookieJar });
	console.log(request.gotOptions.headers.cookie);
})();
