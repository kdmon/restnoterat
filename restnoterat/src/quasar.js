import Vue from 'vue'

import './styles/quasar.sass'
import 'quasar/dist/quasar.ie.polyfills'
import lang from 'quasar/lang/sv.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  lang: lang
})
