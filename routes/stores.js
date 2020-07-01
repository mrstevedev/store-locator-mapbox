const express = require("express");
const { getStores, addStore } = require("../controllers/stores");

const router = express.Router();

// '/' goes to route set in server.js // '/api/v1/stores'
router
    .route("/")
    .get(getStores)
    .post(addStore);

// router.get('/', (req, res) => {
//     res.send('Hey young world');
// })

// Export router in ourder for the router to work
module.exports = router;
