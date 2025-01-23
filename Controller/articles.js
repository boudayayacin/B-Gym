const { log } = require("console")
const Article = require("../models/article")
const { artValidator } = require("../utililites/validator")
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')
const getArticles = async (req, res) => {
    try {
        const art = await Article.find().populate('userId', 'firstName lastName email role').sort({ createdAt: -1 })
        return res.json(art)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error while getting items", err });
    }
}

const getArticle = async (req, res) => {
    try {
        const { id } = req.params
        const art = await Article.findById(id).populate('userId', 'firstName lastName email role')
        if (!art) {
            res.status(404).json({ message: "Article not found" });
        }
        res.json(art)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
const createArticle = async (req, res) => {
    try {
        const { body, file } = req

        // console.log('body:', body);
        // console.log('file', file);
        const validator = artValidator.validate(body, { abortEarly: false })
        if (validator.error) {
            return res.json(validator.error.details[0].message);
        }

        if (file) {
            const result = await cloudinary.uploader.upload(file.path);
            body.photo = result.secure_url;
        }
        console.log(body);
        const newArticle = new Article({
            ...body,
            userId: req.user._id,
        })
        await newArticle.save();
        return res.json({ message: "Article Successfully created", Article: newArticle });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
const deletArticle = async (req, res) => {
    try {
        const { id } = req.params
        const art = await Article.findById(id)
        if (!art) {
            return res.json({ message: "Article not Found" })
        }
        await Article.findByIdAndDelete(id)
        res.json({ message: "Item successfully deleted", id: id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while getting item", err });
    }
}
const UpdateArticle = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }
        const art = await Article.findById(id)
        if (!art) {
            return res.json({ message: "Article not Found" })
        }
        const newart = await Article.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        res.json(newart)
        console.log("newArt: " + newart)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while getting item", err });
    }
}

const serach = async (req, res) => {
    const { query } = req.query
    // console.log(query)
    try {
        const art = await Article.find({ title: { $regex: query, $options: 'i' } })
        if (!art) {
            res.json({ message: 'il nexist pas' })
        }
        res.status(200).json(art)
    } catch (err) {
        res.status(500).json({ message: err })
    }

}
const filtrerByprix = async (_, res) => {
    try {
        const artDec = await Article.find().sort({ price: 1 })
        if (!artDec) {
            es.json({ message: 'il nexist pas' })
        }
        res.status(200).json(artDec)
    } catch (error) {
        res.status(500).json({ message: err })
    }
}
const filtrerByprixAc = async (_, res) => {
    try {
        const artDec = await Article.find().sort({ price: -1 })
        if (!artDec) {
            es.json({ message: 'il nexist pas' })
        }
        res.status(200).json(artDec)
    } catch (error) {
        res.status(500).json({ message: err })
    }
}

const pagination = async (req, res) => {
    try {
        const OrderBy = req.query.OrderBy
        const page = parseInt(req.query.page) || 1
        const nbart = parseInt(req.query.nbart) || 8
        let order = 1
        // console.log(OrderBy);
        const start = (page - 1) * nbart
        const tot = await Article.find({})
        // console.log(tot.length)
        const nbPage = Math.ceil(tot.length / nbart)
        if (OrderBy === 'desc') {
            order = -1
        }
       
        const arts = await Article.find().skip(start).limit(nbart).sort({ price: order })
        // console.log(nbPage);
        res.status(200).json({ artlicle: arts,nbPage ,page,nbart,OrderBy })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

module.exports = {
    getArticle,
    getArticles,
    deletArticle,
    createArticle,
    UpdateArticle,
    serach,
    filtrerByprix,
    filtrerByprixAc,
    pagination
}