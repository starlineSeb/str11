import { getConvexUrl } from "./adminAuth";

export type PortfolioCategory =
  | "Estates & Coastal"
  | "California & West"
  | "Mountain & Desert"
  | "Intimate & Editorial";

export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  location: string;
  medium: string;
  year: string;
  image: string;
  aspect?: "portrait" | "landscape" | "tall";
  focalPoint?: string;
}

export interface VideoFilmItem {
  id: string;
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  location: string;
  year: string;
  coverImage: string;
  videoUrl: string;
  duration: string;
  camera: string;
  details: string;
  focalPoint?: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Estates & Coastal",
  "California & West",
  "Mountain & Desert",
  "Intimate & Editorial"
];

export const DEFAULT_PHOTOGRAPHY_ITEMS: PhotoItem[] = [
  {
    id: "photo-1",
    title: "Rosecliff Mansion Oceanfront Vows",
    subtitle: "Cliff Walk Atlantic breeze & twilight reception",
    category: "Estates & Coastal",
    location: "Newport, Rhode Island",
    medium: "35mm Portra 400 + Leica Primes",
    year: "2026",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  },
  {
    id: "photo-2",
    title: "Meadowood Estate Golden Hour",
    subtitle: "Private harvest courtyard candlelit dinner",
    category: "California & West",
    location: "Napa Valley, California",
    medium: "Medium Format Digital & 35mm Hybrid",
    year: "2026",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  },
  {
    id: "photo-3",
    title: "High Sierra Twilight Still",
    subtitle: "Glacial reflection under alpine blue hour",
    category: "Mountain & Desert",
    location: "High Sierra, California",
    medium: "Kodak Portra 800",
    year: "2026",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  },
  {
    id: "photo-4",
    title: "Dallas Atelier Bridal Editorial",
    subtitle: "Architectural modern romance & black-tie gala",
    category: "Intimate & Editorial",
    location: "Dallas, Texas",
    medium: "Contax 645 Medium Format",
    year: "2026",
    image: "/wd1.jpg",
    aspect: "portrait"
  },
  {
    id: "photo-5",
    title: "Santa Fe Adobe Twilight Banquet",
    subtitle: "High desert warmth and handcrafted florals",
    category: "Mountain & Desert",
    location: "Santa Fe, New Mexico",
    medium: "Kodak Tri-X 400 Black & White",
    year: "2025",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  },
  {
    id: "photo-6",
    title: "Big Sur Coastal Headlands",
    subtitle: "Pacific ocean spray & unscripted laughter",
    category: "California & West",
    location: "Big Sur, California",
    medium: "35mm Analog Portra 400",
    year: "2025",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  },
  {
    id: "photo-7",
    title: "Historic Charleston Live Oak Terrace",
    subtitle: "Lowcountry evening gathering under Spanish moss",
    category: "Estates & Coastal",
    location: "Charleston, South Carolina",
    medium: "Medium Format Digital",
    year: "2025",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  },
  {
    id: "photo-8",
    title: "Sedona Red Rock Vows",
    subtitle: "Canyon breeze and intimate sunset promise",
    category: "Mountain & Desert",
    location: "Sedona, Arizona",
    medium: "Kodak Portra 400 Film",
    year: "2025",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
    aspect: "portrait"
  }
];

export const DEFAULT_VIDEOGRAPHY_ITEMS: VideoFilmItem[] = [
  {
    id: "film-1",
    title: "Oceanfront Estate // Newport",
    subtitle: "Gilded Age mansions along the Atlantic Cliff Walk",
    category: "Estates & Coastal",
    location: "Newport, Rhode Island",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "4:32",
    camera: "Arri Alexa Mini LF // 35mm Anamorphic",
    details: "Shot on Arri Alexa Mini LF & Cooke Anamorphic Primes with live orchestral score"
  },
  {
    id: "film-2",
    title: "Meadowood Vineyard // Napa Valley",
    subtitle: "Harvest golden hour & private courtyard candlelit banquet",
    category: "California & West",
    location: "Napa Valley, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/hero-video.mp4",
    duration: "5:18",
    camera: "RED V-Raptor // Leica Summilux",
    details: "Shot on RED V-Raptor 8K VV & Leica Summilux glass with Super 8mm analog textures"
  },
  {
    id: "film-3",
    title: "High Sierra Twilight Vows",
    subtitle: "Glacial granite reflection and quiet mountain stillness",
    category: "Mountain & Desert",
    location: "Lake Tahoe, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "3:45",
    camera: "35mm Analog Cine Film Hybrid",
    details: "Natural Twilight & Kodak Vision3 500T 35mm motion picture film stock"
  },
  {
    id: "film-4",
    title: "Dallas Atelier Bespoke Celebration",
    subtitle: "Modern Texas architectural romance & black-tie evening",
    category: "Intimate & Editorial",
    location: "Dallas, Texas",
    year: "2026",
    coverImage: "/wd1.jpg",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "3:20",
    camera: "Arri 4K Cinema + 35mm Emulsion",
    details: "Dallas Home Base Signature Commission with custom acoustic arrangement"
  },
  {
    id: "film-5",
    title: "Sedona Red Rock Canyon Story",
    subtitle: "Piñon pine breeze and starlit open-air harvest table",
    category: "Mountain & Desert",
    location: "Sedona, Arizona",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/hero-video.mp4",
    duration: "6:10",
    camera: "4K Master Cinema + Super 8",
    details: "Documentary Audio Recording & Handcrafted Super 8mm color emulsion"
  },
  {
    id: "film-6",
    title: "Big Sur Redwood Headlands",
    subtitle: "Pacific ocean spray and emotional personal vows",
    category: "California & West",
    location: "Big Sur, California",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/vid/hero-video.mp4",
    duration: "4:50",
    camera: "Arri Alexa Mini LF Cinema",
    details: "Natural coastal light and multi-track spatial audio master"
  }
];

