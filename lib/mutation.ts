// ! Library
import { newFirebaseId } from "./utilities";
import { db } from "../config/firebase.client";

const addEntry = async (collection: string, data: any) => {
    try {
        const database = db()
        const batch = database.batch();
        const newId = newFirebaseId();
        const newTimestamp = new Date();

        const referencedData = {...data, ...{ id: newId }};

        batch.set(database.collection(collection).doc(newId), referencedData);

        const metadataRequest = await database.collection("metadata").doc(collection).get();

        const entryMetadata = metadataRequest.exists ? metadataRequest.data() : { entries: 0, };
        const metadataTags = "tags" in entryMetadata! ? entryMetadata.tags : [];

        const modifiedMetadataTags = Array.from(new Set(metadataTags.concat(data.tags)));

        const modifiedMetadata = {
            ...entryMetadata,
            ...{
                tags: modifiedMetadataTags,
                entries: entryMetadata!.entries + 1,
                dateModified: newTimestamp
            }
        }

        batch.update(database.collection("metadata").doc(collection), modifiedMetadata);

        await batch.commit();
        return { status: 200 }
    } catch (error) {
        console.log(error)
        return { status: 500 }
    }
}

const editEntry = async (collection: string, data: any) => {
    try {
        const database = db()
        const batch = database.batch();
        const newTimestamp = new Date();

        batch.update(database.collection(collection).doc(data.id), data);

        const metadataRequest = await database.collection("metadata").doc(collection).get();

        const entryMetadata = metadataRequest.exists ? metadataRequest.data() : { entries: 0, };
        const metadataTags = "tags" in entryMetadata! ? entryMetadata.tags : [];

        const modifiedMetadataTags = Array.from(new Set(metadataTags.concat(data.tags)));

        const modifiedMetadata = {
            ...entryMetadata,
            ...{
                tags: modifiedMetadataTags,
                dateModified: newTimestamp
            }
        }

        batch.update(database.collection("metadata").doc(collection), modifiedMetadata);

        await batch.commit();

        return { status: 200 }
    } catch (error) {
        console.log(error)
        return { status: 500 }
    }

}

const deleteEntry = async (collection: string, id: string) => {
    try {
        const database = db()
        const batch = database.batch();
        const newTimestamp = new Date();

        batch.delete(database.collection(collection).doc(id));

        const metadataRequest = await database.collection("metadata").doc(collection).get();

        const entryMetadata = metadataRequest.exists ? metadataRequest.data() : { entries: 0 };

        const modifiedMetadata = {
            ...entryMetadata,
            ...{
                entries: entryMetadata!.entries - 1,
                dateModified: newTimestamp
            }
        }

        batch.update(database.collection("metadata").doc(collection), modifiedMetadata);

        await batch.commit();

        return { status: 200 }
    } catch (error) {
        console.log(error)
        return { status: 500 }
    }
}

export { addEntry, editEntry, deleteEntry }
