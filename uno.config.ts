import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts:{ 
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md'
   },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
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
