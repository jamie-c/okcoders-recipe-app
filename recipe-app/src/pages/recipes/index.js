import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddMenuItem() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    imageUrl: "",
    tags: "",
    createdBy: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push("/");
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1>Add Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            label="Ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
          <TextField
            label="Instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
            <TextField
            label="Prep Time"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />
            <TextField 
            label="Cook Time"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            required
            />
            <TextField
            label="Servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
            />
            <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            />
            <TextField
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            />
            <TextField
            label="Created By"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
            />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}