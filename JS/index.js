let index = async() =>{
    let stds = await getStd();
    let clgs = await getCol();
    let coms = await getCom();
    let jobs = await getjob();
    console.log(jobs);
    
    let stdbox = document.getElementById("Students")
    let clgbox = document.getElementById("Colleges")
    let combox = document.getElementById("Companies")
    let jobbox = document.getElementById("Jobs")
    stdbox.innerHTML = `<h2>Total Studets : ${stds.length} </h2>`
    clgbox.innerHTML = `<h2>Total Colleges : ${clgs.length} </h2>`
    combox.innerHTML = `<h2>Total Companies : ${coms.length} </h2>`
    jobbox.innerHTML = `<h2>Total Jobs : ${jobs.length} </h2>`
    // stdbox.innerHTML = `<h3> name : ${stds.persl_info}</h3>`


    
}

index()