/// <reference types="vite/client" /> ///

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

export const { VITE_SERVER_URL }: ImportMeta = import.meta.env
