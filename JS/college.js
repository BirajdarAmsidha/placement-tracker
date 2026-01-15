let collegeContainer = document.getElementById("college-container");
let allColleges = []; // store loaded + new colleges

// --- HELPER: normalize college data ---
function normalizeCollege(c) {
    return {
        name: c.name || "N/A",
        affiliated_to: c.affiliated_to || "N/A",
        type: c.type || "N/A",
        established_year: c.established_year || "N/A",
        total_students: c.total_students || "N/A",
        location: c.location || { city: "N/A", state: "N/A", country: "N/A", pincode: "N/A" },
        departments: c.departments || []
    };
}

// --- RENDER COLLEGE CARDS ---
function renderColleges() {
    if (!allColleges.length) {
        collegeContainer.innerHTML = `<p style="text-align:center; color:#777;">No colleges found</p>`;
        return;
    }

    collegeContainer.innerHTML = allColleges.map((college, idx) => `
        <div class="college-card" data-index="${idx}">
            <h2>${college.name}</h2>
            <div class="college-info">
                <div><span>Affiliated To:</span><p>${college.affiliated_to}</p></div>
                <div><span>Type:</span><p>${college.type}</p></div>
                <div><span>Established:</span><p>${college.established_year}</p></div>
                <div><span>Total Students:</span><p>${college.total_students}</p></div>
                <div class="full-width"><span>Location:</span>
                    <p>${college.location.city}, ${college.location.state}, ${college.location.country} - ${college.location.pincode}</p>
                </div>
            </div>
            <br>
            <div class="full-width dept-container">
                ${college.departments.map(dep => `<span class="dept-chip">${dep}</span>`).join('')}
            </div>
            <div style="margin-top:10px; text-align:right;">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `).join("");

    attachCardEvents();
}

// --- LOAD COLLEGES FROM API ---
getCol().then((colleges) => {
    allColleges = (colleges || []).map(normalizeCollege);
    renderColleges();
});

// --- CREATE ADD BUTTON ---
let addBtn = document.querySelector("div > button");
addBtn.textContent = "Add College";
addBtn.classList.add("add-button");

// --- CREATE MODAL HTML ---
let modalHTML = `
<div id="collegeModal" class="modal">
    <div class="modal-content">
        <h3 id="modalTitle">Add College</h3>
        <input type="text" id="collegeName" placeholder="College Name">
        <input type="text" id="collegeAffiliated" placeholder="Affiliated To">
        <input type="text" id="collegeType" placeholder="Type">
        <input type="text" id="collegeYear" placeholder="Established Year">
        <input type="number" id="collegeStudents" placeholder="Total Students">
        <input type="text" id="collegeCity" placeholder="City">
        <input type="text" id="collegeState" placeholder="State">
        <input type="text" id="collegeCountry" placeholder="Country">
        <input type="text" id="collegePincode" placeholder="Pincode">
        <input type="text" id="collegeDepartments" placeholder="Departments (comma separated)">
        <div class="modal-actions">
            <button id="saveCollege" class="save-btn">Save</button>
            <button id="closeCollegeModal" class="close-btn">Cancel</button>
        </div>
    </div>
</div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

// --- Modal elements ---
let collegeModal = document.getElementById("collegeModal");
let modalTitle = document.getElementById("modalTitle");
let collegeName = document.getElementById("collegeName");
let collegeAffiliated = document.getElementById("collegeAffiliated");
let collegeType = document.getElementById("collegeType");
let collegeYear = document.getElementById("collegeYear");
let collegeStudents = document.getElementById("collegeStudents");
let collegeCity = document.getElementById("collegeCity");
let collegeState = document.getElementById("collegeState");
let collegeCountry = document.getElementById("collegeCountry");
let collegePincode = document.getElementById("collegePincode");
let collegeDepartments = document.getElementById("collegeDepartments");
let saveCollegeBtn = document.getElementById("saveCollege");
let closeCollegeModalBtn = document.getElementById("closeCollegeModal");

let editIndex = null;

// --- OPEN ADD MODAL ---
addBtn.addEventListener("click", () => {
    modalTitle.textContent = "Add College";
    [collegeName, collegeAffiliated, collegeType, collegeYear, collegeStudents,
     collegeCity, collegeState, collegeCountry, collegePincode, collegeDepartments].forEach(input => input.value = "");
    editIndex = null;
    collegeModal.style.display = "flex";
});

// --- CLOSE MODAL ---
closeCollegeModalBtn.addEventListener("click", () => {
    collegeModal.style.display = "none";
});

// --- SAVE COLLEGE (ADD / UPDATE) ---
saveCollegeBtn.addEventListener("click", () => {
    let newCollege = {
        name: collegeName.value.trim(),
        affiliated_to: collegeAffiliated.value.trim(),
        type: collegeType.value.trim(),
        established_year: collegeYear.value.trim(),
        total_students: collegeStudents.value.trim(),
        location: {
            city: collegeCity.value.trim(),
            state: collegeState.value.trim(),
            country: collegeCountry.value.trim(),
            pincode: collegePincode.value.trim()
        },
        departments: collegeDepartments.value.split(",").map(d => d.trim()).filter(Boolean)
    };

    if (!newCollege.name) {
        alert("College name is required");
        return;
    }

    if (editIndex !== null) {
        allColleges[editIndex] = newCollege; // update existing
    } else {
        allColleges.push(newCollege); // add new
    }

    renderColleges();
    collegeModal.style.display = "none";
});

// --- ATTACH EDIT / DELETE EVENTS ---
function attachCardEvents() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idx = e.target.closest(".college-card").dataset.index;
            let c = allColleges[idx];
            editIndex = idx;

            modalTitle.textContent = "Edit College";
            collegeName.value = c.name;
            collegeAffiliated.value = c.affiliated_to;
            collegeType.value = c.type;
            collegeYear.value = c.established_year;
            collegeStudents.value = c.total_students;
            collegeCity.value = c.location.city;
            collegeState.value = c.location.state;
            collegeCountry.value = c.location.country;
            collegePincode.value = c.location.pincode;
            collegeDepartments.value = c.departments.join(", ");
            collegeModal.style.display = "flex";
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idx = e.target.closest(".college-card").dataset.index;
            if (confirm(`Are you sure you want to delete ${allColleges[idx].name}?`)) {
                allColleges.splice(idx, 1);
                renderColleges();
            }
        });
    });
}

// --- CLOSE MODAL IF CLICK OUTSIDE ---
window.addEventListener("click", (e) => {
    if (e.target === collegeModal) collegeModal.style.display = "none";
});
