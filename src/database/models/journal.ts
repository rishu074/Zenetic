import mongoose from 'mongoose';

export interface JournalI {
    special: string;
    content: string;
    date: Date;
}

const JournalSchema = new mongoose.Schema({
    special: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Index for faster lookups
JournalSchema.index({ date: 1 });
JournalSchema.index({ special: 1 });

const JournalModel = mongoose.model<JournalI>("journals", JournalSchema, "journals");
export default JournalModel; 