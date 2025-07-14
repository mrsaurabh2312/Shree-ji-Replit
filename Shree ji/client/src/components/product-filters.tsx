import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Category } from "@shared/schema";

interface ProductFiltersProps {
  selectedCategories: number[];
  onCategoryChange: (categories: number[]) => void;
  onClearFilters: () => void;
}

export function ProductFilters({ selectedCategories, onCategoryChange, onClearFilters }: ProductFiltersProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryToggle = (categoryId: number, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryId]);
    } else {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryToggle(category.id, checked as boolean)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer hover:text-saffron"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {selectedCategories.length > 0 && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
