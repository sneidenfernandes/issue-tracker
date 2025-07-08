import ProjectLog from "@/app/components/ProjectLog"



export default function ProjectLayout({children}: {
    children: React.ReactNode
}){
    return (
        <div>
            {children}
            <ProjectLog/>
        </div>
    )
}