const PHOTO_STORAGE_KEY = "starline_atelier_photography_v1";
const VIDEO_STORAGE_KEY = "starline_atelier_videography_v1";
const PORTFOLIO_UPDATE_EVENT = "starline:portfolio-updated";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as unknown as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Convex HTTP Cloud Sync Helpers (`Convex_URL` from Vercel env)
 * Uses Convex's standard HTTP `/api/query` and `/api/mutation` endpoints
 * with optimistic localStorage caching for zero-latency reads.
 */
async function pullFromConvexCloud<T>(section: "photography" | "videography"): Promise<T[] | null> {
  const convexUrl = getConvexUrl();
  if (!convexUrl) return null;

  try {
    const response = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "portfolio:getPortfolio",
        args: { section },
        format: "json"
      })
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { status?: string; value?: unknown };
    if (payload && payload.status === "success" && Array.isArray(payload.value)) {
      return payload.value as T[];
    }
    return null;
  } catch {
    return null;
  }
}

async function pushToConvexCloud<T>(
  section: "photography" | "videography",
  items: T[]
): Promise<boolean> {
  const convexUrl = getConvexUrl();
  if (!convexUrl) return false;

  try {
    const response = await fetch(`${convexUrl}/api/mutation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "portfolio:savePortfolio",
        args: {
          section,
          itemsJson: JSON.stringify(items)
        },
        format: "json"
      })
    });
    if (!response.ok) return false;
    const payload = (await response.json()) as { status?: string };
    return payload?.status === "success";
  } catch {
    return false;
  }
}

export async function syncPortfoliosFromConvex(): Promise<{
  connected: boolean;
  convexUrl: string;
}> {
  const convexUrl = getConvexUrl();
  if (!convexUrl || typeof window === "undefined") {
    return { connected: false, convexUrl: "" };
  }

  try {
    const [remotePhotos, remoteVideos] = await Promise.all([
      pullFromConvexCloud<PhotoItem>("photography"),
      pullFromConvexCloud<VideoFilmItem>("videography")
    ]);

    let changed = false;
    if (remotePhotos && remotePhotos.length > 0) {
      window.localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(remotePhotos));
      changed = true;
    }
    if (remoteVideos && remoteVideos.length > 0) {
      window.localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(remoteVideos));
      changed = true;
    }
    if (changed) {
      window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATE_EVENT));
    }
    return { connected: true, convexUrl };
  } catch {
    return { connected: true, convexUrl };
  }
}

export function getPhotographyItems(): PhotoItem[] {
  if (typeof window === "undefined") return DEFAULT_PHOTOGRAPHY_ITEMS;
  return safeParse<PhotoItem[]>(
    window.localStorage.getItem(PHOTO_STORAGE_KEY),
    DEFAULT_PHOTOGRAPHY_ITEMS
  );
}

export function savePhotographyItems(items: PhotoItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATE_EVENT));
  void pushToConvexCloud("photography", items);
}

export function getVideographyItems(): VideoFilmItem[] {
  if (typeof window === "undefined") return DEFAULT_VIDEOGRAPHY_ITEMS;
  return safeParse<VideoFilmItem[]>(
    window.localStorage.getItem(VIDEO_STORAGE_KEY),
    DEFAULT_VIDEOGRAPHY_ITEMS
  );
}

export function saveVideographyItems(items: VideoFilmItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATE_EVENT));
  void pushToConvexCloud("videography", items);
}

export function resetPhotographyToDefaults(): PhotoItem[] {
  savePhotographyItems(DEFAULT_PHOTOGRAPHY_ITEMS);
  return DEFAULT_PHOTOGRAPHY_ITEMS;
}

export function resetVideographyToDefaults(): VideoFilmItem[] {
  saveVideographyItems(DEFAULT_VIDEOGRAPHY_ITEMS);
  return DEFAULT_VIDEOGRAPHY_ITEMS;
}

export function subscribeToPortfolioUpdates(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(PORTFOLIO_UPDATE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(PORTFOLIO_UPDATE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/**
 * Optimizes a dropped or selected image File into a crisp, web-ready data URL
 * (max 1600px on longest side, 0.85 quality) so multiple high-res photos
 * store reliably in Convex/localStorage and render instantaneously without layout shift.
 */
export function processUploadedImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please drop a valid image file (JPG, PNG, WebP, AVIF)."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => reject(new Error("Corrupted or unsupported image file."));
      img.onload = () => {
        const MAX_DIM = 1600;
        let { width, height } = img;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width >= height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // shortcut: 1600px JPEG @ 0.85 keeps photos ~140KB so Convex documents and localStorage hold 30+ frames cleanly
        const optimized = canvas.toDataURL("image/jpeg", 0.85);
        resolve(optimized);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export function formatTitleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleaned = withoutExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "Starline Atelier Commission";
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}
