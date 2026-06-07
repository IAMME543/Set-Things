use nmrs::NetworkManager;
use serde::Serialize;
use std::sync::Arc;
use tauri::State;

#[derive(Serialize)]
pub struct WifiNetwork {
    pub ssid: String,
    pub strength: u8,
}

pub type SharedNM = Arc<NetworkManager>;

pub async fn setup() -> nmrs::Result<SharedNM> {
    let nm = NetworkManager::new().await?;
    Ok(Arc::new(nm))
}

#[tauri::command]
pub async fn list_wifi(nm: State<'_, SharedNM>) -> Result<Vec<WifiNetwork>, String> {
    let nets = nm.list_networks(None).await.map_err(|e| e.to_string())?;

    Ok(nets
        .into_iter()
        .map(|n| WifiNetwork {
            ssid: n.ssid,
            strength: n.strength.unwrap_or(0),
        })
        .collect())
}

#[tauri::command]
pub async fn connect_wifi(
    nm: State<'_, SharedNM>,
    ssid: String,
    password: String,
) -> Result<(), String> {
    nm.connect(&ssid, None, nmrs::WifiSecurity::WpaPsk { psk: password })
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn toggle_wifi(nm: State<'_, SharedNM>, toggle: bool) -> Result<(), String> {
    nm.set_wireless_enabled(toggle)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}
#[tauri::command]
pub async fn get_wifi(nm: State<'_, SharedNM>) -> Result<bool, String> {
    let state = nm.wifi_state().await.map_err(|e| e.to_string())?;
    Ok(state.enabled)
}
