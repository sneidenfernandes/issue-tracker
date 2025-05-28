import IssueLog from "@/app/components/IssueLog"



export default function IssuesLayout({children}: {
    children: React.ReactNode
}){
    return (
        <div className="ml-72">
            {children}
            <IssueLog/>
        </div>
    )
}