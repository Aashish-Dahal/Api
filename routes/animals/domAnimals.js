const express=require("express");
const router=express.Router();
const {protect}=require("../../middleware/auth");
const upload=require("../../utils/multer");
const {getGoats, getGoat, createGoat, deleteGoat, updateGoat, khasi, getRelated, changra, veda, boka, bhakra, getRelatedUserPost, categorySearch, titleSearch, allSearch}=require("../../controllers/animal/domAnimalsController");
router.route("/getall").get(getGoats);
router.route("/khasi").get(khasi);
router.route("/boka").get(boka);
router.route("/changra").get(changra);
router.route("/ads").get(protect, getRelatedUserPost);
router.route("/veda").get(veda);
router.route("/bhakra").get(bhakra);
router.route("/related/:id").get(getRelated);
router.route("/one/:id").get(getGoat);
router.route("/search/category").get(categorySearch);
router.route("/search/title").get(titleSearch);
router.route("/search/all").get(allSearch);
router.route("/post").post(upload.array("goatImage"), protect, createGoat);
router.route("/update/:id").put(upload.single("goatImage"), protect, updateGoat);
router.route("/delete/:id").delete(protect, deleteGoat);


module.exports=router;
