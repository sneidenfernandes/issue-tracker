"use client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { IssueStatus, IssuePriority } from "../types/issue-types";
import { useDialogContext } from "./DialogContext";


interface NewIssueContextType {
   visible: boolean,
   setIssueName:  Dispatch<SetStateAction<string>>,
   setIssueDescription: Dispatch<SetStateAction<string>>,
   setIssuePriority: Dispatch<SetStateAction<string>>, 
   setIssueStatus: Dispatch<SetStateAction<string>>,
   setIssueProjectId : Dispatch<SetStateAction<string>>,
   setVisible: Dispatch<SetStateAction<boolean>>,
   issueName: string, 
   issueDescription: string,
   issuePriority: string, 
   issueStatus: string, 
   issueProjectId: string,
   cancelIssue: () => void
}


const NewIssueContext = createContext<NewIssueContextType | undefined>(undefined)



export function NewIssueContextProvider({children}: {children : React.ReactNode}){
    const [visible, setVisible] = useState<boolean>(false);
    const [issueName, setIssueName] = useState<string>("");
    const [issueDescription, setIssueDescription] = useState<string>("");
    const [issuePriority, setIssuePriority] = useState<string>(IssuePriority.NO_PRIORITY);
    const [issueStatus, setIssueStatus] = useState<string>(IssueStatus.BACKLOG);
    const [issueProjectId, setIssueProjectId] = useState<string>("");

    const {openDialog, cancelDialog} = useDialogContext();



    const initialState = {
        issueName: "",
        issueDescription: "",
        issuePriority: "no-priority",
        issueStatus: "no-backlog",
        issueProjectId: "",
    }


    const isInitialState = (
        issueName === initialState.issueName,
        issueDescription === initialState.issueDescription,
        issuePriority === initialState.issuePriority,
        issueProjectId === initialState.issueProjectId,
        issueStatus === initialState.issueStatus
    )






    const resetIssueDetails = () => {

        setIssueName(initialState.issueName);
        setIssueDescription(initialState.issueDescription);
        setIssuePriority(initialState.issuePriority);
        setIssueStatus(initialState.issueStatus);
        setIssueProjectId(initialState.issueProjectId);

    }


    const cancelIssue = () => {

        if(!isInitialState){
            openDialog({      message:  "Are you sure want to cancel this issue?", 
                              description:"All issue details will be lost permanantly.", 
                              type:"Proceed",
                              positiveFunction: () => {
                                cancelDialog();
                                setVisible(false);
                                resetIssueDetails();
                              }
                            });
            return;
        }
        setVisible(false);

    }








    const value = {
        visible,
        setIssueDescription,
        setIssueName,
        setIssuePriority,
        setIssueStatus,
        setIssueProjectId,
        setVisible,
        issueProjectId,
        issueDescription,
        issueName,
        issuePriority,
        issueStatus,
        cancelIssue
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

