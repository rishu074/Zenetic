import mongoose from "mongoose";

export interface TodoOneTime {
    type: 'onetime';
    work: string;
    completed: Date[]
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoEvery {
    type: 'every';
    every: {
        amount: number;
        unit: 'day' | 'week' | 'month';
    };
    work: string;
    completed: Date[]
    createdAt: Date;
    updatedAt: Date;
}

export type TodoI = TodoOneTime | TodoEvery;

const TodoSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['onetime', 'every']
    },
    every: {
        amount: {
            type: Number,
            required: function(this: any) {
                return this.parent().parent().type === 'every';
            },
            validate: {
                validator: function(this: any) {
                    return this.parent().parent().type !== 'onetime';
                },
                message: 'Cannot set every.amount when type is onetime'
            }
        },
        unit: {
            type: String,
            enum: ['day', 'week', 'month'],
            required: function(this: any) {
                return this.parent().parent().type === 'every';
            },
            validate: {
                validator: function(this: any) {
                    return this.parent().parent().type !== 'onetime';
                },
                message: 'Cannot set every.unit when type is onetime'
            }
        }
    },
    work: {
        type: String,
        required: true
    },
    completed: {
        type: [Date],
        required: false
    }
}, { timestamps: true })  

const TodoModel = mongoose.model<TodoI>("todos", TodoSchema, "todos");
export default TodoModel;
