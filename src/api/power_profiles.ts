import { invoke } from "@tauri-apps/api/core";


export async function setPowerProfile(profile: string) {
    return invoke("set_profile", { profile });
}