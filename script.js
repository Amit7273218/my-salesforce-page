document.addEventListener("DOMContentLoaded", async function () {
    // Get Account IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const accountIds = urlParams.get("accountIds");

    const contactContainer = document.getElementById("contactContainer");

    if (!accountIds) {
        contactContainer.innerHTML = "<h3>No Accounts Selected</h3>";
        return;
    }

    // Salesforce REST API Call (Replace with your actual Salesforce instance URL)
    const instanceUrl = "https://wise-fox-f978g0-dev-ed.trailblaze.lightning.force.com";
    const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with a valid OAuth access token

    try {
        const response = await fetch(`${instanceUrl}/services/data/v59.0/query/?q=SELECT+Id,Name,Email+FROM+Contact+WHERE+AccountId+IN+(${accountIds})`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if (data.records.length === 0) {
            contactContainer.innerHTML = "<h3>No Associated Contacts Found</h3>";
            return;
        }

        let contactsHTML = "<h3>Associated Contacts</h3><table><tr><th>Name</th><th>Email</th></tr>";

        data.records.forEach(contact => {
            contactsHTML += `<tr><td>${contact.Name}</td><td>${contact.Email || "N/A"}</td></tr>`;
        });

        contactsHTML += "</table>";
        contactContainer.innerHTML = contactsHTML;
    } catch (error) {
        contactContainer.innerHTML = "<h3>Error Fetching Contacts</h3>";
        console.error(error);
    }
});
