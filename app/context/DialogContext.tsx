"use client";

import { createContext, useState, useContext } from "react";

interface DialogContextType {
    showDialog: boolean,
    openDialog: (args: {message: string, description: string, type: string, positiveFunction: () => void}) => void,
    cancelDialog: () => void,
    handlePositive: () => void,
    message: string,
    description: string,
    type: string
    
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DeleteDialogContextProvider({ children }: { children: React.ReactNode }) {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [message,setMessage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [positiveFunction, setPositiveFunction] = useState<(()=> void) | null>(null);
    
    

    function cancelDialog() {
         setShowDialog(false);

         setTimeout(()=>{
             setMessage("");
             setDescription("");
             setType("");
         },1000)
        
         setPositiveFunction(null);
    }

    function handlePositive() {
        setShowDialog(false);
        positiveFunction?.();
    }

    function openDialog({message,description,type,positiveFunction}: {message : string, description: string, type: string, positiveFunction: () => void}) {
        setMessage(message);
        setDescription(description);
        setType(type);    
        setPositiveFunction(() => positiveFunction);
        setShowDialog(true);
    }

   
    const value = {
        showDialog,
        openDialog,
        cancelDialog,
        handlePositive,
        message,
        description,
        type,
    };

    return (
        <DialogContext.Provider value={value}>
            {children}
        </DialogContext.Provider>
    );
}

export function useDialogContext() {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error("Context is not defined");
    }
    return context;
}
