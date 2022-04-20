module.exports = {
  purge: {
    content: [ "./src/**/*.{html,ts, scss}",]
  },
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      },
      keyframes: (theme) => ({
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      }),
    },
  },
  variants: {
    animation: ["motion-safe"],
  },
  plugins: [require("@tailwindcss/typography")],
};
