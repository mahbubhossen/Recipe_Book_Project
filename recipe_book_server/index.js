const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://recipe-book-project-767d5.web.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qoghsen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let recipeCollection;

async function run() {
  try {
    // await client.connect();
    console.log(" Connected to MongoDB");

    const db = client.db("recipeDB");
    recipeCollection = db.collection("recipes");

    // Add New Recipe
    app.post("/recipes", async (req, res) => {
      try {
        const newRecipe = req.body;
        newRecipe.likeCount = 0;
        newRecipe.createdAt = new Date();
        const result = await recipeCollection.insertOne(newRecipe);
        res.status(201).send({
          message: "Recipe added successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).send({
          message: "Failed to add recipe",
          error: error.message,
        });
      }
    });

    // Get All Recipes
    app.get("/all-recipes", async (req, res) => {
      try {
        const recipes = await recipeCollection.find().toArray();
        res.send(recipes);
      } catch (error) {
        res.status(500).send({
          message: "Failed to fetch recipes",
          error: error.message,
        });
      }
    });

    // Get My Recipes
    app.get("/my-recipes", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      try {
        const recipes = await recipeCollection
          .find({ authorEmail: email })
          .project({
            title: 1,
            image: 1,
            ingredients: 1,
            instructions: 1,
            cuisine: 1,
            prepTime: 1,
            categories: 1,
            likes: 1,
          })
          .toArray();

        const formattedRecipes = recipes.map((recipe) => ({
          ...recipe,
          likes: recipe.likes || 0,
        }));

        res.status(200).json(formattedRecipes);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
        res.status(500).json({
          message: "Failed to fetch your recipes",
          error: error.message,
        });
      }
    });

    // Get Top 6 Recipes by Likes
    app.get("/recipes/top", async (req, res) => {
      try {
        const topRecipes = await recipeCollection
          .find()
          .sort({ likeCount: -1 })
          .limit(6)
          .toArray();
        res.send(topRecipes);
      } catch (err) {
        res.status(500).send({
          message: "Failed to fetch top recipes",
          error: err.message,
        });
      }
    });

    // Get Recipe Details by ID
    app.get("/recipes/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const recipe = await recipeCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!recipe) {
          return res.status(404).send({ message: "Recipe not found" });
        }

        res.send(recipe);
      } catch (err) {
        res.status(500).send({
          message: "Failed to fetch recipe",
          error: err.message,
        });
      }
    });

    // Update a Recipe by ID
    app.patch("/recipes/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID format" });
      }

      const updatedRecipe = req.body;

      try {
        const result = await recipeCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedRecipe }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ message: "No recipe was updated" });
        }

        res.send({ message: "Recipe updated successfully" });
      } catch (err) {
        console.error("Update error:", err);
        res
          .status(500)
          .send({ message: "Failed to update recipe", error: err.message });
      }
    });

    // Delete a Recipe by ID
    app.delete("/recipes/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await recipeCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "No recipe was deleted" });
        }

        res.send({ message: "Recipe deleted successfully" });
      } catch (err) {
        console.error("Delete error:", err);
        res
          .status(500)
          .send({ message: "Failed to delete recipe", error: err.message });
      }
    });

    // Like a recipe
    app.patch("/recipes/:id/like", async (req, res) => {
      try {
        const { id } = req.params;
        const userEmail = req.headers["user-email"];

        if (!userEmail) {
          return res.status(400).send({ message: "User email is required" });
        }

        const recipe = await recipeCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!recipe) {
          return res.status(404).send({ message: "Recipe not found" });
        }

        if (recipe.authorEmail === userEmail) {
          return res
            .status(403)
            .send({ message: "You can't like your own recipe" });
        }

        const result = await recipeCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { likeCount: 1 } }
        );

        if (result.modifiedCount === 0) {
          return res.status(500).send({ message: "Failed to update likes" });
        }

        res.send({
          message: "Recipe liked",
          updatedLikes: recipe.likeCount + 1,
        });
      } catch (err) {
        console.error("Like error:", err);
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
    });
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
run().catch(console.dir);

// Root Route
app.get("/", (req, res) => {
  res.send("Recipe server is running");
});

app.listen(port, () => {
  console.log(` Recipe server is running on port ${port}`);
});
