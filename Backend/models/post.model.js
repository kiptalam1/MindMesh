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
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
