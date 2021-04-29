import mongoose from 'mongoose';
import {ArticleStatus} from "./articleStatus";

interface DraftAttrs {
    title: string;
    content: string;
    userId: string;
}

interface DraftModel extends mongoose.Model<DraftDoc> {
    build(attrs: DraftAttrs): DraftDoc;
}

export interface DraftDoc extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
    status: ArticleStatus;
}

const draftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    status: {
        type: ArticleStatus,
        required: true,
        default: ArticleStatus.Draft
    },
    content: {
        type: String,
        required: true
    },
    userId: {
       type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

draftSchema.statics.build = (attrs: DraftAttrs) => {
    return new Draft(attrs);
};

const Draft = mongoose.model<DraftDoc, DraftModel>('Draft', draftSchema);

export { draftSchema, Draft };
