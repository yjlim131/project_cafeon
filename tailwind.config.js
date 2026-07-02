var config = {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#FAF8F5",
                foreground: "#2B1E16",
                surface: "#FFFDF9",
                "surface-muted": "#F8F3EC",
                border: "#EDE3D8",
                primary: "#6F4E37",
                "primary-foreground": "#FFFDF9",
                secondary: "#B08968",
                accent: "#DDB892",
                muted: "#F4EFE8",
                "muted-foreground": "#8B6B52",
                espresso: {
                    900: "#2B1E16",
                    800: "#3A281D",
                    700: "#4B3325",
                    600: "#6F4E37",
                    500: "#8B6B52",
                },
                latte: {
                    500: "#B08968",
                    400: "#C7A17A",
                    300: "#DDB892",
                },
                cream: {
                    100: "#FAF8F5",
                    200: "#F4EFE8",
                    300: "#EDE3D8",
                },
                sand: {
                    100: "#FFFDF9",
                    200: "#F8F3EC",
                },
                sage: {
                    500: "#6F8F72",
                },
                terracotta: {
                    500: "#C86B4A",
                },
                gold: {
                    500: "#D9A441",
                },
            },
            borderRadius: {
                xs: "6px",
                sm: "10px",
                md: "14px",
                lg: "18px",
                xl: "24px",
                "2xl": "28px",
            },
            boxShadow: {
                card: "0 8px 24px rgba(43, 30, 22, 0.08)",
                "card-hover": "0 12px 32px rgba(43, 30, 22, 0.12)",
                "bottom-nav": "0 -8px 24px rgba(43, 30, 22, 0.08)",
                "bottom-sheet": "0 -12px 40px rgba(43, 30, 22, 0.14)",
                modal: "0 18px 60px rgba(43, 30, 22, 0.18)",
            },
            fontFamily: {
                sans: [
                    "Pretendard",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "system-ui",
                    "Segoe UI",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [],
};
export default config;
