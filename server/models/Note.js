import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String },
    emoji: { type: String },
    content: { type: String },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
  },
  { timestamps: true }
);

noteSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

noteSchema.set('toJSON', { virtuals: true });
noteSchema.set('toObject', { virtuals: true });

export default mongoose.model('Note', noteSchema);
