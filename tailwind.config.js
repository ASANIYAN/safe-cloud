/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.8rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        progressbar: "#00BCB1",
        goggleBtnBg: "#FDFEFE",
        googleBtnText: "#1565C0",
        homepageCloudIcon: "#8EC7FC",
        sideBar: "#264187",
        sideBarHover: "#233C80",
        doc: "#518FF5",
        sheet: "#23A566",
      },
    },
  },
};
