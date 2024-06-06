/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                // 'bounce': {
                //     '0%,100%': {
                //         transform: "translateY(0)",
                //     },
                //     '50%': {
                //         transform: "translateY(-1px)",
                //     }
                // }
            }
        },
        screens: {
            // header
            'hsm': {'max': '1099.9px'},
            'hmm': {'max': '1280px'},
            'hmd': {'min': '1100px', 'max': '1366.9px'},
            'hmx': {'min': '1367px', 'max': '1700.9px'},
            'hlg': {'min': '1701px', 'max': '2199.9px'},
            'hxl': {'min': '2200px'},

            // main
            'mainmd': {'min': '1300px', 'max': '1399.9.9px'},
            'mainlg': {'min': '1400px', 'max': '1559.9.9px'},
        }
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        /**
         * @see https://www.npmjs.com/package/tailwindcss-animate
         * @description 用于设置元素的动画
         */
        require('tailwindcss-animate'),
        /**
         * @see https://www.npmjs.com/package/@tailwindcss/aspect-ratio
         * @description 用于设置元素的宽高比
         */
        require('@tailwindcss/aspect-ratio'),
    ],
}

