let collegeContainer = document.getElementById("college-container");

getCol().then((colleges) => {
    collegeContainer.innerHTML = colleges.map(college => `
        <div class="college-card">
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
        </div>
    `).join("");
});
