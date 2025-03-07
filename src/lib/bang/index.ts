import { ai } from "./ai";
import { devTools } from "./dev-tools";
import { gaming } from "./gaming";
import { other } from "./other";
import { searchEngines } from "./search-engine";
import { searchThing } from "./search-thing";
import { social } from "./social";
import { streaming } from "./streaming";
import { news } from "./news";
import type { Bang, BangModule } from "./types";
import { shopping } from "./shopping";
import { images } from "./images";
import { music } from "./music";

export const bangs = [
  ...searchEngines,
  ...ai,
  ...devTools,
  ...streaming,
  ...social,
  ...gaming,
  ...news,
  ...shopping,
  ...images,
  ...music,
  ...other,
  ...searchThing,
];

export type { Bang, BangModule };
