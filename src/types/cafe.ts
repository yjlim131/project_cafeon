export type MoodCategory = {
  id: string;
  code: string;
  title: string;
  keywords: string[];
  description: string;
  images: string[];
  palette: string[];
};

export type Cafe = {
  id: string;
  name: string;
  area: string;
  distance: string;
  isOpen: boolean;
  images: string[];
  moodCategoryIds: string[];
  moodTags: string[];
  reason: string;
  address: string;
  hours: string;
  priceRange: string;
  facilities: string[];
};
