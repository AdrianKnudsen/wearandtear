import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: "My Sanity Studio",
  apiVersion: "2023-06-17",
  basePath: "/studio",
  plugins: [deskTool()],
});
