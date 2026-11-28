import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  getConvexUrl,
  getLockoutStatus,
  isAdminAuthenticated,
  logoutAdmin,
  subscribeToAdminAuth,
  updateAdminPasscode,
  verifyAndLoginAdmin
} from "@/lib/adminAuth";
import {
  formatTitleFromFilename,
  getPhotographyItems,
  getVideographyItems,
  PORTFOLIO_CATEGORIES,
  processUploadedImageFile,
  resetPhotographyToDefaults,
  resetVideographyToDefaults,
  savePhotographyItems,
  saveVideographyItems,
  subscribeToPortfolioUpdates,
  syncPortfoliosFromConvex,
  type PhotoItem,
  type PortfolioCategory,
  type VideoFilmItem
} from "@/lib/portfolioStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Camera,
  Check,
  Cloud,
  Edit3,
  Eye,
  EyeOff,
  Film,
  ImagePlus,
  KeyRound,
  Lock,
  LogOut,
  MapPin,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

type ActiveSection = "photography" | "videography";

export default function AdminPanel() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [passcodeInput, setPasscodeInput] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockoutState, setLockoutState] = useState(() => getLockoutStatus());

  // Security / Change Passcode modal state
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");

  // Convex Cloud status
  const [convexStatus, setConvexStatus] = useState<{
    connected: boolean;
    convexUrl: string;
  }>(() => ({
    connected: Boolean(getConvexUrl()),
    convexUrl: getConvexUrl()
  }));

  const [activeSection, setActiveSection] = useState<ActiveSection>("photography");
  const [photos, setPhotos] = useState<PhotoItem[]>(() => getPhotographyItems());
  const [videos, setVideos] = useState<VideoFilmItem[]>(() => getVideographyItems());

  // Drag & Drop state for main upload zone
  const [isDraggingZone, setIsDraggingZone] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [instantPublishOnDrop, setInstantPublishOnDrop] = useState(false);

  // Drag-over state for individual existing cards (replace image on drop)
  const [dragOverCardId, setDragOverCardId] = useState<string | null>(null);

  // Inline editing state for existing cards
  const [editingId, setEditingId] = useState<string | null>(null);

  // Staged new Photography item state
  const [photoDraft, setPhotoDraft] = useState<{
    title: string;
    subtitle: string;
    location: string;
    category: PortfolioCategory;
    medium: string;
    year: string;
    image: string;
    focalPoint: string;
  }>({
    title: "",
    subtitle: "Natural light, quiet grace & 35mm analog emulsion",
    location: "Dallas, Texas",
    category: "Intimate & Editorial",
    medium: "35mm Portra 400 + Leica Primes",
    year: "2026",
    image: "",
    focalPoint: "center center"
  });

  // Staged new Videography item state
  const [videoDraft, setVideoDraft] = useState<{
    title: string;
    subtitle: string;
    location: string;
    category: PortfolioCategory;
    year: string;
    coverImage: string;
    videoUrl: string;
    duration: string;
    camera: string;
    details: string;
    focalPoint: string;
  }>({
    title: "",
    subtitle: "Crafted with vintage anamorphic glass & 35mm motion picture film",
    location: "Dallas, Texas",
    category: "Intimate & Editorial",
    year: "2026",
    coverImage: "",
    videoUrl: "/vid/new_section_img_optimized.mp4",
    duration: "4:15",
    camera: "Arri Alexa Mini LF // 35mm Anamorphic",
    details: "Shot on Arri Alexa Mini LF & Cooke Anamorphic Primes with bespoke score",
    focalPoint: "center center"
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replacingCardId, setReplacingCardId] = useState<string | null>(null);

  // Subscribe to Auth & Portfolio updates and sync with Convex Cloud
  useEffect(() => {
    void syncPortfoliosFromConvex().then((res) => {
      setConvexStatus(res);
    });

    const unsubPortfolio = subscribeToPortfolioUpdates(() => {
      setPhotos(getPhotographyItems());
      setVideos(getVideographyItems());
    });
    const unsubAuth = subscribeToAdminAuth(() => {
      setIsAuthenticated(isAdminAuthenticated());
    });

    return () => {
      unsubPortfolio();
      unsubAuth();
    };
  }, []);

  // Lockout countdown ticker when locked out
  useEffect(() => {
    if (!lockoutState.isLocked) return;
    const timer = setInterval(() => {
      const next = getLockoutStatus();
      setLockoutState(next);
      if (!next.isLocked) {
        setAuthError(null);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutState.isLocked]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);
    try {
      const result = await verifyAndLoginAdmin(passcodeInput);
      setLockoutState(getLockoutStatus());
      if (!result.success) {
        setAuthError(result.error || "Authentication failed.");
      } else {
        setPasscodeInput("");
        setIsAuthenticated(true);
        toast.success("Welcome to the Starline Atelier Curatorial Studio.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setEditingId(null);
    toast.success("Curatorial Console locked.");
  };

  const handleChangePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassInput.trim() !== confirmPassInput.trim()) {
      toast.error("New passcode and confirmation do not match.");
      return;
    }
    const res = await updateAdminPasscode(currentPassInput, newPassInput);
    if (!res.success) {
      toast.error(res.error || "Could not update passcode.");
      return;
    }
    setCurrentPassInput("");
    setNewPassInput("");
    setConfirmPassInput("");
    setIsSecurityModalOpen(false);
    toast.success("Atelier Master Passcode updated.");
  };

  // Process files dropped or selected into the main add zone
  const handleFilesAddedToZone = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      toast.error("Please drop valid image files (JPEG, PNG, WebP, AVIF).");
      return;
    }

    setIsProcessingImage(true);
    try {
      if (files.length > 1 || instantPublishOnDrop) {
        if (activeSection === "photography") {
          const newItems: PhotoItem[] = [];
          for (const file of files) {
            const optimizedDataUrl = await processUploadedImageFile(file);
            newItems.push({
              id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              title: formatTitleFromFilename(file.name),
              subtitle: photoDraft.subtitle || "Natural light, quiet grace & 35mm analog emulsion",
              location: photoDraft.location || "Dallas, Texas",
              category: photoDraft.category,
              medium: photoDraft.medium || "35mm Portra 400 + Leica Primes",
              year: photoDraft.year || "2026",
              image: optimizedDataUrl,
              aspect: "portrait",
              focalPoint: photoDraft.focalPoint
            });
          }
          const updated = [...newItems, ...photos];
          savePhotographyItems(updated);
          setPhotos(updated);
          toast.success(
            `Published ${newItems.length} ${
              newItems.length === 1 ? "photograph" : "photographs"
            } to Photography Portfolio.`
          );
        } else {
          const newFilms: VideoFilmItem[] = [];
          for (const file of files) {
            const optimizedDataUrl = await processUploadedImageFile(file);
            newFilms.push({
              id: `film-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              title: formatTitleFromFilename(file.name),
              subtitle:
                videoDraft.subtitle ||
                "Crafted with vintage anamorphic glass & 35mm motion picture film",
              location: videoDraft.location || "Dallas, Texas",
              category: videoDraft.category,
              year: videoDraft.year || "2026",
              coverImage: optimizedDataUrl,
              videoUrl: videoDraft.videoUrl || "/vid/new_section_img_optimized.mp4",
              duration: videoDraft.duration || "4:15",
              camera: videoDraft.camera || "Arri Alexa Mini LF // 35mm Anamorphic",
              details:
                videoDraft.details ||
                "Shot on Arri Alexa Mini LF & Cooke Anamorphic Primes with bespoke score",
              focalPoint: videoDraft.focalPoint
            });
          }
          const updated = [...newFilms, ...videos];
          saveVideographyItems(updated);
          setVideos(updated);
          toast.success(
            `Published ${newFilms.length} ${
              newFilms.length === 1 ? "commission cover" : "commission covers"
            } to Videography Portfolio.`
          );
        }
      } else {
        const file = files[0];
        const optimizedDataUrl = await processUploadedImageFile(file);
        const suggestedTitle = formatTitleFromFilename(file.name);

        if (activeSection === "photography") {
          setPhotoDraft((prev) => ({
            ...prev,
            image: optimizedDataUrl,
            title: prev.title.trim() ? prev.title : suggestedTitle
          }));
          toast.success(
            "Photograph staged & calibrated. Click 'Publish to Photography' to go live."
          );
        } else {
          setVideoDraft((prev) => ({
            ...prev,
            coverImage: optimizedDataUrl,
            title: prev.title.trim() ? prev.title : suggestedTitle
          }));
          toast.success(
            "Cinema cover staged & calibrated. Click 'Publish to Videography' to go live."
          );
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process dropped image.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handlePublishPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoDraft.image.trim()) {
      toast.error("Please drag and drop an image (or enter an image URL) first.");
      return;
    }

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: photoDraft.title.trim() || "Starline Editorial Commission",
      subtitle:
        photoDraft.subtitle.trim() || "Natural light, quiet grace & 35mm analog emulsion",
      location: photoDraft.location.trim() || "Dallas, Texas",
      category: photoDraft.category,
      medium: photoDraft.medium.trim() || "35mm Portra 400 + Leica Primes",
      year: photoDraft.year.trim() || "2026",
      image: photoDraft.image.trim(),
      aspect: "portrait",
      focalPoint: photoDraft.focalPoint
    };

    try {
      const updated = [newPhoto, ...photos];
      savePhotographyItems(updated);
      setPhotos(updated);
      setPhotoDraft((prev) => ({
        ...prev,
        title: "",
        image: ""
      }));
      toast.success("Added to live Photography Portfolio.");
    } catch {
      toast.error("Storage limit reached. Delete an older item or use a smaller image.");
    }
  };

  const handlePublishVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoDraft.coverImage.trim()) {
      toast.error("Please drag and drop a cover image (or enter an image URL) first.");
      return;
    }

    const newFilm: VideoFilmItem = {
      id: `film-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: videoDraft.title.trim() || "Starline Cinema Commission",
      subtitle:
        videoDraft.subtitle.trim() ||
        "Crafted with vintage anamorphic glass & 35mm motion picture film",
      location: videoDraft.location.trim() || "Dallas, Texas",
      category: videoDraft.category,
      year: videoDraft.year.trim() || "2026",
      coverImage: videoDraft.coverImage.trim(),
      videoUrl: videoDraft.videoUrl.trim() || "/vid/new_section_img_optimized.mp4",
      duration: videoDraft.duration.trim() || "4:15",
      camera: videoDraft.camera.trim() || "Arri Alexa Mini LF // 35mm Anamorphic",
      details:
        videoDraft.details.trim() ||
        "Shot on Arri Alexa Mini LF & Cooke Anamorphic Primes with bespoke score",
      focalPoint: videoDraft.focalPoint
    };

    try {
      const updated = [newFilm, ...videos];
      saveVideographyItems(updated);
      setVideos(updated);
      setVideoDraft((prev) => ({
        ...prev,
        title: "",
        coverImage: ""
      }));
      toast.success("Added to live Videography Portfolio.");
    } catch {
      toast.error("Storage limit reached. Delete an older item or use a smaller image.");
    }
  };

  const handleReplaceCardImage = async (cardId: string, file: File) => {
    setIsProcessingImage(true);
    try {
      const optimized = await processUploadedImageFile(file);
      if (activeSection === "photography") {
        const updated = photos.map((p) => (p.id === cardId ? { ...p, image: optimized } : p));
        savePhotographyItems(updated);
        setPhotos(updated);
        toast.success("Photograph updated in live gallery.");
      } else {
        const updated = videos.map((v) =>
          v.id === cardId ? { ...v, coverImage: optimized } : v
        );
        saveVideographyItems(updated);
        setVideos(updated);
        toast.success("Videography cover image updated in live gallery.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not replace image.");
    } finally {
      setIsProcessingImage(false);
      setDragOverCardId(null);
      setReplacingCardId(null);
    }
  };

  const handleDeletePhoto = (id: string) => {
    const target = photos.find((p) => p.id === id);
    const previous = [...photos];
    const updated = photos.filter((p) => p.id !== id);
    savePhotographyItems(updated);
    setPhotos(updated);
    toast.success(`Removed "${target?.title || "Photograph"}" from Photography.`, {
      action: {
        label: "Undo",
        onClick: () => {
          savePhotographyItems(previous);
          setPhotos(previous);
        }
      }
    });
  };

  const handleDeleteVideo = (id: string) => {
    const target = videos.find((v) => v.id === id);
    const previous = [...videos];
    const updated = videos.filter((v) => v.id !== id);
    saveVideographyItems(updated);
    setVideos(updated);
    toast.success(`Removed "${target?.title || "Film"}" from Videography.`, {
      action: {
        label: "Undo",
        onClick: () => {
          saveVideographyItems(previous);
          setVideos(previous);
        }
      }
    });
  };

  const handleMovePhoto = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= photos.length) return;
    const copy = [...photos];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    savePhotographyItems(copy);
    setPhotos(copy);
  };

  const handleMoveVideo = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= videos.length) return;
    const copy = [...videos];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    saveVideographyItems(copy);
    setVideos(copy);
  };

  const handleUpdatePhotoField = (id: string, field: keyof PhotoItem, value: string) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, [field]: value } : p));
    savePhotographyItems(updated);
    setPhotos(updated);
  };

  const handleUpdateVideoField = (id: string, field: keyof VideoFilmItem, value: string) => {
    const updated = videos.map((v) => (v.id === id ? { ...v, [field]: value } : v));
    saveVideographyItems(updated);
    setVideos(updated);
  };

  const handleResetSection = () => {
    if (activeSection === "photography") {
      const defaults = resetPhotographyToDefaults();
      setPhotos(defaults);
      toast.success("Photography archive restored to studio default collection.");
    } else {
      const defaults = resetVideographyToDefaults();
      setVideos(defaults);
      toast.success("Videography archive restored to studio default collection.");
    }
  };

  const activeDraftImage =
    activeSection === "photography" ? photoDraft.image : videoDraft.coverImage;

  /* =========================================================================
     PROTECTED AUTHENTICATION GATE (RENDERED WHEN SESSION IS LOCKED)
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className="starline-page-shell admin-auth-gate-shell">
        <Navbar variant="light" />

        <main className="admin-auth-gate-main">
          <motion.div
            className="admin-auth-vault-card"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="admin-auth-vault-header">
              <div className="admin-auth-seal-ring">
                <Lock size={20} strokeWidth={1.6} />
              </div>
              <span className="admin-auth-kicker">
                STARLINE ATELIER // PROTECTED CURATORIAL GATE
              </span>
              <h1 className="admin-auth-title">Director Authentication</h1>
              <p className="admin-auth-subtitle">
                Enter the Studio Master Passcode to unlock the Photography &amp; Videography
                archive curation console.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="admin-auth-form">
              <div className="admin-auth-field">
                <label htmlFor="atelier-master-passcode" className="admin-label">
                  ATELIER MASTER PASSCODE
                </label>
                <div className="admin-auth-input-wrap">
                  <input
                    id="atelier-master-passcode"
                    type={showPasscode ? "text" : "password"}
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="Enter studio passcode..."
                    className="admin-auth-input"
                    autoFocus
                    autoComplete="current-password"
                    disabled={lockoutState.isLocked || isVerifying}
                  />
                  <button
                    type="button"
                    className="admin-auth-eye-btn"
                    onClick={() => setShowPasscode((prev) => !prev)}
                    aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
                  >
                    {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="admin-auth-error-banner" role="alert">
                  <span>{authError}</span>
                </div>
              )}

              {lockoutState.isLocked && !authError && (
                <div className="admin-auth-error-banner" role="alert">
                  <span>
                    Security lockout active. Try again in {lockoutState.remainingSeconds}s.
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="admin-auth-submit-btn"
                disabled={lockoutState.isLocked || isVerifying}
              >
                <ShieldCheck size={16} />
                <span>
                  {lockoutState.isLocked
                    ? `LOCKED (${lockoutState.remainingSeconds}S)`
                    : isVerifying
                    ? "VERIFYING CREDENTIALS..."
                    : "UNLOCK CURATORIAL STUDIO"}
                </span>
              </button>
            </form>

            <div className="admin-auth-vault-footer">
              <div className="admin-auth-security-meta">
                <span className="admin-cloud-dot is-connected" />
                <span>
                  {convexStatus.convexUrl
                    ? "CONVEX CLOUD ENCRYPTED GATE"
                    : "SHA-256 PROTECTED SESSION"}
                </span>
              </div>
              <Link href="/" className="admin-auth-back-link">
                <span>← RETURN TO PUBLIC ATELIER</span>
              </Link>
            </div>
          </motion.div>
        </main>

        <Footer showClosingCta={false} />
      </div>
    );
  }

  /* =========================================================================
     AUTHENTICATED CURATORIAL ADMIN CONSOLE
     ========================================================================= */
  return (
    <div className="starline-page-shell admin-editorial-shell">
      <Navbar variant="light" />

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFilesAddedToZone(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files && e.target.files[0] && replacingCardId) {
            handleReplaceCardImage(replacingCardId, e.target.files[0]);
            e.target.value = "";
          }
        }}
      />

      <main className="starline-page-main admin-editorial-main">
        {/* ===================================================================
            1. ATELIER CURATORIAL HEADER BANNER
            =================================================================== */}
        <section className="admin-hero-banner">
          <div className="admin-hero-inner">
            <div className="admin-hero-left">
              <div className="admin-kicker-badges-wrap">
                <div className="admin-kicker-row">
                  <Sparkles size={13} className="admin-kicker-icon" />
                  <span className="admin-kicker-text">
                    STARLINE ATELIER // CURATORIAL ARCHIVE CONSOLE
                  </span>
                </div>

                <div
                  className="admin-convex-badge"
                  title={
                    convexStatus.convexUrl
                      ? `Connected to Convex Cloud (${convexStatus.convexUrl})`
                      : "Local Persistence Active"
                  }
                >
                  <Cloud size={12} />
                  <span>
                    {convexStatus.convexUrl ? "CONVEX CLOUD ACTIVE" : "LOCAL STORAGE SYNC"}
                  </span>
                </div>
              </div>

              <h1 className="admin-hero-title">Portfolio Editorial Studio</h1>
              <p className="admin-hero-subtitle">
                Curate, drag-and-drop, and sequence high-resolution frames across your live
                Photography and Videography exhibition galleries with automatic aspect-ratio
                calibration.
              </p>
            </div>

            <div className="admin-hero-right-col">
              <div className="admin-security-bar">
                <button
                  type="button"
                  className="admin-security-btn"
                  onClick={() => setIsSecurityModalOpen(true)}
                >
                  <KeyRound size={13} />
                  <span>CHANGE PASSCODE</span>
                </button>
                <button
                  type="button"
                  className="admin-security-btn is-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={13} />
                  <span>LOCK CONSOLE</span>
                </button>
              </div>

              <div className="admin-hero-stats">
                <div className="admin-stat-box">
                  <span className="admin-stat-label">PHOTOGRAPHY ARCHIVE</span>
                  <span className="admin-stat-num">{photos.length}</span>
                  <Link href="/portfolio/photography" className="admin-stat-link">
                    <span>VIEW LIVE PAGE</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
                <div className="admin-stat-box">
                  <span className="admin-stat-label">VIDEOGRAPHY FILMS</span>
                  <span className="admin-stat-num">{videos.length}</span>
                  <Link href="/portfolio/videography" className="admin-stat-link">
                    <span>VIEW LIVE PAGE</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. DEDICATED SECTION SWITCHER BAR (PHOTOGRAPHY vs VIDEOGRAPHY)
            =================================================================== */}
        <section className="admin-nav-strip">
          <div className="admin-nav-strip-inner">
            <div className="admin-section-tabs" role="tablist" aria-label="Portfolio Sections">
              <button
                type="button"
                role="tab"
                aria-selected={activeSection === "photography"}
                className={`admin-section-tab ${
                  activeSection === "photography" ? "is-active" : ""
                }`}
                onClick={() => {
                  setActiveSection("photography");
                  setEditingId(null);
                }}
              >
                <Camera size={16} />
                <span>01 // PHOTOGRAPHY PORTFOLIO</span>
                <span className="admin-tab-count">{photos.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeSection === "videography"}
                className={`admin-section-tab ${
                  activeSection === "videography" ? "is-active" : ""
                }`}
                onClick={() => {
                  setActiveSection("videography");
                  setEditingId(null);
                }}
              >
                <Film size={16} />
                <span>02 // VIDEOGRAPHY PORTFOLIO</span>
                <span className="admin-tab-count">{videos.length}</span>
              </button>
            </div>

            <div className="admin-strip-actions">
              <Link
                href={
                  activeSection === "photography"
                    ? "/portfolio/photography"
                    : "/portfolio/videography"
                }
                className="admin-outline-pill-btn"
              >
                <Eye size={13} />
                <span>
                  PREVIEW LIVE {activeSection === "photography" ? "PHOTOGRAPHY" : "VIDEOGRAPHY"}
                </span>
                <ArrowUpRight size={13} />
              </Link>

              <button
                type="button"
                onClick={handleResetSection}
                className="admin-reset-btn"
                title="Restore default studio items for this section"
              >
                <RotateCcw size={13} />
                <span>RESTORE DEFAULTS</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. DRAG & DROP CURATION STUDIO + LIVE ALIGNMENT PREVIEW
            =================================================================== */}
        <section className="admin-workspace-section">
          <div className="admin-workspace-container">
            <div className="admin-curation-grid">
              {/* LEFT COLUMN: DRAG-AND-DROP ZONE & LIVE CALIBRATED PREVIEW */}
              <div className="admin-dropzone-col">
                <div className="admin-panel-header-row">
                  <div>
                    <span className="admin-section-overline">
                      {activeSection === "photography"
                        ? "PHOTOGRAPHY // DRAG & DROP INGEST"
                        : "VIDEOGRAPHY // DRAG & DROP INGEST"}
                    </span>
                    <h2 className="admin-panel-heading">
                      {activeSection === "photography"
                        ? "Add New Photography Frame"
                        : "Add New Videography Commission"}
                    </h2>
                  </div>

                  <label
                    className="admin-instant-toggle"
                    title="Automatically publish as soon as an image is dropped"
                  >
                    <input
                      type="checkbox"
                      checked={instantPublishOnDrop}
                      onChange={(e) => setInstantPublishOnDrop(e.target.checked)}
                    />
                    <span>Instant Publish on Drop</span>
                  </label>
                </div>

                {/* Drag & Drop Canvas */}
                <div
                  className={`admin-dropzone-box ${isDraggingZone ? "is-dragging" : ""} ${
                    activeDraftImage ? "has-image" : ""
                  }`}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDraggingZone(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isDraggingZone) setIsDraggingZone(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDraggingZone(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDraggingZone(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleFilesAddedToZone(e.dataTransfer.files);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  {activeDraftImage ? (
                    <div
                      className={`admin-staged-preview-wrap ${
                        activeSection === "photography" ? "is-photo-ratio" : "is-video-ratio"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={activeDraftImage}
                        alt="Staged Preview"
                        className="admin-staged-preview-img"
                        style={{
                          objectPosition:
                            activeSection === "photography"
                              ? photoDraft.focalPoint
                              : videoDraft.focalPoint
                        }}
                      />
                      <div className="admin-staged-overlay">
                        <div className="admin-staged-top-bar">
                          <span className="admin-staged-badge">
                            {activeSection === "photography"
                              ? "LOCKED 4:5 EDITORIAL FRAME"
                              : "LOCKED 16:9.5 CINEMA FRAME"}
                          </span>
                          <div className="admin-staged-actions">
                            <button
                              type="button"
                              className="admin-staged-btn"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload size={12} />
                              <span>CHANGE IMAGE</span>
                            </button>
                            <button
                              type="button"
                              className="admin-staged-btn is-clear"
                              onClick={() => {
                                if (activeSection === "photography") {
                                  setPhotoDraft((p) => ({ ...p, image: "" }));
                                } else {
                                  setVideoDraft((v) => ({ ...v, coverImage: "" }));
                                }
                              }}
                              aria-label="Clear staged image"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="admin-staged-bottom-meta">
                          <span className="admin-staged-loc">
                            <MapPin size={11} />
                            {activeSection === "photography"
                              ? photoDraft.location || "Dallas, Texas"
                              : videoDraft.location || "Dallas, Texas"}
                          </span>
                          <h4 className="admin-staged-title">
                            {(activeSection === "photography"
                              ? photoDraft.title
                              : videoDraft.title) || "Untitled Editorial Commission"}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="admin-dropzone-empty">
                      <div className="admin-dropzone-icon-ring">
                        <ImagePlus size={26} strokeWidth={1.4} />
                      </div>
                      <h3 className="admin-dropzone-title">
                        {isProcessingImage
                          ? "Calibrating Optical Frame..."
                          : `Drag & Drop ${
                              activeSection === "photography" ? "Photography" : "Videography"
                            } Images Here`}
                      </h3>
                      <p className="admin-dropzone-desc">
                        Drop single or multiple high-resolution files (JPEG, PNG, WebP, AVIF) or{" "}
                        <span className="admin-dropzone-browse">browse your computer</span>.
                      </p>
                      <div className="admin-dropzone-specs">
                        <span>AUTO-CROPPED &amp; ALIGNED</span>
                        <span>•</span>
                        <span>ZERO LAYOUT SHIFT</span>
                        <span>•</span>
                        <span>MULTI-DROP READY</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: EDITORIAL METADATA FORM */}
              <div className="admin-form-col">
                {activeSection === "photography" ? (
                  <form onSubmit={handlePublishPhoto} className="admin-editorial-form">
                    <div className="admin-form-header">
                      <span className="admin-section-overline">FRAME SPECIFICATION</span>
                      <h3 className="admin-form-title">Photography Metadata</h3>
                    </div>

                    <div className="admin-field-grid-2">
                      <div className="admin-field">
                        <label className="admin-label">COMMISSION TITLE</label>
                        <input
                          type="text"
                          placeholder="e.g. Rosecliff Mansion Oceanfront Vows"
                          value={photoDraft.title}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({ ...prev, title: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">LOCATION</label>
                        <input
                          type="text"
                          placeholder="e.g. Newport, Rhode Island"
                          value={photoDraft.location}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({ ...prev, location: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div className="admin-field-grid-3">
                      <div className="admin-field">
                        <label className="admin-label">CURATED CATEGORY</label>
                        <select
                          value={photoDraft.category}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({
                              ...prev,
                              category: e.target.value as PortfolioCategory
                            }))
                          }
                          className="admin-select"
                        >
                          {PORTFOLIO_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">FILM / CAMERA MEDIUM</label>
                        <input
                          type="text"
                          placeholder="e.g. 35mm Portra 400 + Leica"
                          value={photoDraft.medium}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({ ...prev, medium: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">ALIGNMENT FOCAL POINT</label>
                        <select
                          value={photoDraft.focalPoint}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({ ...prev, focalPoint: e.target.value }))
                          }
                          className="admin-select"
                        >
                          <option value="center center">Center Balanced (Default)</option>
                          <option value="center 20%">Upper Portrait (Faces / Heads)</option>
                          <option value="center 80%">Lower Horizon</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-field-grid-2">
                      <div className="admin-field">
                        <label className="admin-label">EDITORIAL SUBTITLE</label>
                        <input
                          type="text"
                          placeholder="e.g. Cliff Walk Atlantic breeze & twilight reception"
                          value={photoDraft.subtitle}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({ ...prev, subtitle: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">OR PASTE DIRECT IMAGE URL</label>
                        <input
                          type="text"
                          placeholder="https://... or /wd1.jpg (optional if dropped)"
                          value={photoDraft.image.startsWith("data:") ? "" : photoDraft.image}
                          onChange={(e) =>
                            setPhotoDraft((prev) => ({ ...prev, image: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <button type="submit" className="admin-publish-btn">
                      <Plus size={15} />
                      <span>PUBLISH TO PHOTOGRAPHY PORTFOLIO</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePublishVideo} className="admin-editorial-form">
                    <div className="admin-form-header">
                      <span className="admin-section-overline">CINEMA SPECIFICATION</span>
                      <h3 className="admin-form-title">Videography Metadata</h3>
                    </div>

                    <div className="admin-field-grid-2">
                      <div className="admin-field">
                        <label className="admin-label">FILM TITLE</label>
                        <input
                          type="text"
                          placeholder="e.g. Oceanfront Estate // Newport"
                          value={videoDraft.title}
                          onChange={(e) =>
                            setVideoDraft((prev) => ({ ...prev, title: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">LOCATION</label>
                        <input
                          type="text"
                          placeholder="e.g. Newport, Rhode Island"
                          value={videoDraft.location}
                          onChange={(e) =>
                            setVideoDraft((prev) => ({ ...prev, location: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div className="admin-field-grid-3">
                      <div className="admin-field">
                        <label className="admin-label">CURATED CATEGORY</label>
                        <select
                          value={videoDraft.category}
                          onChange={(e) =>
                            setVideoDraft((prev) => ({
                              ...prev,
                              category: e.target.value as PortfolioCategory
                            }))
                          }
                          className="admin-select"
                        >
                          {PORTFOLIO_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">CINEMA CAMERA &amp; LENS</label>
                        <input
                          type="text"
                          placeholder="e.g. Arri Alexa Mini LF // 35mm"
                          value={videoDraft.camera}
                          onChange={(e) =>
                            setVideoDraft((prev) => ({ ...prev, camera: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">DURATION &amp; FOCAL ALIGNMENT</label>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <input
                            type="text"
                            placeholder="4:32"
                            value={videoDraft.duration}
                            onChange={(e) =>
                              setVideoDraft((prev) => ({ ...prev, duration: e.target.value }))
                            }
                            className="admin-input"
                            style={{ width: "84px", flexShrink: 0 }}
                          />
                          <select
                            value={videoDraft.focalPoint}
                            onChange={(e) =>
                              setVideoDraft((prev) => ({ ...prev, focalPoint: e.target.value }))
                            }
                            className="admin-select"
                          >
                            <option value="center center">Center</option>
                            <option value="center 20%">Top / Faces</option>
                            <option value="center 80%">Lower</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="admin-field-grid-2">
                      <div className="admin-field">
                        <label className="admin-label">EDITORIAL SUBTITLE</label>
                        <input
                          type="text"
                          placeholder="e.g. Gilded Age mansions along the Atlantic Cliff Walk"
                          value={videoDraft.subtitle}
                          onChange={(e) =>
                            setVideoDraft((prev) => ({ ...prev, subtitle: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>

                      <div className="admin-field">
                        <label className="admin-label">OR PASTE COVER IMAGE URL</label>
                        <input
                          type="text"
                          placeholder="https://... or /wd1.jpg (optional if dropped)"
                          value={
                            videoDraft.coverImage.startsWith("data:") ? "" : videoDraft.coverImage
                          }
                          onChange={(e) =>
                            setVideoDraft((prev) => ({ ...prev, coverImage: e.target.value }))
                          }
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <button type="submit" className="admin-publish-btn">
                      <Plus size={15} />
                      <span>PUBLISH TO VIDEOGRAPHY PORTFOLIO</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. EXISTING ARCHIVE MANAGEMENT GRID (EDIT, DRAG-REPLACE & DELETE)
            =================================================================== */}
        <section className="admin-archive-section">
          <div className="admin-archive-container">
            <div className="admin-archive-header">
              <div>
                <span className="admin-section-overline">
                  {activeSection === "photography"
                    ? "LIVE PHOTOGRAPHY EXHIBITION // MANAGE FRAMES"
                    : "LIVE VIDEOGRAPHY EXHIBITION // MANAGE COMMISSIONS"}
                </span>
                <h2 className="admin-archive-title">
                  {activeSection === "photography"
                    ? `Active Photography Gallery (${photos.length})`
                    : `Active Videography Gallery (${videos.length})`}
                </h2>
              </div>
              <p className="admin-archive-tip">
                Tip: You can <strong>drag &amp; drop a new image directly onto any card below</strong>{" "}
                to replace its photo in-place, edit its captions, or delete it.
              </p>
            </div>

            {activeSection === "photography" ? (
              <div className="admin-cards-grid is-photo-grid">
                <AnimatePresence initial={false}>
                  {photos.map((photo, idx) => {
                    const isEditing = editingId === photo.id;
                    const isCardDragOver = dragOverCardId === photo.id;

                    return (
                      <motion.div
                        key={photo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                        className={`admin-item-card ${isCardDragOver ? "is-drop-target" : ""}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (dragOverCardId !== photo.id) setDragOverCardId(photo.id);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (dragOverCardId === photo.id) setDragOverCardId(null);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragOverCardId(null);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleReplaceCardImage(photo.id, e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <div className="admin-card-media is-photo-frame">
                          <img
                            src={photo.image}
                            alt={photo.title}
                            className="admin-card-img"
                            style={{ objectPosition: photo.focalPoint || "center center" }}
                            loading="lazy"
                          />
                          <div className="admin-card-badges">
                            <span className="admin-index-pill">
                              #{String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="admin-cat-pill">{photo.category}</span>
                          </div>

                          <div className="admin-card-drop-hint">
                            <Upload size={16} />
                            <span>DROP NEW IMAGE TO REPLACE</span>
                          </div>
                        </div>

                        <div className="admin-card-body">
                          {isEditing ? (
                            <div className="admin-inline-edit-box">
                              <input
                                type="text"
                                value={photo.title}
                                onChange={(e) =>
                                  handleUpdatePhotoField(photo.id, "title", e.target.value)
                                }
                                className="admin-inline-input"
                                placeholder="Title"
                              />
                              <input
                                type="text"
                                value={photo.location}
                                onChange={(e) =>
                                  handleUpdatePhotoField(photo.id, "location", e.target.value)
                                }
                                className="admin-inline-input"
                                placeholder="Location"
                              />
                              <input
                                type="text"
                                value={photo.medium}
                                onChange={(e) =>
                                  handleUpdatePhotoField(photo.id, "medium", e.target.value)
                                }
                                className="admin-inline-input"
                                placeholder="Medium"
                              />
                              <select
                                value={photo.focalPoint || "center center"}
                                onChange={(e) =>
                                  handleUpdatePhotoField(photo.id, "focalPoint", e.target.value)
                                }
                                className="admin-inline-select"
                              >
                                <option value="center center">Alignment: Center</option>
                                <option value="center 20%">Alignment: Top / Portrait</option>
                                <option value="center 80%">Alignment: Bottom</option>
                              </select>
                            </div>
                          ) : (
                            <div className="admin-card-info">
                              <h3 className="admin-card-title">{photo.title}</h3>
                              <p className="admin-card-sub">
                                {photo.location} • {photo.medium}
                              </p>
                            </div>
                          )}

                          <div className="admin-card-toolbar">
                            <div className="admin-order-btns">
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => handleMovePhoto(idx, -1)}
                                disabled={idx === 0}
                                title="Move earlier"
                                aria-label="Move earlier"
                              >
                                <ArrowUp size={13} />
                              </button>
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => handleMovePhoto(idx, 1)}
                                disabled={idx === photos.length - 1}
                                title="Move later"
                                aria-label="Move later"
                              >
                                <ArrowDown size={13} />
                              </button>
                            </div>

                            <div className="admin-action-btns">
                              <button
                                type="button"
                                className="admin-action-chip"
                                onClick={() => {
                                  setReplacingCardId(photo.id);
                                  replaceInputRef.current?.click();
                                }}
                                title="Upload replacement image"
                              >
                                <Upload size={12} />
                                <span>REPLACE</span>
                              </button>

                              <button
                                type="button"
                                className={`admin-action-chip ${isEditing ? "is-active" : ""}`}
                                onClick={() => setEditingId(isEditing ? null : photo.id)}
                              >
                                {isEditing ? <Check size={12} /> : <Edit3 size={12} />}
                                <span>{isEditing ? "DONE" : "EDIT"}</span>
                              </button>

                              <button
                                type="button"
                                className="admin-action-chip is-danger"
                                onClick={() => handleDeletePhoto(photo.id)}
                                title="Delete photograph"
                              >
                                <Trash2 size={12} />
                                <span>DELETE</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="admin-cards-grid is-video-grid">
                <AnimatePresence initial={false}>
                  {videos.map((film, idx) => {
                    const isEditing = editingId === film.id;
                    const isCardDragOver = dragOverCardId === film.id;

                    return (
                      <motion.div
                        key={film.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                        className={`admin-item-card ${isCardDragOver ? "is-drop-target" : ""}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (dragOverCardId !== film.id) setDragOverCardId(film.id);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (dragOverCardId === film.id) setDragOverCardId(null);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragOverCardId(null);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleReplaceCardImage(film.id, e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <div className="admin-card-media is-video-frame">
                          <img
                            src={film.coverImage}
                            alt={film.title}
                            className="admin-card-img"
                            style={{ objectPosition: film.focalPoint || "center center" }}
                            loading="lazy"
                          />
                          <div className="admin-card-badges">
                            <span className="admin-index-pill">
                              #{String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="admin-cat-pill">
                              {film.duration} • {film.category}
                            </span>
                          </div>

                          <div className="admin-card-drop-hint">
                            <Upload size={16} />
                            <span>DROP NEW COVER IMAGE TO REPLACE</span>
                          </div>
                        </div>

                        <div className="admin-card-body">
                          {isEditing ? (
                            <div className="admin-inline-edit-box">
                              <input
                                type="text"
                                value={film.title}
                                onChange={(e) =>
                                  handleUpdateVideoField(film.id, "title", e.target.value)
                                }
                                className="admin-inline-input"
                                placeholder="Film Title"
                              />
                              <input
                                type="text"
                                value={film.location}
                                onChange={(e) =>
                                  handleUpdateVideoField(film.id, "location", e.target.value)
                                }
                                className="admin-inline-input"
                                placeholder="Location"
                              />
                              <input
                                type="text"
                                value={film.subtitle}
                                onChange={(e) =>
                                  handleUpdateVideoField(film.id, "subtitle", e.target.value)
                                }
                                className="admin-inline-input"
                                placeholder="Subtitle"
                              />
                              <div style={{ display: "flex", gap: "8px" }}>
                                <input
                                  type="text"
                                  value={film.camera}
                                  onChange={(e) =>
                                    handleUpdateVideoField(film.id, "camera", e.target.value)
                                  }
                                  className="admin-inline-input"
                                  placeholder="Camera"
                                />
                                <select
                                  value={film.focalPoint || "center center"}
                                  onChange={(e) =>
                                    handleUpdateVideoField(film.id, "focalPoint", e.target.value)
                                  }
                                  className="admin-inline-select"
                                >
                                  <option value="center center">Center</option>
                                  <option value="center 20%">Top / Faces</option>
                                  <option value="center 80%">Bottom</option>
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div className="admin-card-info">
                              <h3 className="admin-card-title">{film.title}</h3>
                              <p className="admin-card-sub">
                                {film.location} • {film.camera}
                              </p>
                            </div>
                          )}

                          <div className="admin-card-toolbar">
                            <div className="admin-order-btns">
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => handleMoveVideo(idx, -1)}
                                disabled={idx === 0}
                                title="Move earlier"
                                aria-label="Move earlier"
                              >
                                <ArrowUp size={13} />
                              </button>
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => handleMoveVideo(idx, 1)}
                                disabled={idx === videos.length - 1}
                                title="Move later"
                                aria-label="Move later"
                              >
                                <ArrowDown size={13} />
                              </button>
                            </div>

                            <div className="admin-action-btns">
                              <button
                                type="button"
                                className="admin-action-chip"
                                onClick={() => {
                                  setReplacingCardId(film.id);
                                  replaceInputRef.current?.click();
                                }}
                                title="Upload replacement cover image"
                              >
                                <Upload size={12} />
                                <span>REPLACE</span>
                              </button>

                              <button
                                type="button"
                                className={`admin-action-chip ${isEditing ? "is-active" : ""}`}
                                onClick={() => setEditingId(isEditing ? null : film.id)}
                              >
                                {isEditing ? <Check size={12} /> : <Edit3 size={12} />}
                                <span>{isEditing ? "DONE" : "EDIT"}</span>
                              </button>

                              <button
                                type="button"
                                className="admin-action-chip is-danger"
                                onClick={() => handleDeleteVideo(film.id)}
                                title="Delete commission"
                              >
                                <Trash2 size={12} />
                                <span>DELETE</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ===================================================================
          CHANGE MASTER PASSCODE MODAL
          =================================================================== */}
      <AnimatePresence>
        {isSecurityModalOpen && (
          <motion.div
            className="starline-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSecurityModalOpen(false)}
          >
            <motion.div
              className="admin-security-modal-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-security-modal-header">
                <div>
                  <span className="admin-section-overline">SECURITY CREDENTIALS</span>
                  <h3 className="admin-form-title">Update Atelier Passcode</h3>
                </div>
                <button
                  type="button"
                  className="admin-icon-btn"
                  onClick={() => setIsSecurityModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleChangePasscodeSubmit} className="admin-security-modal-form">
                <div className="admin-field">
                  <label className="admin-label">CURRENT PASSCODE</label>
                  <input
                    type="password"
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    className="admin-input"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">NEW PASSCODE (MIN 8 CHARACTERS)</label>
                  <input
                    type="password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="admin-input"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">CONFIRM NEW PASSCODE</label>
                  <input
                    type="password"
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    className="admin-input"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <button type="submit" className="admin-publish-btn">
                  <ShieldCheck size={15} />
                  <span>SAVE NEW PASSCODE HASH</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer showClosingCta={false} />
    </div>
  );
}
