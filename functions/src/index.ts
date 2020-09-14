import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");

    const database = admin.database();
    const ref = database.ref("youtube_data/yukihanaramili");

    ref.once("value")
        .then(value => {
            functions.logger.info("Hello logs!", value.val());
        })
        .catch(reason => {
            functions.logger.error(reason);
        })
});

admin.initializeApp(functions.config().firebase)
