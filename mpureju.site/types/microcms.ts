import type { MicroCMSListContent, MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

// ---- treatments（施術情報） ----
export type PriceOption = {
  fieldId: string;
  name: string;
  price: number;
  note?: string;
};

export type DowntimeMilestone = {
  fieldId: string;
  label: string;
  days_after: number;
  description: string;
};

export type Treatment = MicroCMSListContent & {
  title: string;
  slug: string;
  category: "mouth" | "eye" | "nose" | "lift" | "skin";
  description: string;
  doctor_comment?: string;
  risks?: string;
  thumbnail: MicroCMSImage;
  price_options: PriceOption[];
  downtime_min_days?: number;
  downtime_max_days?: number;
  downtime_milestones?: DowntimeMilestone[];
};

// ---- cases（症例記事） ----
export type Case = MicroCMSListContent & {
  title: string;
  slug: string;
  thumbnail: MicroCMSImage;
  category: "mouth" | "eye" | "nose" | "lift" | "skin";
  treatment?: Treatment[];
  age_group?: string;
  gender?: string;
  concern?: string;
  content: string;
  before_photo?: MicroCMSImage;
  after_photo?: MicroCMSImage;
  published_at: string;
};

// ---- news（お知らせ） ----
export type News = MicroCMSListContent & {
  title: string;
  content: string;
  category: "notice" | "explanation" | "price-change";
  thumbnail?: MicroCMSImage;
  published_at: string;
};

// ---- columns（コラム記事） ----
export type Column = MicroCMSListContent & {
  title: string;
  slug: string;
  content: string;
  category: string;
  thumbnail?: MicroCMSImage;
  tags?: string[];
  published_at: string;
};

// ---- doctor（院長プロフィール） ----
export type Doctor = MicroCMSListContent & {
  name: string;
  title: string;
  photo: MicroCMSImage;
  profile: string;
  message: string;
  career: string;
  qualifications?: string[];
  media_appearances?: string[];
  kol_activities?: string;
};

// ---- campaigns（キャンペーン） ----
export type Campaign = MicroCMSListContent & {
  title: string;
  image: MicroCMSImage;
  link_url: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  related_treatments?: Treatment[];
};

// ---- faqs（よくある質問） ----
export type Faq = MicroCMSListContent & {
  question: string;
  answer: string;
  category:
    | "mouth"
    | "eye"
    | "nose"
    | "lift"
    | "skin"
    | "general"
    | "price"
    | "booking";
  sort_order?: number;
};

// ---- setcourses（セットコース） ----
export type SetCourse = MicroCMSListContent & {
  title: string;
  tagline?: string;
  concern: string;
  category: "mouth" | "eye" | "nose" | "lift" | "skin";
  treatments: Treatment[];
  is_same_day: boolean;
  before_photo?: MicroCMSImage;
  after_photo?: MicroCMSImage;
  is_popular: boolean;
};

// ---- staff（スタッフ） ----
export type Staff = MicroCMSListContent & {
  name: string;
  role: string;
  photo: MicroCMSImage;
  profile?: string;
  action_photos?: MicroCMSImage[];
  sort_order?: number;
};

// ---- media（SNSメディア） ----
export type MediaPlatform = "instagram" | "youtube";

export type Media = MicroCMSListContent & {
  platform: MediaPlatform;
  title: string;
  thumbnail: MicroCMSImage;
  url: string;
  published_at: string;
};
