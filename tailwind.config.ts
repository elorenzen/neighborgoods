import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: {
      fontFamily: {
        title: ['Neuton'],
        body: ['Mulish']
      },
      extend: {
        colors: {
          primary: "#276A49"
        }
      }
  }
}
