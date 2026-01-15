let roleContainer = document.getElementById("role-container");

getjob().then((roles) => {
    roleContainer.innerHTML = roles.map(role => `
        <div class="role-card">
            <div class="role-id">${role.role_id}</div>
            <h3>${role.title}</h3>
        </div>
    `).join("");
});
