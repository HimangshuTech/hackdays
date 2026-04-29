export type PostType = "PLACE" | "EVENT" | "SERVICE";

export type Location = {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  postId: string;
};

export type User = {
  name: string;
};

export type Image = {
  url: string;
  order: number;
};

export type EventData = {
  startTime: string;
  endTime: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
};

export type ServiceData = {
  price?: number | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  contactInfo: string;
};

type BasePost = {
  id: string;
  title: string;
  location: Location | null;
  createdAt: string;
  user: User;
  images: Image[];
};

export type Post =
  | (BasePost & {
    postType: "PLACE";
    event: null;
    service: null;
  })
  | (BasePost & {
    postType: "EVENT";
    event: EventData;
    service: null;
  })
  | (BasePost & {
    postType: "SERVICE";
    event: null;
    service: ServiceData;
  });

export type GetPostsResponse = {
  message: string;
  data: Post[];
};
