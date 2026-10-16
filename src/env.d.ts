/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly HEVY_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
