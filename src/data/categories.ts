import { PLACEHOLDER_PRODUCT_IMAGE } from "@/config/site";

export type Category = {
  slug: string;
  nameKey: "gloves";
  image: string;
};

export const categories: Category[] = [
  {
    slug: "gloves",
    nameKey: "gloves",
    image: PLACEHOLDER_PRODUCT_IMAGE,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
