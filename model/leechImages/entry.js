exports = module.exports = function (mongoose) {
    var leechImagesSchema = new mongoose.Schema({
        origin: {   // 原来url的地址
            type: String,
            required: true,
            index: true
        },
        url: {     // 新的地址
            type: String,
            required: true,
            index: true
        },
        modDate: {
            type: Date,
            default: Date.now,
            required: true
        }
    });

    leechImagesSchema.set('toObject', {
        transform: function (doc, ret, options) {
            delete ret._id;
            delete ret.__v;
        }
    });

    leechImagesSchema.set('toJSON', {
        transform: function (doc, ret, options) {
            delete ret._id;
            delete ret.__v;
        }
    });

    // create the model for articles and return it
    return mongoose.model('leechImages', leechImagesSchema);
};
