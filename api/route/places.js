const router = require("express").Router();
const Place = require("../models/Place");

router.get("/places", async (req,res) => {
    try {
        const page = parseInt(req.query.page) - 1|| 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let fasilitas = req.query.fasilitas || "All";
        
        const facilities =[
            "Indoor",
            "Semi Outdoor",
            "Outdoor",
            "Luas",
            "Sumber Listrik",
            "Wifi",
            "Bebas Asap Rokok",
            "Kondusif",
            "AC",
            "Boleh membawa makanan",
            "Boleh membawa minuman",
            "Bisa untuk diskusi",
        ];

        fasilitas === "All" 
        ? (fasilitas = [...facilities]) 
        : (fasilitas= req.query.fasilitas.split(","));
        req.query.sort ? (sort=req.query.sort.split(",")) : (sort=[sort]);
    


        let sortBy={};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]]= "asc";
        }

        const places = await Place.find({nama: {$regex: search, $options: 'i'} })
            .where("fasilitas").in([...fasilitas])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);
        const total = await Place.countDocuments({
            nama:{$regex:search,$options:'i'},
        });
        const response = {
            error:false,
            total,
            page:page+1,
            limit,
            places,
        };
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:true, message:"Internal Server Error"});
    }
});

module.exports = router;