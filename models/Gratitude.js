const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const gratitudeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  slug: { type: String, slug: "title" }
}, { timestamps: true }
)

gratitudeSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

const Gratitude = mongoose.model("Gratitude", gratitudeSchema);

module.exports = Gratitude;