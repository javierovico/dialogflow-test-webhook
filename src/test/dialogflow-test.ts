import { SessionsClient } from "@google-cloud/dialogflow-cx";
import * as fs from "fs";
import * as util from "util";
import { v4 as uuidv4 } from "uuid";
import * as protos from "@google-cloud/dialogflow-cx/build/protos/protos";

/**
 * Example for regional endpoint:
 *   const location = 'us-central1'
 *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
 */
const client = new SessionsClient({
    apiEndpoint: 'us-central1-dialogflow.googleapis.com'
});

const projectId = "ambar-skytel-ia-0001";
const location = "us-central1";
const agentId = "75a26048-6e66-456e-a66c-464f20d45f63";
const audioFileName = "/home/aldo/audio.ogg";
const encoding = 6;
const sampleRateHertz = 48000;
const languageCode = "es";

export async function detectIntentAudio() {
    const sessionId = uuidv4();
    const sessionPath = client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    );
    console.log(sessionPath)

    // Read the content of the audio file and send it as part of the request.
    const readFile = util.promisify(fs.readFile);
    const inputAudio = await readFile(audioFileName);

    const request: protos.google.cloud.dialogflow.cx.v3.IDetectIntentRequest = {
        session: sessionPath,
        queryInput: {
            audio: {
                config: {
                    audioEncoding: encoding,
                    sampleRateHertz: sampleRateHertz
                },
                audio: inputAudio
            },
            languageCode
        }
    };
    const [response] = await client.detectIntent(request);
    console.log(`User Query: ${response.queryResult?.transcript}`);
    for (const message of (response.queryResult?.responseMessages ?? [])) {
        if (message.text) {
            console.log(`Agent Response: ${message.text.text}`);
        }
    }
    if (response.queryResult?.match?.intent) {
        console.log(
          `Matched Intent: ${response.queryResult.match.intent.displayName}`
        );
    }
    console.log(
      `Current Page: ${response.queryResult?.currentPage?.displayName}`
    );
}

detectIntentAudio()
