import mongoose from "mongoose";

const { Schema } = mongoose;

const goodsSchema = new Schema(
  {
    merchantid: {
      type: String,
      required: true,
      minlength: 5,
      maxLength: 15,
    },
    skuid: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 10,
      unique: true,
    },
    goodsname: {
      type: String,
      required: true,
      minlength: 5,
      maxLength: 20,
      unique: true,
    },
    goodsdescription: {
      type: String,
      required: true,
      minlength: 10,
      maxLength: 50,
      unique: true,
    },
    goodsprice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Goods = mongoose.model("Goods", goodsSchema);

export default Goods;
