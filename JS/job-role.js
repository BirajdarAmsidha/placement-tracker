let roleContainer = document.getElementById("role-container");
let allRoles = []; // store existing + new roles

// Modal elements
let addRoleBtn = document.getElementById("add_role");
let roleModal = document.getElementById("roleModal");
let saveRoleBtn = document.getElementById("saveRole");
let closeModalBtn = document.getElementById("closeModal");
let roleIdInput = document.getElementById("roleId");
let roleTitleInput = document.getElementById("roleTitle");

// Fetch existing roles
getjob().then((roles) => {
    allRoles = roles; // save existing roles
    renderRoles();
});

// Function to render roles
function renderRoles() {
    roleContainer.innerHTML = allRoles.map(role => `
        <div class="role-card">
            <div class="role-id">${role.role_id}</div>
            <h3>${role.title}</h3>
        </div>
    `).join("");
}

// Function to add a new role
function addRole(newRole) {
    allRoles.push(newRole); // add new role to array
    renderRoles();          // re-render all roles including new one
}

// Open modal
addRoleBtn.addEventListener("click", () => {
    roleModal.style.display = "flex";
});

// Close modal
closeModalBtn.addEventListener("click", () => {
    roleModal.style.display = "none";
    roleIdInput.value = "";
    roleTitleInput.value = "";
});

// Save new role
saveRoleBtn.addEventListener("click", () => {
    let roleId = roleIdInput.value.trim();
    let roleTitle = roleTitleInput.value.trim();

    if(roleId && roleTitle) {
        addRole({ role_id: roleId, title: roleTitle });
        roleModal.style.display = "none";
        roleIdInput.value = "";
        roleTitleInput.value = "";
    } else {
        alert("Please enter both Role ID and Title.");
    }
});

// Close modal if clicked outside content
window.addEventListener("click", (e) => {
    if(e.target === roleModal) {
        roleModal.style.display = "none";
        roleIdInput.value = "";
        roleTitleInput.value = "";
    }
});
