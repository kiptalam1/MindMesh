import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		published: {
			type: Boolean,
			default: false,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
