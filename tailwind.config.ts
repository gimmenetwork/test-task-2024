import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gray: colors.gray,
                green: colors.green,
                red: colors.red,
                // Coolors.co
                darkGreen: '#98CE00', // goes with black text
                lightGreen: '#5ef38c', // goes with black text
                darkBrown: '#343A1A', // goes with white text
                lint: '#bacc81', // goes with white text
                fandango: '#A80874', // goes with white text
                jasmine: '#FBD87F', // goes with black text
            },
        },
    },
    plugins: [],
} satisfies Config;
