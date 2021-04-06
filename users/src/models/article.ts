import mongoose from 'mongoose';

interface ArticleAttrs {
    title: string;
    content: string;
}

interface ArticleModel extends mongoose.Model<ArticleDoc> {
    build(attrs: ArticleAttrs): ArticleDoc;
}

export interface ArticleDoc extends mongoose.Document {
    title: string;
    content: string;
}

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    content: {
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

articleSchema.statics.build = (attrs: ArticleAttrs) => {
    return new Article(attrs);
};

const Article = mongoose.model<ArticleDoc, ArticleModel>('Article', articleSchema);

export { articleSchema, Article };
