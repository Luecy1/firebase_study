import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {

    const database = admin.database();
    const ref = database.ref("youtube_data/yukihanaramili");

    const result = await ref.once("value")
    functions.logger.info("result ", result.toJSON());
    response.send(result.toJSON());

    functions.logger.info('complete');
    return;
});
