const vaccineModel = require('../models/vaccine')

function VaccineController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => {
            try {
                let vaccines = await vaccineModel.find();
                res.render('vaccineList', { vaccines });
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        add: async (req, res, next) => {
            try {
                let vaccine = new vaccineModel(req.body);
                await vaccine.save()
                return res.status(200).json({
                    status: "Success"
                })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        getByType: async (req, res, next) => {
            try {
                let type = req.params.type;
                let vaccines = await vaccineModel.find({ type: type })
                return res.status(200).json(vaccines)
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        renderByType: async (req, res, next) => {
            try {
                let type = req.params.type;
                let vaccines = await vaccineModel.find({ type: type })
                res.render('vaccineList', { vaccines })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        manageVaccines: async (req, res, next) => {
            try {
                let vaccines = await vaccineModel.find();
                res.render('vaccines/manageVaccine', { vaccines });
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        deleteVaccine: async (req, res, next) => {
            try {
                let vaccines = await vaccineModel.find();
                res.render('vaccines/manageVaccine', { vaccines });
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        getVaccineDetail: async (req, res, next) => {
            try {
                let vaccine = await vaccineModel.findById({ _id: req.params.id }).lean();
                res.render('vaccines/updateVaccine', { vaccine });
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        updateVaccine: async (req, res, next) => {
            try {
                if(!(req.params.id && req.body.name && req.body.price && req.body.inventory_number
                    && req.body.desc)
                ) return res.render("vaccines/updateVaccine", { notice: "Đã có một ô nhập trống. Vui lòng kiểm tra lại! Mã:" + req.params.id }); 
                let vaccine = await vaccineModel.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        name: req.body.name,
                        price: req.body.price,
                        inventory_number: req.body.inventory_number,
                        desc: req.body.desc,
                    },
                    {
                        new: true,
                    }
                ).lean();
                if (!vaccine) return res.render("vaccines/updateVaccine",
                    { notice: "Cập nhật vác xin thất bại! Vui lòng giữ nguyên hiện trường và báo ban it@" });
                
                res.redirect('/vaccine/' + req.params.id);
            } catch (error) {
                console.log(error);
                return res.status(400).json(error);
            }
        },
    };
}

module.exports = new VaccineController();
