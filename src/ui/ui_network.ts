import { setWifi, listWifi, connectWifi, getWifi } from "../api/network";


export function setupNetworkListeners() {
    document.getElementById("enable-wifi")?.addEventListener("change", (e) => {
        const el = e.currentTarget as HTMLInputElement
        if (!el) return
        setWifi(el.checked)
    })
}

export async function setWifiList() {
    const wifistrengthicons = ["wifi-low", "wifi-high", "wifi"]

    const wifilist = document.getElementById("wifi-list");
    if (!wifilist) return
    const wifidata = await listWifi();
    wifidata.sort((a, b) => b.strength - a.strength);
    wifidata.forEach(network => {
        if (network.ssid == "<Hidden Network>") return
        console.log(network)

        let display = document.createElement("button")
        display.classList.add("button-light")
        display.classList.add("horizontal-setting")
        display.innerText = network.ssid
        let strength = document.createElement("span")
        strength.dataset.lucide = wifistrengthicons[Math.ceil(Math.min(
            2,
            Math.floor(network.strength / 34)))]
        display.appendChild(strength)
        wifilist?.appendChild(display)
        console.log(strength)
    });
}

export async function setToggleDefaults() {
    const d = await getWifi()
    let ewifi = document.getElementById("enable-wifi") as HTMLInputElement
    if (!ewifi) return
    ewifi.checked = d
}