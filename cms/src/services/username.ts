import mongoose from "mongoose";
import {DraftDoc} from "../models/draft";

export class Username {

    static async findUserNames(drafts: DraftDoc[]) {

        const db = mongoose.connection.db.collection('users');

        for (let draft of drafts) {
            const user = await db.findOne({_id: mongoose.Types.ObjectId(draft.userId)});

            if (user) {
                draft.userName = user.name
            }
        }

        return drafts
    }
}
