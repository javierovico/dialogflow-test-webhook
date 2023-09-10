import {IsArray, IsString} from "class-validator";

class Text {
    body: string
}

class Message {
    from: string
    id: string
    timestamp: string
    text?: Text
    type: string
}

class Profile {
    name: string
}

class Contact {
    profile: Profile
    wa_id: string
}

class Metadata {
    display_phone_number: string
    phone_number_id: string
}

class Value {
    messaging_product: string
    metadata: Metadata
    contacts?: Contact[]
    messages: Message[]
}

class Changes {
    value: Value
    field: string
}

class Entry {
    @IsString()
    id: string
    changes: Changes[]
}

export class WebhookWhatsappDto {
    @IsString()
    object: string
    @IsArray()
    entry: Entry[]
}
