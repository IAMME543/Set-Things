use tauri::Manager;

mod network;
mod power_profiles;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            tauri::async_runtime::block_on(async {
                let nm = network::setup().await.map_err(|e| e.to_string())?;
                app.manage(nm);
                Ok::<(), String>(())
            })?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            power_profiles::set_profile,
            network::connect_wifi,
            network::list_wifi,
            network::toggle_wifi,
            network::get_wifi
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
