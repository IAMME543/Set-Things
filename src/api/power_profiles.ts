import { invoke } from "@tauri-apps/api/core";


export async function setPowerProfile(profile: string) {
    let lowercase = profile.toLowerCase();
    let filtered = lowercase.replace(" ", "-")
    console.log(filtered)
    return invoke("set_profile", { profile: filtered });
}

export async function getPowerProfile() {
    // TODO, create backend function for get profile.
}