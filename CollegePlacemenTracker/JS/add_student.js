// let std_form = document.getElementById("Student_form")

// std_form.addEventListener('submit', async (e) =>{
//     e.preventDefault();
//     console.log();
//     let student = {
//         personal_info:{
//             full_name : fullName.value,
//             gender : gender.value,
//             date_of_birth : dob.value,
//             profile_image : profileImage.value
//         },
//         academic_info : {
//             college_id : collegeId.value,
//             department : department.value,
//             degree : degree.value,
//             graduation_year : graduationYear.value,
//             cgpa : cgpa.value,
//             backlogs : backlogs.value
//         },
//         skills : {
//             programming : programming.value.split(","),
//             databases : databases.value.split(","),
//             tools : tools.value.split(","),
//         },
//         placement_status : placementStatus.value,
//     };

//     console.log(student);
    
//     await fetch("https://placementstracker-4.onrender.com/api/students",{
//         method : "POST",
//         headers : {"content-type":"application/json"},
//         body : JSON.stringify(student)
//     });

//     alert("Added successfully....")
// })



function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


let std_form = document.getElementById("Student_form");

std_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let imageBase64 = "";

    if (profileImage.files.length > 0) {
        imageBase64 = await toBase64(profileImage.files[0]);
    }

    let student = {
        personal_info: {
            full_name: fullName.value,
            gender: gender.value,
            date_of_birth: dob.value,
            profile_image: imageBase64    
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

    try {
        let res = await fetch(
            "https://placementstracker-4.onrender.com/api/students",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            }
        );

        if (!res.ok) throw new Error("Failed");

        alert("Student added successfully ");
        std_form.reset();

    } catch (err) {
        console.error(err);
        alert("Server error ");
    }
});
