let companyBody = document.getElementById("company-body");
let allCompanies = []; // store loaded + new companies

// --- HELPER: normalize inconsistent company data ---
function normalizeCompany(c) {
    return {
        company_id: c.company_id || c.companie_id || "N/A",
        name: c.name || c.company_name || "N/A",
        industry: c.industry || "N/A"
    };
}

// --- LOAD COMPANIES FROM API ---
const loadCompanies = async () => {
    let companies = await getCom();
    console.log(companies);

    // Normalize and store in allCompanies
    allCompanies = (companies || []).map(normalizeCompany);

    renderCompaniesTable(); // always render from allCompanies
};

// --- RENDER TABLE ---
function renderCompaniesTable() {
    if (!allCompanies.length) {
        companyBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;color:#777;">No companies found</td>
            </tr>
        `;
        return;
    }

    companyBody.innerHTML = allCompanies.map((c, idx) => `
        <tr data-index="${idx}">
            <td>${c.company_id}</td>
            <td>${c.name}</td>
            <td>${c.industry}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join("");

    attachTableEvents(); // attach edit/delete events
}

// --- ADD COMPANY MODAL ---
let addBtn = document.createElement("button");
addBtn.textContent = "Add Company";
addBtn.id = "add_company";
addBtn.classList.add("add-button");
document.body.insertBefore(addBtn, document.getElementById("company-container"));

// Modal HTML
let modalHTML = `
<div id="companyModal" class="modal">
    <div class="modal-content">
        <h3 id="modalTitle">Add Company</h3>
        <input type="text" id="modalCompanyId" placeholder="Company ID">
        <input type="text" id="modalCompanyName" placeholder="Company Name">
        <input type="text" id="modalCompanyIndustry" placeholder="Industry">
        <div class="modal-actions">
            <button id="saveCompany" class="save-btn">Save</button>
            <button id="closeCompanyModal" class="close-btn">Cancel</button>
        </div>
    </div>
</div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

// Modal elements
let companyModal = document.getElementById("companyModal");
let modalCompanyId = document.getElementById("modalCompanyId");
let modalCompanyName = document.getElementById("modalCompanyName");
let modalCompanyIndustry = document.getElementById("modalCompanyIndustry");
let saveCompanyBtn = document.getElementById("saveCompany");
let closeCompanyModalBtn = document.getElementById("closeCompanyModal");
let modalTitle = document.getElementById("modalTitle");

let editIndex = null; // tracks which company is being edited

// --- OPEN ADD MODAL ---
addBtn.addEventListener("click", () => {
    modalTitle.textContent = "Add Company";
    modalCompanyId.value = "";
    modalCompanyName.value = "";
    modalCompanyIndustry.value = "";
    editIndex = null;
    companyModal.style.display = "flex";
});

// --- CLOSE MODAL ---
closeCompanyModalBtn.addEventListener("click", () => {
    companyModal.style.display = "none";
});

// --- SAVE COMPANY (ADD / UPDATE) ---
saveCompanyBtn.addEventListener("click", () => {
    let id = modalCompanyId.value.trim();
    let name = modalCompanyName.value.trim();
    let industry = modalCompanyIndustry.value.trim();

    if (!id || !name || !industry) {
        alert("Please fill all fields.");
        return;
    }

    if (editIndex !== null) {
        // Update existing
        allCompanies[editIndex] = { company_id: id, name, industry };
    } else {
        // Add new
        allCompanies.push({ company_id: id, name, industry });
    }

    renderCompaniesTable();
    companyModal.style.display = "none";
});

// --- ATTACH EDIT / DELETE EVENTS ---
function attachTableEvents() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idx = e.target.closest("tr").dataset.index;
            let c = allCompanies[idx];
            editIndex = idx;

            modalTitle.textContent = "Edit Company";
            modalCompanyId.value = c.company_id;
            modalCompanyName.value = c.name;
            modalCompanyIndustry.value = c.industry;
            companyModal.style.display = "flex";
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idx = e.target.closest("tr").dataset.index;
            if (confirm(`Are you sure you want to delete ${allCompanies[idx].name}?`)) {
                allCompanies.splice(idx, 1);
                renderCompaniesTable();
            }
        });
    });
}

// --- CLOSE MODAL IF CLICK OUTSIDE ---
window.addEventListener("click", (e) => {
    if (e.target === companyModal) {
        companyModal.style.display = "none";
    }
});

// --- INITIAL LOAD ---
loadCompanies();
