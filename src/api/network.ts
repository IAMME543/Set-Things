import { invoke } from "@tauri-apps/api/core";

export async function connectWifi(ssid: String, password: String) {
    return await invoke("connect_wifi", { ssid, password })
}
export async function setWifi(toggle: boolean) {
    return invoke("toggle_wifi", { toggle })
}
export async function listWifi() {
    return invoke("list_wifi")
}