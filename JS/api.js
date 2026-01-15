let basURL = "https://placementstracker-4.onrender.com/api"
let getStd = async () =>{
    return fetch(`${basURL}/students`).then((res)=>{
        return res.json()
    })
}


let getCol = async () =>{
    return fetch(`${basURL}/colleges`).then((res)=>{
        return res.json()
    })
}

let getCom = async () =>{
    return fetch(`${basURL}/companies`).then((res)=>{
        return res.json()
    })
}

let getjob = async () =>{
    return fetch(`${basURL}/job-roles`).then((res)=>{
        return res.json()
    })
}