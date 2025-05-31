"use client";
import { createContext, useContext, useState } from "react";

interface SearchContextType {
    closeSearch: () => void,
    openSearch: () => void,
    showSearch: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);


export function SearchContextProvider({children}:{children: React.ReactNode}){

    const [showSearch, setShowSearch] = useState<boolean>(false)

    


    const closeSearch = () => {
        setShowSearch(false);
    }

    const openSearch = () => {
        setShowSearch(true);
    }


    const value = {
        closeSearch,
        openSearch,
        showSearch
    }
    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}




export default function useSearchContext(){
    const context = useContext(SearchContext);
    if(context === undefined){
        throw Error("context is not defined")
    }

    return context;
}