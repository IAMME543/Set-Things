import { invoke } from "@tauri-apps/api/core";
import { createIcons, Menu, Settings, Search, Globe, Bluetooth, Paintbrush, Battery, Lock, PersonStanding, X, ChevronDown } from 'lucide';
import { setPowerProfile } from "./api/power_profiles"
import { closeApp } from "./api/app_controls"


loadLucide()

let primaryContainer: HTMLElement | null;

const views: Record<ViewName, HTMLTemplateElement> = {
  general: document.getElementById("general-view") as HTMLTemplateElement,
  network: document.getElementById("network-view") as HTMLTemplateElement,
  bluetooth: document.getElementById("bluetooth-view") as HTMLTemplateElement,
  appearance: document.getElementById("appearance-view") as HTMLTemplateElement,
  battery: document.getElementById("battery-view") as HTMLTemplateElement,
  permissions: document.getElementById("permissions-view") as HTMLTemplateElement,
  accessibility: document.getElementById("accessibility-view") as HTMLTemplateElement,
};
type ViewName =
  | "general"
  | "network"
  | "bluetooth"
  | "appearance"
  | "battery"
  | "permissions"
  | "accessibility";

window.addEventListener('click', () => {
  ClosePopups()
})

window.addEventListener("DOMContentLoaded", () => {
  primaryContainer = document.getElementById("view") as HTMLElement;
  if (!primaryContainer) return

  document.querySelectorAll("button[data-view]").forEach(btn => {
    let el = btn as HTMLButtonElement
    el.addEventListener("click", () => {
      const name = el.dataset.view
      setView(name as ViewName);
    });
  })
  setView("general" as ViewName)
});

function setView(name: ViewName) {
  if (!primaryContainer) return
  const view = views[name];
  if (!view) return;

  primaryContainer.innerHTML = ""
  primaryContainer.appendChild(view.content.cloneNode(true));
  loadLucide();

  switch (name) {
    case "general" as ViewName:
      break;
    case "network" as ViewName:
      break;
    case "bluetooth" as ViewName:
      break;
    case "appearance" as ViewName:
      break;
    case "battery" as ViewName: {
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
      break;
    case "permissions" as ViewName:
      break;
    case "accessibility" as ViewName:
      break;
  }
  document.querySelector("#close")?.addEventListener("click", () => { closeApp() });
}

function loadLucide() {
  //could be optimised in future
  createIcons({
    icons: {
      Menu,
      Settings,
      Search,
      Globe,
      Bluetooth,
      Paintbrush,
      Battery,
      Lock,
      PersonStanding,
      X,
      ChevronDown
    }
  });
}
function ClosePopups() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.classList.remove("show")
  })

}