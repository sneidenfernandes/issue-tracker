"use client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { IssueStatus, IssuePriority } from "../types/issue-types";
import { useDialogContext } from "./DialogContext";
import axios from "axios";
import { projectIssueSchema } from "../types/zod/issue";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { Issue } from "../types/zod/issue";
import { toast } from "sonner";


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


    interface NewIssueBody {
    issueName: string, 
    issueDescription: string, 
    issuePriority: string, 
    issueStatus: string, 
    issueProjectId: string,
}




    const initialState = {
        issueName: "",
        issueDescription: "",
        issuePriority: "no-priority",
        issueStatus: "no-backlog",
        issueProjectId: "",
    }


    const isInitialState = (
        issueName === initialState.issueName &&
        issueDescription === initialState.issueDescription &&
        issuePriority === initialState.issuePriority &&
        issueProjectId === initialState.issueProjectId &&
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

    const createIssue = async({
       issueName, 
       issueDescription,
       issuePriority,
       issueStatus,
       issueProjectId

    }: NewIssueBody) => {

        try{

            const requestBody = {
                name: issueName,
                discription: issueDescription,
                priority: issuePriority,
                issueStatus: issueStatus,
                createdAt: String(new Date())
            }


            const isValid = projectIssueSchema.safeParse(requestBody);


            if(!isValid){
                return new Response(JSON.stringify({
                    message: "Invalid Schema!"
                }),
            {
                status: 422,
                headers:{
                    "Content-Type": "application/json"
                }
            })
            }


            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/issues/`,requestBody,{
                params:{
                    projectId: issueProjectId
                }
            })


            if(response.status !== 200){
                throw new Error(`Failed to create new issue for project : ${issueProjectId}`);
            }

        }catch(e){
            console.log(e);
            throw new Error(`Failed to create new Issue for project ${issueProjectId}`)
        }

    };

    const queryClient = useQueryClient();

    const addIssueMutation = useMutation({
        mutationFn: createIssue,

        onMutate: async (newIssue) => {

            await queryClient.cancelQueries({queryKey:["issues"]});

            const previousIssues = queryClient.getQueryData<Issue[]>(["issues"]);

            const optimisticIssue = {
                name: newIssue.issueName,
                description: newIssue.issueDescription,
                project: newIssue.issueProjectId,
                status: newIssue.issueStatus,
                priority: newIssue.issuePriority,
                date: String(new Date())
            }

            queryClient.setQueryData(["issues"], (old: Issue[]=[]) => [...old, optimisticIssue]);

            return {previousIssues}
        },

        onSuccess: () => {
            toast.success(`New Issue added!`)
        },

        onError:(err, _variables, context) => {
            if(context?.previousIssues){
                queryClient.setQueryData(["issues"], context.previousIssues);
            }

            toast.error("Failed to add New Issue!")
        }
    })










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

