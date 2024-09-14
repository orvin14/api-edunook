const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    nama:{type: String,required:true},
    lokasi:{type: String,required:true},
    buka:{type: String,required:true},
    tutup:{type: String,required:true},
    hariTutup:{type: [String],required:true},
    kursi:{type: String,required:true},
    meja:{type: String,required:true},
    listrik:{type: Boolean,required:true},
    ac:{type: Boolean,required:true},
    bebasRokok:{type: Boolean,required:true},
    kondusif:{type: Boolean,required:true},
    lepasAlasKaki:{type: Boolean,required:true},
    makan:{type: Boolean,required:true},
    minum:{type: Boolean,required:true},
    wifi:{type: Boolean,required:true},
    fasilitas:{type: [String],required:true},
    img:{type: String,required:true}
});

module.exports = mongoose.model("place", placeSchema);