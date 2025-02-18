import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
      fontFamily: {
        title: ['Neuton'],
        body: ['Mulish']
      },
      extend: {
        colors: {
          primary: {
            50: "#fafdfb",
            100: "#e5f5eb",
            200: "#d0eddc",
            300: "#bbe5cc",
            400: "#a6ddbd",
            500: "#91d5ad",
            600: "#7bb593",
            700: "#669579",
            800: "#50755f",
            900: "#3a5545",
            950: "#24352b"
          }
        }
      }
  }
}
