let std_cont = document.getElementById("std-container");
let statusFilter = document.getElementById("statusFilter");

let allStudents;

let callStudents_from_api = async () =>{
    allStudents = await getStd();
    console.log(allStudents);
    displayStudents(allStudents)
    
}

callStudents_from_api()

let displayStudents = (stds) => {

    std_cont.innerHTML = stds.map((ele) => {
 
        let imgSrc = ele.personal_info?.profile_image
            ? ele.personal_info.profile_image
            : "https://via.placeholder.com/150";

        return `
            <div class="std-card"> 
                <img src="${imgSrc}" alt="Student Image">
                <h4>${ele.personal_info?.full_name || "No Name"}</h4>
                <p><strong>College:</strong> ${ele.academic_info?.college_id || "-"}</p>
                <p><strong>Status:</strong> ${ele.placement_status || "-"}</p>
                <button class="editbtn" onclick="editstd('${ele.student_id}')">Edit</button>
                <button class="dltbtn" onclick="dltstd('${ele.student_id}')">Delete</button>
            </div>
        `;
    }).join("");
};

// displayStudents()


let all_stds = document.getElementById('all_students')

all_stds.addEventListener('click', () =>{
    displayStudents(allStudents)
})

let placed_std = document.getElementById("placed_students")

placed_std.addEventListener("click", () =>{
    let filterPlaced = allStudents.filter((ele) =>{
        return ele.placement_status === 'Placed'
    });
    displayStudents(filterPlaced)
})


let not_Placed_Std = document.getElementById("not_placed_students")

not_Placed_Std.addEventListener("click", () =>{
    let filterNotPlaced = allStudents.filter((ele) =>{
        return ele.placement_status === 'Not Placed'
    });
    displayStudents(filterNotPlaced)
})
 

let add = document.getElementById("add_students");
add.addEventListener('click', () => {
    window.location.href = '../HTML/add_student.html'
})


let dltstd = async(id) =>{
    let confirmmsg = confirm("Are you sure")
    if (!confirmmsg) return;
    await fetch(`https://placementstracker-4.onrender.com/api/students/${id}`,{
        method:"DELETE"
    })

    callStudents_from_api()
}

let editstd = (id) =>{
    // console.log("edit",id);
    window.location.href = `../HTML/edit_student.html?id=${id}`

}