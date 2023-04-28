import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String },
    emoji: { type: String },
    content: { type: String },
    isFavorite: { type: Boolean, required: 'true' },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
    userId: { type: String, required: 'true' },
  },
  { timestamps: true }
);

noteSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

noteSchema.set('toJSON', { virtuals: true });
noteSchema.set('toObject', { virtuals: true });

export default mongoose.model('Note', noteSchema);
