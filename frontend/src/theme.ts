import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        redRYB: Palette['primary'];
        redPigment: Palette['primary'];
        jet: Palette['primary'];
        richBlack: Palette['primary'];
        cultured: Palette['primary'];
    }

    interface PaletteOptions {
        redRYB?: PaletteOptions['primary'];
        redPigment?: PaletteOptions['primary'];
        jet?: PaletteOptions['primary'];
        richBlack?: PaletteOptions['primary'];
        cultured?: PaletteOptions['primary'];
    }

    interface TypographyVariants {
        logoFontFamily: React.CSSProperties['fontFamily'];
    }

    interface TypographyVariantsOptions {
        logoFontFamily?: React.CSSProperties['fontFamily'];
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        logoFontFamily: true;
    }
}

const theme: {
    typography: { logoFontFamily: string };
    palette: {
        common: { white: string; black: string };
        cultured: { contrastText: string; main: string };
        jet: { contrastText: string; main: string };
        black: { contrastText: string; main: string };
        richBlack: { contrastText: string; main: string };
        text: { primary: string };
        redRYB: { contrastText: string; main: string };
        redPigment: { contrastText: string; main: string }
    }
} = {
    palette: {
        common: {
            black: '#000814',
            white: '#F2F2F2',
        },
        redRYB: {
            main: '#FF2625',
            contrastText: '#F2F2F2',
        },
        redPigment: {
            main: '#E62121',
            contrastText: '#F2F2F2',
        },
        jet: {
            main: '#303030',
            contrastText: '#F2F2F2',
        },
        richBlack: {
            main: '#000814',
            contrastText: '#F2F2F2',
        },
        cultured: {
            main: '#F2F2F2',
            contrastText: '#000814',
        },
        black: {
            main: '#000000',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#000814',
        },
    },
    typography: {
        logoFontFamily: 'Ubuntu, sans-serif',
    },
};

export default createTheme(theme);
