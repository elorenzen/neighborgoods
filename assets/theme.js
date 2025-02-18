
import { definePreset, palette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const values1 = palette("#91D5AD");
console.log('values1: ', values1)

const getPalette = (hex) => {
    return palette(hex)
}

const ThemePreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                primary: "#91D5AD",
                "surfaceTint": "#91D5AD",
                "onPrimary": "#003921",
                "primaryContainer": "#045233",
                "onPrimaryContainer": "#ACF2C7",
                "secondary": "#91D5AC",
                "onSecondary": "#003921",
                "secondaryContainer": "#055232",
                "onSecondaryContainer": "#ADF2C7",
                "tertiary": "#87D1EB",
                "onTertiary": "#003543",
                "tertiaryContainer": "#004E60",
                "onTertiaryContainer": "#B5EBFF",
                "error": "#FFB4AB",
                "onError": "#690005",
                "errorContainer": "#93000A",
                "onErrorContainer": "#FFDAD6",
                "background": "#0F1511",
                "onBackground": "#DFE4DD",
                "surface": "#0F1511",
                "onSurface": "#DFE4DD",
                "surfaceVariant": "#404942",
                "onSurfaceVariant": "#C0C9C0",
                "outline": "#8A938B",
                "outlineVariant": "#404942",
                "shadow": "#000000",
                "scrim": "#000000",
                "inverseSurface": "#DFE4DD",
                "inverseOnSurface": "#2C322D",
                "inversePrimary": "#276A49",
                "primaryFixed": "#ACF2C7",
                "onPrimaryFixed": "#002112",
                "primaryFixedDim": "#91D5AD",
                "onPrimaryFixedVariant": "#045233",
                "secondaryFixed": "#ADF2C7",
                "onSecondaryFixed": "#002111",
                "secondaryFixedDim": "#91D5AC",
                "onSecondaryFixedVariant": "#055232",
                "tertiaryFixed": "#B5EBFF",
                "onTertiaryFixed": "#001F28",
                "tertiaryFixedDim": "#87D1EB",
                "onTertiaryFixedVariant": "#004E60",
                "surfaceDim": "#0F1511",
                "surfaceBright": "#353B36",
                "surfaceContainerLowest": "#0A0F0C",
                "surfaceContainerLow": "#171D19",
                "surfaceContainer": "#1B211D",
                "surfaceContainerHigh": "#262B27",
                "surfaceContainerHighest": "#303632"
            },
        }
    }
});

export default {
    preset: ThemePreset,
};

