/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_TOKEN: string;
    readonly VITE_GITHUB_CLIENT_ID: string;
    readonly VITE_GITHUB_REALM: string;
};

interface ImportMeta {
    readonly env: ImportMetaEnv;
};