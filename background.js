function checkUrlSafety(url) {
    const apiKey = 'AIzaSyD9y-wK60ef3-mmXC6zgOwxXToqZzUpUWk';
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  
    const requestBody = {
      client: {
        clientId: "yourcompanyname",
        clientVersion: "1.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
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
        console.log('Safe Browsing API Response:', data);
        if (data.matches) {
          let threatTypes = data.matches.map(match => match.threatType).join(', ');
          alert(`The URL is not safe! Detected threats: ${threatTypes}`);
        } else {
          console.log(`The URL is safe.`);
        }
      })
      .catch(error => console.error('Error:', error));
  }
  