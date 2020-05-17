import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filters'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import "materialize-css/dist/js/materialize.min"
import Loader from "./components/Loader";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';


firebase.initializeApp({
  apiKey: "AIzaSyBnxCvGAS1mGW8DPdkhvYhBai435JpNFvA",
  authDomain: "simple-crm-66ca0.firebaseapp.com",
  databaseURL: "https://simple-crm-66ca0.firebaseio.com",
  projectId: "simple-crm-66ca0",
  storageBucket: "simple-crm-66ca0.appspot.com",
  messagingSenderId: "183738002933",
  appId: "1:183738002933:web:66a7ef19cced1eda26c4bc"
});

let app;
Vue.component('Loader', Loader);
Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('dateFormat', dateFilter);

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});