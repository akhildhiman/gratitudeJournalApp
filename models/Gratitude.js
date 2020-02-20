const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const gratitudeSchema = new Schema({
  gratitudeTitle: { type: String, required: true },
  gratitudeDescription: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  slug: { type: String, slug: "title" }
}, { timestamps: true }
)

gratitudeSchema.pre("save", function (next) {
  this.slug = this.gratitudeTitle.split(" ").join("-");
  next();
});

const Gratitude = mongoose.model("Gratitude", gratitudeSchema);

module.exports = Gratitude;