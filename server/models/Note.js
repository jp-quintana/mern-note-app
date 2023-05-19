import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String },
    emoji: { type: String },
    content: { type: String },
    // isFavorite: { type: Boolean, required: 'true' },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // _id: {
    //   type: String,
    //   default: function () {
    //     return this.id;
    //   },
    // },
  },

  { timestamps: true }
);

// noteSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

noteSchema.set('toJSON', { virtuals: true });
noteSchema.set('toObject', { virtuals: true });

export default mongoose.model('Note', noteSchema);
