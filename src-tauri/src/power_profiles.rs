use zbus::Connection;

#[tauri::command]
pub async fn set_profile(profile: String) -> Result<(), String> {
    set_power_profile(&profile)
        .await
        .map_err(|e| e.to_string())?;

    println!("power profile set: {}", profile);

    Ok(())
}

pub async fn set_power_profile(profile: &str) -> zbus::Result<()> {
    let conn = Connection::system().await?;

    let proxy = zbus::Proxy::new(
        &conn,
        "net.hadess.PowerProfiles",
        "/net/hadess/PowerProfiles",
        "net.hadess.PowerProfiles",
    )
    .await?;

    proxy.set_property("ActiveProfile", profile).await?;

    Ok(())
}
