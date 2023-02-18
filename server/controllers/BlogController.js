import BlogModel from "../models/Blog.js";
class BlogController {
   static createBlogpost = async (req, res) => {
      try {
         const { title, content } = req.body;
         const { author } = req.user._id;
         console.log(author);
         if (!title || !content) {

            res.status(400).send({ status: "failed", message: "All filed are required" });
         }
         const newBlog = new BlogModel({
            title: title,
            content: content,
            author: author,
         });
         const Bolg = await newBlog.save();
         res.status(200).send({ status: "success", message: "saved successfully", Blog: Bolg });
      }
      catch (err) {
         console.log(err);
         res.status(500).send({ status: "failed", message: "internal server error" });
      }
   };
}

export default BlogController;