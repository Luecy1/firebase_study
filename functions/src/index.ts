import * as functions from 'firebase-functions';
import {run} from "./subindex";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {

    await run();

    response.send({
        status: "success"
    });
    functions.logger.info('complete');
    return;
});

export const periodicallyTask = functions.pubsub
    .schedule('0 18 * * *')
    .timeZone('Asia/Tokyo')
    .onRun(async () => {

        await run();

        functions.logger.info('complete');
        return;
    });