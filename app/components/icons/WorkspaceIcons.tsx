

export function ProjectIcon({className = "", size="16px"}) {
    return (
        <svg
            className={`${className.length > 0 ? className : "text-neutral-400"}`}
            width={size}
            height={size}
            strokeWidth="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.52844 7.29357L11.7086 11.8381C11.8898 11.9388 12.1102 11.9388 12.2914 11.8381L20.5 7.27777"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 21L12 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


export function ViewsIcon() {
    return (
        <svg
            className="text-gray-400"
            width="18px"
            height="18px"
            strokeWidth="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.8476 13.317L9.50515 18.2798C8.70833 19.1905 7.29167 19.1905 6.49485 18.2798L2.15238 13.317C1.49259 12.563 1.49259 11.437 2.15238 10.683L6.49485 5.72018C7.29167 4.80952 8.70833 4.80952 9.50515 5.72017L13.8476 10.683C14.5074 11.437 14.5074 12.563 13.8476 13.317Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 19L17.8844 13.3016C18.5263 12.5526 18.5263 11.4474 17.8844 10.6984L13 5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 19L21.8844 13.3016C22.5263 12.5526 22.5263 11.4474 21.8844 10.6984L17 5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}



export function SidbarToggleIcon(){
    return (
        <svg className="hover:text-neutral-50"   width="16" height="16" viewBox="0 0 16 16" fill="lch(62.6% 1.35 272 / 1)" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15 5.25A3.25 3.25 0 0 0 11.75 2h-7.5A3.25 3.25 0 0 0 1 5.25v5.5A3.25 3.25 0 0 0 4.25 14h7.5A3.25 3.25 0 0 0 15 10.75v-5.5Zm-3.5 7.25H7v-9h4.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2Zm-6 0H4.25a1.75 1.75 0 0 1-1.75-1.75v-5.5c0-.966.784-1.75 1.75-1.75H5.5v9Z"></path></svg>
    )
}


export function OverviewIcon(){
    return (
        <svg className="group-hover:text-neutral-50" width="16" height="16" viewBox="0 0 16 16" fill="lch(62.6% 1.35 272 / 1)" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.27248 2.36502C2 2.8998 2 3.59987 2 5V11C2 12.4001 2 13.1002 2.27248 13.635C2.51217 14.1054 2.89462 14.4878 3.36502 14.7275C3.8998 15 4.59987 15 6 15H10C11.4001 15 12.1002 15 12.635 14.7275C13.1054 14.4878 13.4878 14.1054 13.7275 13.635C14 13.1002 14 12.4001 14 11V5C14 3.59987 14 2.8998 13.7275 2.36502C13.4878 1.89462 13.1054 1.51217 12.635 1.27248C12.1002 1 11.4001 1 10 1H6C4.59987 1 3.8998 1 3.36502 1.27248C2.89462 1.51217 2.51217 1.89462 2.27248 2.36502ZM4.07612 3.61732C4 3.80109 4 4.03406 4 4.5C4 4.96594 4 5.19891 4.07612 5.38268C4.17761 5.62771 4.37229 5.82239 4.61732 5.92388C4.80109 6 5.03406 6 5.5 6C5.96594 6 6.19891 6 6.38268 5.92388C6.62771 5.82239 6.82239 5.62771 6.92388 5.38268C7 5.19891 7 4.96594 7 4.5C7 4.03406 7 3.80109 6.92388 3.61732C6.82239 3.37229 6.62771 3.17761 6.38268 3.07612C6.19891 3 5.96594 3 5.5 3C5.03406 3 4.80109 3 4.61732 3.07612C4.37229 3.17761 4.17761 3.37229 4.07612 3.61732ZM4 8.5C4 8.22386 4.22386 8 4.5 8H11.5C11.7761 8 12 8.22386 12 8.5V9C12 9.27614 11.7761 9.5 11.5 9.5H4.5C4.22386 9.5 4 9.27614 4 9V8.5ZM4.5 11C4.22386 11 4 11.2239 4 11.5V12C4 12.2761 4.22386 12.5 4.5 12.5H9.5C9.77614 12.5 10 12.2761 10 12V11.5C10 11.2239 9.77614 11 9.5 11H4.5Z"></path></svg>
    )
}

export function IssuesIcon(){
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="lch(62.6% 1.35 272 / 1)" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13.25 5.25C14.2165 5.25 15 6.0335 15 7V11.75C15 13.5449 13.5449 15 11.75 15H6.75C5.7835 15 5 14.2165 5 13.25C5 12.8358 5.33579 12.5 5.75 12.5C6.16421 12.5 6.5 12.8358 6.5 13.25C6.5 13.3881 6.61193 13.5 6.75 13.5H11.75C12.7165 13.5 13.5 12.7165 13.5 11.75V7C13.5 6.86193 13.3881 6.75 13.25 6.75C12.8358 6.75 12.5 6.41421 12.5 6C12.5 5.58579 12.8358 5.25 13.25 5.25Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.1543 1.00391C9.73945 1.08421 11 2.39489 11 4V8L10.9961 8.1543C10.9184 9.68834 9.68834 10.9184 8.1543 10.9961L8 11H4L3.8457 10.9961C2.31166 10.9184 1.08163 9.68834 1.00391 8.1543L1 8V4C1 2.39489 2.26055 1.08421 3.8457 1.00391L4 1H8L8.1543 1.00391ZM4 2.5C3.17157 2.5 2.5 3.17157 2.5 4V8C2.5 8.82843 3.17157 9.5 4 9.5H8C8.82843 9.5 9.5 8.82843 9.5 8V4C9.5 3.17157 8.82843 2.5 8 2.5H4Z"></path></svg>
    )
}

export function PenIcon(){

    return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
    )
}

