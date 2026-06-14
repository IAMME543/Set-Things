use std::process::Command;

#[tauri::command]
pub fn toggle_system_theme(theme: String) -> Result<String, String> {
    let home = std::env::var("HOME").map_err(|e| e.to_string())?;
    let output = Command::new(format!("{}/.local/bin/toggle-theme", home))
        .arg(theme)
        .output()
        .map_err(|e| e.to_string())?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    Ok(String::from_utf8_lossy(&output.stdout).to_string())
}
