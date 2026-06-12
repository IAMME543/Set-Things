import { invoke } from "@tauri-apps/api/core";

export async function setSystemTheme(theme: string) {
    return invoke("toggle_system_theme", { theme });
}