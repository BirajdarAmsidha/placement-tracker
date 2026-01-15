let companyBody = document.getElementById("company-body");

const loadCompanies = async () => {
    let companies = await getCom();
    console.log(companies);

    if (!companies || companies.length === 0) {
        companyBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;color:#777;">
                    No companies found
                </td>
            </tr>
        `;
        return;
    }

    companyBody.innerHTML = companies.map(c => `
        <tr>
            <td>${c.company_id}</td>
            <td>${c.name}</td>
            <td>${c.industry}</td>
        </tr>
    `).join("");
};

loadCompanies();
