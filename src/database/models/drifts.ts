import mongoose from 'mongoose';
import ObservationModel from './observation';

export interface DriftsI {
    observations: typeof ObservationModel[];
    topic: string;
    date: Date; 
}

const DriftsSchema = new mongoose.Schema({
    observations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "observations",
        required: true
    },
    topic: { 
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    } 
})

const DriftsModel = mongoose.model<DriftsI>("drifts", DriftsSchema, "drifts");
export default DriftsModel;
