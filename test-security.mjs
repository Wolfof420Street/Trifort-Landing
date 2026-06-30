import fs from 'fs';

async function runTests() {
  console.log("Starting Security Verification Tests...\n");

  const baseUrl = "http://localhost:3000";

  // Test 1: Verify /api/upload requires auth
  console.log("--- PRIORITY 1.1: Verify /api/upload Auth ---");
  try {
    const uploadRes = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: new FormData(), // empty form data
    });
    console.log(`[Result] POST /api/upload without cookie: HTTP ${uploadRes.status}`);
    const text = await uploadRes.text();
    console.log(`[Result] Body: ${text}`);
    if (uploadRes.status === 401) {
      console.log("✅ Success: /api/upload correctly rejected unauthorized request.");
    } else {
      console.log("❌ Failure: /api/upload did not return 401.");
    }
  } catch (err) {
    console.error("Error testing /api/upload:", err.message);
  }

  // Test 2: Brute-force protection on login
  console.log("\n--- PRIORITY 1.2: Login Brute-force Protection ---");
  let finalStatus = 0;
  for (let i = 1; i <= 6; i++) {
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "admin@example.com", password: "wrongpassword" })
    });
    const data = await loginRes.json();
    console.log(`Attempt ${i}: HTTP ${loginRes.status} - ${JSON.stringify(data)}`);
    finalStatus = loginRes.status;
  }
  if (finalStatus === 429) {
    console.log("✅ Success: /api/auth/login rate limiting is working (returned 429 after 5 attempts).");
  } else {
    console.log("❌ Failure: Rate limiting failed.");
  }

  // Test 3: Cookie Security Check
  console.log("\n--- PRIORITY 1.3: Cookie Security ---");
  // We need a successful login to get the cookies
  // We don't have the correct password here, but we can inspect the source code 
  // or we can test it if we create a test user or bypass it.
  // Let's just output the findings from source code for now, or if we can get a login.
  console.log("Inspecting src/app/api/auth/login/route.ts:");
  const loginSrc = fs.readFileSync('src/app/api/auth/login/route.ts', 'utf-8');
  const cookieSettings = loginSrc.match(/response\.cookies\.set\(\{[\s\S]*?\}\);/g);
  if (cookieSettings) {
    cookieSettings.forEach(match => {
      console.log("Found Cookie Setting:");
      console.log(match);
      if (match.includes('httpOnly: true') && match.includes('secure: process.env.NODE_ENV === "production"') && match.includes('sameSite: "strict"')) {
         console.log("✅ Success: Cookies have httpOnly, secure (in prod), and sameSite=strict set.");
      }
    });
  }
}

runTests();
