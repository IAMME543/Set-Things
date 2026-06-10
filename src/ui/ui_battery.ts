import { setPowerProfile } from "../api/power_profiles";

export function setupPowerProfilesDropdown() {
    document.querySelectorAll(".dropdown-button")?.forEach(button => {
        button.addEventListener("click", (e) => {
            button.nextElementSibling?.classList.toggle("show");
            e.stopPropagation()
        })
    })
    document.querySelectorAll(".dropdown-menu")?.forEach(menu => {
        menu.childNodes.forEach(child => {
            child.addEventListener("click", () => {
                let initiator = menu.previousElementSibling as HTMLElement
                let label = initiator.querySelector(".label");
                if (!label) return
                if (!initiator) return
                const profile = (child as HTMLElement).dataset.value ?? ""
                initiator?.setAttribute("data-value", profile);
                label.textContent = profile;
                setPowerProfile(profile);
                initiator.click()

            })
        })
    })
}