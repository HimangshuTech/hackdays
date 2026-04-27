type PostType = "PLACE" | "EVENT" | "SERVICE";

type LocationInput = {
  name: string;
  latitude: number;
  longitude: number;
};

type Metadata = {
  types?: string[];
  activities?: string[];
  months?: string[];
  budgetMin?: number;
  budgetMax?: number;
};

// BASE
type BasePostInput = {
  title: string;
  description: string;
  postType: PostType;
  state?: string;
  location?: LocationInput;
  metadata?: Metadata;
  images?: { url: string; publicId: string; order?: number }[];
};

// PLACE
export type PlacePostInput = BasePostInput & {
  postType: "PLACE";
};

// EVENT
export type EventPostInput = BasePostInput & {
  postType: "EVENT";
  event: {
    startTime: string; // ISO
    endTime: string;
    budgetMin?: number;  // optional range
    budgetMax?: number;
  };
};

// SERVICE
export type ServicePostInput = BasePostInput & {
  postType: "SERVICE";
  service: {
    price?: number;
    budgetMin?: number;
    budgetMax?: number;
    contactInfo: string;
  };
};

// FINAL TYPE
export type CreatePostRequest =
  | PlacePostInput
  | EventPostInput
  | ServicePostInput;



