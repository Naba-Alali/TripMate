import { useState } from "react";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";

function ExplorePage() {

  // The parent owns the state
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div>
      <CategoryFilter
        selected={selectedCategory}       // pass current selection down
        onSelect={setSelectedCategory}    // pass setter function down
      />

      {/* Later you'll filter places based on selectedCategory */}
    </div>
  );
}