import { invoke } from "@tauri-apps/api/core";
import { createIcons, Menu, Settings, Search, Globe, Bluetooth, Paintbrush, Battery, Lock, PersonStanding } from 'lucide';

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
    PersonStanding
  }
});


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
}
