const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const gratitudeSchema = new Schema({
  gratitudeTitle: { type: String, required: true },
  gratitudeDescription: { type: String, required: true },
  slug: { type: String, slug: "title" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true }
)

gratitudeSchema.pre("save", function (next) {
  this.slug = this.gratitudeTitle.split(" ").join("-");
  next();
});

const Gratitude = mongoose.model("Gratitude", gratitudeSchema, "gratitudes");

module.exports = Gratitude;