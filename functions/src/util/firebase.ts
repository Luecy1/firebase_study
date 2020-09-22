import admin from "firebase-admin";

const app = admin.initializeApp();

export async function writeDatabase(path: string, items: any[]): Promise<void> {
    await app.database().ref(path).set(items, e => {
        if (e != null) {
            console.error(e);
        }
    })
    console.log(`${path} write complete`);
}

export function readDatabase(path: string) {
    app.database().ref(path)
        .orderByChild("publishedAt")
        .on("value", (snapshot, _) => {

            snapshot.forEach(a => {
                console.log("--------------");
                console.log(a.child("publishedAt").val());
            });
        });
}
