"use client";
import { useDialogContext } from "../context/DialogContext";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";


export default function Dialog() {
	const {showDialog, cancelDialog, handlePositive, message, description,type} = useDialogContext();


	return (
        <div className="z-200" onClick={(e) => e.stopPropagation()}>
        <AlertDialog open={showDialog} >	
			<AlertDialogContent>
				<AlertDialogTitle>
					{message}
				</AlertDialogTitle>
				<AlertDialogDescription>
					{description}
				</AlertDialogDescription>
				<div className="flex justify-end gap-4">
					<AlertDialogCancel asChild onClick={(e) => {
						e.stopPropagation();
						cancelDialog();
					}}>
						<button type="button">Cancel</button>
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-900/80 hover:bg-red-900/100"
						asChild
						onClick={() => handlePositive()}
					>
						<button type="button">{type}</button>
					</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
        </div>
	);
}