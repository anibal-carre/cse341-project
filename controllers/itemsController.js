const { ObjectId } = require("mongodb");
const { connectDB } = require("../data/database");

exports.getAll = async (req, res) => {
    try {
        const db = await connectDB();
        const items = await db.collection("items").find().toArray();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.getOne = async (req, res) => {
    try {
        const db = await connectDB();
        const item = await db
            .collection("items")
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!item) return res.status(404).json({ error: "Item not found" });

        res.json(item);
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
};

exports.create = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("items").insertOne(req.body);
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: "Server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db
            .collection("items")
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (result.matchedCount === 0)
            return res.status(404).json({ error: "Item not found" });

        res.json({ message: "Item updated" });
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
};

exports.remove = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db
            .collection("items")
            .deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0)
            return res.status(404).json({ error: "Item not found" });

        res.json({ message: "Item deleted" });
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
};
