/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DONATION_FORM_URL?: string
  readonly VITE_DONATION_QR_URL?: string
  readonly VITE_ACCOUNT_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
