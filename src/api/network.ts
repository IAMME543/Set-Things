import { invoke } from "@tauri-apps/api/core";

export interface WifiNetwork {
    ssid: string;
    strength: number;
}

export async function connectWifi(ssid: String, password: String) {
    return await invoke("connect_wifi", { ssid, password })
}
export async function setWifi(toggle: boolean) {
    return invoke("toggle_wifi", { toggle })
}


export async function listWifi(): Promise<WifiNetwork[]> {
    return invoke<WifiNetwork[]>("list_wifi");
}