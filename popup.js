document.getElementById('checkButton').addEventListener('click', async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    checkUrlSafety(currentTab.url);
  });
  
  function checkUrlSafety(url) {
    const apiKey = 'AIzaSyD9y-wK60ef3-mmXC6zgOwxXToqZzUpUWk';
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  
    const requestBody = {
      client: {
        clientId: "yourcompanyname",
        clientVersion: "1.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
        platformTypes: ["WINDOWS"],
        threatEntryTypes: ["URL"],
        threatEntries: [
          { url }
        ]
      }
    };
  
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const statusDiv = document.getElementById('status');
        if (data.matches) {
          statusDiv.textContent = `The URL is not safe!`;
          statusDiv.style.color = 'red';
        } else {
          statusDiv.textContent = `The URL is safe.`;
          statusDiv.style.color = 'green';
        }
      })
      .catch(error => console.error('Error:', error));
  }
  