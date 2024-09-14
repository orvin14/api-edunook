const router = require("express").Router();
const Place = require("../models/Place");

router.get("/places", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let fasilitas = req.query.fasilitas || "All";
    const kampus = req.query.kampus || "";

    const facilities = ["Indoor", "Semi Outdoor", "Outdoor", "Luas", "Sumber Listrik", "Wifi", "Bebas Asap Rokok", "Kondusif", "AC", "Boleh membawa makanan", "Boleh membawa minuman", "Bisa untuk diskusi"];

    fasilitas === "All" ? (fasilitas = [...facilities]) : (fasilitas = req.query.fasilitas.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Buat query object untuk memfilter tempat
    let query = {
      nama: { $regex: search, $options: "i" },
      fasilitas: { $in: [...fasilitas] },
    };

    // Tambahkan filter berdasarkan kampus jika parameter kampus dikirim
    if (kampus) {
      query.kampus = kampus; // Asumsikan field kampus ada di model Place
    }

    const places = await Place.find(query)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Place.countDocuments(query);

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      places,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.get("/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ Error: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
