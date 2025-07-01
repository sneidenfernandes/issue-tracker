

export function ProjectIcon({className = ""}) {
    return (
        <svg
            className={`${className.length > 0 ? className : "text-neutral-400"}`}
            width="16px"
            height="16px"
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
        <svg   width="16" height="16" viewBox="0 0 16 16" fill="lch(62.6% 1.35 272 / 1)" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15 5.25A3.25 3.25 0 0 0 11.75 2h-7.5A3.25 3.25 0 0 0 1 5.25v5.5A3.25 3.25 0 0 0 4.25 14h7.5A3.25 3.25 0 0 0 15 10.75v-5.5Zm-3.5 7.25H7v-9h4.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2Zm-6 0H4.25a1.75 1.75 0 0 1-1.75-1.75v-5.5c0-.966.784-1.75 1.75-1.75H5.5v9Z"></path></svg>
    )
}
