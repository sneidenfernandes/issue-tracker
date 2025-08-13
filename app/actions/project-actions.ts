
 export  const fetchProjects = async () => {
        const response = await fetch("/api/projects");
        if(!response.ok) throw new Error("Failed to fetch projects!")
        const data = await response.json();
        console.log(data);
        return data.projects;
    }