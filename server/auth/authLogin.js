const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Judge = require("../models/judges")
const Registrar = require("../models/registrars")
const ClientData = require("../models/clientData")
const Defendant = require("../models/defendantDetails")
const bcrypt = require("bcrypt");

router.post('/judge', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await Judge.findOne({ email: email });
        if(!user) return res.json({ message: "Username or password is wrong" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({ message: "Password is wrong" });
        else{
            const accessToken = jwt.sign({ email: email, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true });
            return res.json({ message: "success", role: role, email: email});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});

router.post('/registrar', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await Registrar.findOne({ email: email });
        if(!user) return res.json({ message: "Username or password is wrong" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({ message: "Password is wrong" });
        else{
            const accessToken = jwt.sign({ email: email, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true });
            return res.json({ message: "success", role: role});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});

router.post('/client', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await ClientData.findOne({ email: email });
        if(!user) return res.json({ message: "Username or password is required" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({ message: "Username or password is wrong" });
        else{
            const accessToken = jwt.sign({ email: email, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true});
            return res.json({ message: "success",role: role, email: email});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});

router.post('/defendant', async (req, res) => {
    const caseId = req.body.caseId;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await Defendant.findOne({ caseId: caseId });
        if(!user) return res.json({ message: "No CaseId found" });
        const isMatch = await Defendant.findOne({password:password})
        if(!isMatch) return res.json({ message: "Password is wrong" });
        else{
            const accessToken = jwt.sign({ caseId: caseId, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true});
            return res.json({ message: "success",role: role});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});




module.exports = router;