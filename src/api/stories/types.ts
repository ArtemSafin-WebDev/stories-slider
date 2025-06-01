export type Root = Root2[];

export interface Root2 {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  content: Content;
  template: string;
  meta: Meta;
  class_list: string[];
  acf: Acf;
  yoast_head: string;
  yoast_head_json: YoastHeadJson;
  _links: Links;
}

export interface Guid {
  rendered: string;
}

export interface Title {
  rendered: string;
}

export interface Content {
  rendered: string;
  protected: boolean;
}

export interface Meta {
  inline_featured_image: boolean;
}

export interface Acf {
  stories_text: string;
  stories_full_text: string;
  stories_new: boolean;
  stories_image: StoriesImage;
  stories_inner: StoriesInner[];
  stories_logo: StoriesLogo;
}

export interface StoriesImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
  w800: string;
  "w800-width": number;
  "w800-height": number;
  w1600: string;
  "w1600-width": number;
  "w1600-height": number;
  full: string;
  "full-width": number;
  "full-height": number;
}

export interface StoriesInner {
  stories_inner_image: StoriesInnerImage;
  stories_inner_file: any;
  stories_inner_duration: string;
}

export interface StoriesInnerImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes2;
}

export interface Sizes2 {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
  w800: string;
  "w800-width": number;
  "w800-height": number;
  w1600: string;
  "w1600-width": number;
  "w1600-height": number;
  full: string;
  "full-width": number;
  "full-height": number;
}

export interface StoriesLogo {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes3;
}

export interface Sizes3 {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
  w800: string;
  "w800-width": number;
  "w800-height": number;
  w1600: string;
  "w1600-width": number;
  "w1600-height": number;
  full: string;
  "full-width": number;
  "full-height": number;
}

export interface YoastHeadJson {
  title: string;
  robots: Robots;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_url: string;
  og_site_name: string;
  article_modified_time: string;
  twitter_card: string;
  schema: Schema;
}

export interface Robots {
  index: string;
  follow: string;
  "max-snippet": string;
  "max-image-preview": string;
  "max-video-preview": string;
}

export interface Schema {
  "@context": string;
  "@graph": Graph[];
}

export interface Graph {
  "@type": string;
  "@id": string;
  url?: string;
  name?: string;
  isPartOf?: IsPartOf;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: Breadcrumb;
  inLanguage?: string;
  potentialAction?: PotentialAction[];
  itemListElement?: ItemListElement[];
  description?: string;
}

export interface IsPartOf {
  "@id": string;
}

export interface Breadcrumb {
  "@id": string;
}

export interface PotentialAction {
  "@type": string;
  target: any;
  "query-input"?: QueryInput;
}

export interface QueryInput {
  "@type": string;
  valueRequired: boolean;
  valueName: string;
}

export interface ItemListElement {
  "@type": string;
  position: number;
  name: string;
  item?: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  "wp:attachment": WpAttachment[];
  curies: Cury[];
}

export interface Self {
  href: string;
  targetHints: TargetHints;
}

export interface TargetHints {
  allow: string[];
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface WpAttachment {
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}
