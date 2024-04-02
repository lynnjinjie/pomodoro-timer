import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts:{ 
    'btn': 'py-2 px-6 font-semibold rounded-lg shadow-md',
    'time-btn': 'px-2 py-2 w-22 rounded-md bg-[#5b83a0] text-center hover:(bg-[#292e36])'
   },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        nunito: ['Nunito:400,700']
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
