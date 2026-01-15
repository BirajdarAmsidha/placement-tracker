// GET ID FROM URL
let params = new URLSearchParams(window.location.search);
let id = params.get("id");

// GET FORM ELEMENTS
let fullName = document.getElementById("fullName");
let gender = document.getElementById("gender");
let dob = document.getElementById("dob");
let collegeId = document.getElementById("collegeId");
let profileImage = document.getElementById("profileImage");
let department = document.getElementById("department");
let degree = document.getElementById("degree");
let graduationYear = document.getElementById("graduationYear");
let cgpa = document.getElementById("cgpa");
let backlogs = document.getElementById("backlogs");
let programming = document.getElementById("programming");
let databases = document.getElementById("databases");
let tools = document.getElementById("tools");
let placementStatus = document.getElementById("placementStatus");
let preview = document.getElementById("profilePreview");

let oldImage = "";

// LOAD STUDENT DATA
async function loadStudent() {
    let res = await fetch(`https://placementstracker-4.onrender.com/api/students/${id}`);
    let student = await res.json();

    fullName.value = student.personal_info.full_name;
    gender.value = student.personal_info.gender;
    dob.value = student.personal_info.date_of_birth;
    collegeId.value = student.academic_info.college_id;
    department.value = student.academic_info.department;
    degree.value = student.academic_info.degree;
    graduationYear.value = student.academic_info.graduation_year;
    cgpa.value = student.academic_info.cgpa;
    backlogs.value = student.academic_info.backlogs;
    programming.value = student.skills.programming.join(",");
    databases.value = student.skills.databases.join(",");
    tools.value = student.skills.tools.join(",");
    placementStatus.value = student.placement_status;

    oldImage = student.personal_info.profile_image;
    preview.src = oldImage;
}

loadStudent();

// SHOW IMAGE PREVIEW
profileImage.addEventListener("change", () => {
    preview.src = URL.createObjectURL(profileImage.files[0]);
});

// CONVERT IMAGE TO BASE64
function toBase64(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// SUBMIT FORM
document.getElementById("Student_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    let image = oldImage;

    if (profileImage.files.length > 0) {
        image = await toBase64(profileImage.files[0]);
    }

    let student = {
        personal_info: {
            full_name: fullName.value,
            gender: gender.value,
            date_of_birth: dob.value,
            profile_image: image
        },
        academic_info: {
            college_id: collegeId.value,
            department: department.value,
            degree: degree.value,
            graduation_year: graduationYear.value,
            cgpa: cgpa.value,
            backlogs: backlogs.value
        },
        skills: {
            programming: programming.value.split(","),
            databases: databases.value.split(","),
            tools: tools.value.split(",")
        },
        placement_status: placementStatus.value
    };

    await fetch(`https://placementstracker-4.onrender.com/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    alert("Student updated successfully");
});
