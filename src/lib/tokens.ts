/**
 * WalkShark Community Rewards - "Soft Rectangles" Design Tokens
 * Strict 3-Color Brand Palette: Fog Grey, Workshop Teal, Deep Navy, & Neutral White
 */

export const TOKENS = {
  colors: {
    // Canvas & Neutral surfaces
    canvas: "var(--color-fog-grey, #EDEDED)",
    fogGrey: "#EDEDED",
    fogGreyLight: "#F7F7F7",
    surfaceWhite: "#FFFFFF",

    // Workshop Teal (Primary Brand Color)
    teal: {
      50: "#E6F2F6",
      100: "#CCE4EC",
      300: "#5FAAC0",
      500: "#12789C", // Primary Brand Accent
      600: "#0E6180",
      700: "#0A4A62",
    },

    // Deep Navy (Primary Text & Dark Surfaces)
    navy: {
      900: "#0C2342", // Primary Text & Contrast Cards
      700: "#1A3A63",
      500: "#3D5A80",
      300: "#8798B0",
    },

    // Secondary Text (Navy at 60% opacity)
    text: {
      primary: "#0C2342",
      secondary: "rgba(12, 35, 66, 0.60)",
      tertiary: "rgba(12, 35, 66, 0.40)",
      inverse: "#FFFFFF",
    },

    // Gradients
    gradients: {
      tealCard: "linear-gradient(135deg, #1896BE 0%, #12789C 50%, #0E6180 100%)",
      navyCard: "linear-gradient(135deg, #1A3A63 0%, #0C2342 100%)",
      lightCard: "linear-gradient(135deg, #FFFFFF 0%, #EDEDED 100%)",
      teal300To500: "linear-gradient(135deg, #5FAAC0 0%, #12789C 100%)",
    },

    // Status Colors (Strict Palette Only)
    status: {
      pending: {
        bg: "#EDEDED",
        text: "#0C2342",
        border: "transparent",
      },
      approved: {
        bg: "#CCE4EC", // Teal 100
        text: "#0A4A62", // Teal 700
        border: "transparent",
      },
      rejected: {
        bg: "#0C2342", // Navy 900
        text: "#FFFFFF",
        border: "transparent",
      },
      valueTag: {
        bg: "#FFFFFF",
        text: "#0C2342",
        border: "#EDEDED",
      },
    },
  },

  // Soft Geometry Radii
  radii: {
    hero: "40px",
    card: "28px",
    sheet: "32px",
    tile: "20px",
    button: "16px",
    input: "16px",
    chip: "12px",
    pill: "999px",
  },

  // Soft Diffused Shadows & Colored Glows
  shadows: {
    soft: "0 10px 30px rgba(12, 35, 66, 0.08)",
    softHover: "0 14px 36px rgba(12, 35, 66, 0.12)",
    tealGlow: "0 18px 30px -10px rgba(18, 120, 156, 0.40)",
    navyGlow: "0 18px 30px -10px rgba(12, 35, 66, 0.35)",
    sm: "0 2px 8px rgba(12, 35, 66, 0.04)",
  },

  // Typography (Only 2 fonts allowed)
  typography: {
    heading: "var(--font-heading), 'Bricolage Grotesque', sans-serif",
    body: "var(--font-body), 'Helvetica World', Helvetica, Arial, sans-serif",
  },

  conversion: {
    pointsToRupeeMultiplier: 2.5,
    minRedeemPoints: 100,
  },
} as const;
