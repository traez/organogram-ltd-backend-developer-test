import Goods from "../model/goodsModel.js";

const getGoods = async (req, res) => {
  try {
    const goods = await Goods.find({});
    res.status(200).json(goods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createGood = async (req, res) => {
  const { merchantid, skuid, goodsname, goodsdescription, goodsprice } =
    req.body;
  try {
    const newGood = await Goods.create({
      merchantid,
      skuid,
      goodsname,
      goodsdescription,
      goodsprice,
    });
    res.status(201).json(newGood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGood = async (req, res) => {
  const goodId = req.params.id;

  try {
    const deletedGood = await Goods.findByIdAndDelete(goodId);

    if (!deletedGood) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json({ message: "Good deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const editGood = async (req, res) => {
  const goodId = req.params.id;
  const { merchantid, skuid, goodsname, goodsdescription, goodsprice } =
    req.body;

  try {
    const updatedGood = await Goods.findByIdAndUpdate(
      goodId,
      {
        merchantid,
        skuid,
        goodsname,
        goodsdescription,
        goodsprice,
      },
      { new: true, runValidators: true }
    );

    if (!updatedGood) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json(updatedGood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { getGoods, createGood, deleteGood, editGood };
