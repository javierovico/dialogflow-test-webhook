
interface IConversationSuccess {

    /** ConversationSuccess metadata */
    metadata?: (IStruct|null);
}

interface IText {

    /** Text text */
    text?: (string[]|null);

    /** Text allowPlaybackInterruption */
    allowPlaybackInterruption?: (boolean|null);
}

interface IOutputAudioText {

    /** OutputAudioText text */
    text?: (string|null);

    /** OutputAudioText ssml */
    ssml?: (string|null);

    /** OutputAudioText allowPlaybackInterruption */
    allowPlaybackInterruption?: (boolean|null);
}


interface IEndInteraction {
}
interface ILiveAgentHandoff {

    /** LiveAgentHandoff metadata */
    metadata?: (IStruct|null);
}

interface IResponseMessage {

    /** ResponseMessage text */
    text?: (IText|null);

    /** ResponseMessage payload */
    payload?: (IStruct|null);

    /** ResponseMessage conversationSuccess */
    conversationSuccess?: (IConversationSuccess|null);

    /** ResponseMessage outputAudioText */
    outputAudioText?: (IOutputAudioText|null);

    /** ResponseMessage liveAgentHandoff */
    liveAgentHandoff?: (ILiveAgentHandoff|null);

    /** ResponseMessage endInteraction */
    endInteraction?: (IEndInteraction|null);

    /** ResponseMessage playAudio */
    playAudio?: (IPlayAudio|null);

    /** ResponseMessage mixedAudio */
    mixedAudio?: (IMixedAudio|null);

    /** ResponseMessage telephonyTransferCall */
    telephonyTransferCall?: (ITelephonyTransferCall|null);

    /** ResponseMessage channel */
    channel?: (string|null);
}

interface ITelephonyTransferCall {

    /** TelephonyTransferCall phoneNumber */
    phoneNumber?: (string|null);
}

interface IMixedAudio {

    /** MixedAudio segments */
    segments?: (ISegment[]|null);
}


interface ISegment {

    /** Segment audio */
    audio?: (Uint8Array|string|null);

    /** Segment uri */
    uri?: (string|null);

    /** Segment allowPlaybackInterruption */
    allowPlaybackInterruption?: (boolean|null);
}
interface IPlayAudio {

    /** PlayAudio audioUri */
    audioUri?: (string|null);

    /** PlayAudio allowPlaybackInterruption */
    allowPlaybackInterruption?: (boolean|null);
}
enum MergeBehavior {
    MERGE_BEHAVIOR_UNSPECIFIED = 0,
    APPEND = 1,
    REPLACE = 2
}
interface IFulfillmentResponse {

    /** FulfillmentResponse messages */
    messages?: (IResponseMessage[]|null);

    /** FulfillmentResponse mergeBehavior */
    mergeBehavior?: (MergeBehavior|keyof typeof MergeBehavior|null);
}


interface IPageInfo {

    /** PageInfo currentPage */
    currentPage?: (string|null);

    /** PageInfo displayName */
    displayName?: (string|null);

    /** PageInfo formInfo */
    formInfo?: (IFormInfo|null);
}

enum ParameterState {
    PARAMETER_STATE_UNSPECIFIED = 0,
    EMPTY = 1,
    INVALID = 2,
    FILLED = 3
}


interface IParameterInfo {

    /** ParameterInfo displayName */
    displayName?: (string|null);

    /** ParameterInfo required */
    required?: (boolean|null);

    /** ParameterInfo state */
    state?: (ParameterState|keyof typeof ParameterState|null);

    /** ParameterInfo value */
    value?: (any|null);

    /** ParameterInfo justCollected */
    justCollected?: (boolean|null);
}


interface IFormInfo {

    /** FormInfo parameterInfo */
    parameterInfo?: (IParameterInfo[]|null);
}

interface ISessionInfo {

    /** SessionInfo session */
    session?: (string|null);

    /** SessionInfo parameters */
    parameters?: ({ [k: string]: any }|null);
}

interface IStruct {

    /** Struct fields */
    fields?: ({ [k: string]: any }|null);
}

export interface IWebhookResponse {

    /** WebhookResponse fulfillmentResponse */
    fulfillmentResponse?: (IFulfillmentResponse|null);

    /** WebhookResponse pageInfo */
    pageInfo?: (IPageInfo|null);

    /** WebhookResponse sessionInfo */
    sessionInfo?: (ISessionInfo|null);

    /** WebhookResponse payload */
    payload?: (IStruct|null);

    /** WebhookResponse targetPage */
    targetPage?: (string|null);

    /** WebhookResponse targetFlow */
    targetFlow?: (string|null);
}
