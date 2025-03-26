// pb_migrations/1687801090_initial_superuser.js

migrate((app) => {
    let superusers = app.findCollectionByNameOrId("_superusers");
    let record = new Record(superusers);

    // Load values from environment variables
    const email = process.env.SUPERUSER_EMAIL || "default@example.com";
    const password = process.env.SUPERUSER_PASSWORD || "defaultpassword";

    // Set the values in the record
    record.set("email", email);
    record.set("password", password);

    app.save(record);
}, (app) => { // optional revert operation
    try {
        let record = app.findAuthRecordByEmail("_superusers", process.env.SUPERUSER_EMAIL || "default@example.com");
        app.delete(record);
    } catch {
        // silent errors (probably already deleted)
    }
});
