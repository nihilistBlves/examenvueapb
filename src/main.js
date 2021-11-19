import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomeComponent from './components/Home/Home.vue'
import VerPeliculasComponent from './components/Peliculas/VerPeliculas.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {path: "/home", component: HomeComponent},
  {path: "/generos/:idGenero", component: VerPeliculasComponent},
  {path: "/nacionalidades/:idNacionalidad", component: VerPeliculasComponent},
  {path: "/buscar/:busqueda", component: VerPeliculasComponent},
  {path: "", component: HomeComponent}
]

const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
