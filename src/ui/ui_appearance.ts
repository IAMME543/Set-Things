import { setSystemTheme } from "../api/appearance"

export function setupThemeSwitcher() {
    document.getElementById("toggletheme")?.addEventListener("click", () => {
        setSystemTheme("switch")
    })
}