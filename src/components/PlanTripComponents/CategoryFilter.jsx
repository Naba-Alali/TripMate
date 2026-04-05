import './CatagoryFilter.css';


//category needs:
const categories = [
  { id: "all",       label: "All",        icon: "🔮" },
  { id: "landmark",  label: "Landmarks",  icon: "🏛️" },
  { id: "food",      label: "Local Food",  icon: "🍽️" },
  { id: "nature",    label: "Nature",     icon: "🌿" },
  { id: "shopping",  label: "Shopping",   icon: "🛍️" },
];

// CategoryFilter receives 2 props from the parent:
// 1. `selected`    → which category is currently active (e.g. "all")
// 2. `onSelect`    → a function to call when user clicks a category

function CategoryFilter({ selected, onSelect }) {
  return (
    // Wrapper div — horizontal row of buttons
    <div className="category-filter">

      {/* Loop through each category and render a button */}
      {categories.map((category) => (
        <button
          key={category.id}

          // When clicked, tell the parent which category was selected
          onClick={() => onSelect(category.id)}

          // If this category is the selected one, add "active" class
          className={`filter-btn ${selected === category.id ? "active" : ""}`}
        >
          {/* Icon before the label */}
          <span>{category.icon}</span>
          {category.label}
        </button>
      ))}

    </div>
  );
}

                                                           