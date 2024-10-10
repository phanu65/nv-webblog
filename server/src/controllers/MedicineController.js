const { Medicine } = require('../models');

// GET all medicines
exports.index = async (req, res) => {
    try {
        const medicines = await Medicine.findAll();
        res.status(200).json(medicines);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not retrieve medicines.' });
    }
};

// GET medicine by ID
exports.show = async (req, res) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (medicine) {
            res.status(200).json(medicine);
        } else {
            res.status(404).json({ error: 'Medicine not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not retrieve medicine.' });
    }
};

// POST create a new medicine
exports.create = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);
        res.status(201).json(medicine);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Could not create medicine.' });
    }
};

// PUT update a medicine
exports.put = async (req, res) => {
    try {
        const [updated] = await Medicine.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMedicine = await Medicine.findByPk(req.params.id);
            res.status(200).json(updatedMedicine);
        } else {
            res.status(404).json({ error: 'Medicine not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Could not update medicine.' });
    }
};

// DELETE a medicine
exports.remove = async (req, res) => {
    try {
        const deleted = await Medicine.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Medicine not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not delete medicine.' });
    }
};
