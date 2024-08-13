/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MSW: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
