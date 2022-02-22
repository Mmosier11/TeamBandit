const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// GENERAL ROUTES //

// Grabs Organizer Information from the Organizers table
router.get("/", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT organizer_fname, organizer_lname, organizer_email, organizer_id, organizer_bio, profilepic_filepath FROM organizers WHERE organizer_id = $1", [req.user]);

    res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Updates Organizers Bio
router.put("/bio", authorization, async(req, res) => {
    try {
        const {bioText} = req.body;

        const updateTodo = await pool.query("UPDATE organizers SET organizer_bio = $1 WHERE organizer_id = $2 RETURNING *", [bioText, req.user]);

        if(updateTodo.rows.length === 0)
        {
            return res.json("This bio is not yours!");
        }

        res.json("Bio was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Grabs Student Information from the Students table
router.get("/student", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT student_fname, student_lname, student_email, student_id, student_bio, profilepic_filepath FROM students WHERE student_id = $1", [req.user]);

    res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Updates Students Bio
router.put("/studentbio", authorization, async(req, res) => {
    try {
        const {bioText} = req.body;

        const updateTodo = await pool.query("UPDATE students SET student_bio = $1 WHERE student_id = $2 RETURNING *", [bioText, req.user]);

        if(updateTodo.rows.length === 0)
        {
            return res.json("This bio is not yours!");
        }

        res.json("Bio was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// END GENERAL ROUTES //

module.exports = router;