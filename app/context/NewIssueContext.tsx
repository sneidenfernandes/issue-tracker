"use client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface NewIssueContextType {
   visible: boolean,
   setIssueName:  Dispatch<SetStateAction<string | null>>;
   setIssueDescription: Dispatch<SetStateAction<string | null>>;
   openIssueLog: () => void;
   closeIssueLog: () => void;
   saveIssue: () => void;

}


const NewIssueContext = createContext<NewIssueContextType | undefined>(undefined)



export function NewIssueContextProvider({children}: {children : React.ReactNode}){
    const [visible, setVisible] = useState<boolean>(false);
    const [issueName, setIssueName] = useState<string | null>("");
    const [issueDescription, setIssueDescription] = useState<string | null>("")


    const saveIssue = async () => {

        console.log(issueName, issueDescription);

    }


    const openIssueLog = () => {setVisible(true)};

    const closeIssueLog = () => {setVisible(false)};


    const value = {
        visible,
        setIssueDescription,
        setIssueName,
        saveIssue,
        openIssueLog,
        closeIssueLog,
    }

    return <NewIssueContext.Provider value={value}>{children}</NewIssueContext.Provider>
}


export default function useNewIssueContext(){

    const context = useContext(NewIssueContext);

    if(context === undefined){
        throw Error("newIssueContext is not defined.");
    }


    return context;
    
}

