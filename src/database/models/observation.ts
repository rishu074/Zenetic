import mongoose from 'mongoose';

export interface ObservationI {
    feelings: string[];
    urges: string[];
    sequences: string[];
    date: Date;
}

const ObservationSchema = new mongoose.Schema({
    feelings: {
        type: [String],
        required: true
    },
    urges: {
        type: [String],
        required: true
    },
    sequences: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const ObservationModel = mongoose.model<ObservationI>("observations", ObservationSchema, "observations");
export default ObservationModel;
