import mongoose from 'mongoose';
import {Category} from "./category";

const mongooseSlugPlugin = require('mongoose-slug-plugin')

interface ArticleAttrs {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    }
}

interface ArticleModel extends mongoose.Model<ArticleDoc> {
    build(attrs: ArticleAttrs): ArticleDoc;
}

export interface ArticleDoc extends mongoose.Document {
    title: string;
    content: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    user: {
        id: string;
        name: string;
        imageUrl: string;
    },
    slug: string;
}

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null,
        required: false
    },
    imageAlt: {
        type: String,
        default: null,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Category,
        required: true
    },
    user: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        }
    },
    slug: {
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
            delete ret.slug_history;
        }
    }
});

articleSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' });

articleSchema.statics.build = (attrs: ArticleAttrs) => {
    return new Article(attrs);
};

const Article = mongoose.model<ArticleDoc, ArticleModel>('Article', articleSchema);

export { articleSchema, Article };
