import { setSystemTheme } from "../api/appearance"

export function setupThemeSwitcher() {
    document.querySelectorAll('input[name="theme"]').forEach((radio) => {
        let r = radio as HTMLInputElement
        r.addEventListener("click", (e) => {
            if (r.id == "set-dark-opt") {
                setSystemTheme("dark")
            } else if (r.id == "set-light-opt") {
                setSystemTheme("light")
            }
        })
    })
}