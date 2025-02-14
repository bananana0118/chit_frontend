import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        'fixed-screen': '360px',
      },
      height: {
        'fixed-screen': '600px',
      },
      borderWidth: {
        '3': '3px', // 3px 테두리 추가
      },
      boxShadow: {
        'inset-primary': '0 0 0 4px #38C958 inset', // 사용자 정의 inset box-shadow 추가
        'inset-disable': '0 0 0 4px #A7A7A7 inset', // 사용자 정의 inset box-shadow 추가
      },
      colors: {
        primary: '#38C958',
        secondary: '#9568FF',
        background: '#141517',
        'background-sub': '#F9F9F9',
        alert: '#FF6161',
        disable: '#A7A7A7',
        textColors: {
          main: '#FDFDFD',
          sub: '#0A0A0A',
          hint: '#7A7A7A',
          'input-placeholder': '#B4B4B4',
        },
      },
      fontSize: {
        'bold-big': ['60px', { lineHeight: '1.5', fontWeight: '700' }],
        'bold-large': ['24px', { lineHeight: '1.5', fontWeight: '700' }],
        'bold-middle': ['18px', { lineHeight: '1.5', fontWeight: '700' }],
        'bold-small': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
        'semi-bold': ['10px', { lineHeight: '1.5', fontWeight: '600' }],
        'medium-small': ['10px', { lineHeight: '1.5', fontWeight: '500' }],
        medium: ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        'medium-large': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
      theme: (path: string) => unknown;
    }) {
      const textColors = theme('colors.textColors') as Record<string, string>;
      const textColorUtilities = Object.entries(textColors).reduce<
        Record<string, Record<string, string>>
      >((acc, [key, value]) => {
        acc[`.text-${key}`] = { color: value }; // 명확한 타입 지정
        return acc;
      }, {});

      addUtilities({ ...textColorUtilities });
    },
  ],
} satisfies Config;
