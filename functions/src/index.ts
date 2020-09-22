import * as functions from 'firebase-functions';
import {run} from "./subindex";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {

    await run();

    response.send("complete");
    functions.logger.info('complete');
    return;
});
