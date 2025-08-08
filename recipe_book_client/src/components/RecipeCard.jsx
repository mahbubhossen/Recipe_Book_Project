import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  
  const { _id, title, image, cuisine, likeCount } = recipe;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">Cuisine: {cuisine || "N/A"}</p>
        <p className="text-gray-600">Likes: ❤️ {likeCount || 0}</p>
        <Link to={`/recipes/${_id}`} className="btn btn-sm btn-primary mt-2">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
