<template>
  <v-app id="inspire">
     
 
   <v-main>
      <router-view></router-view>
    </v-main>
      <Dashboard v-if="isLoggedIn"/>
     
 
  </v-app>
</template>

<script>
import { mapGetters} from "vuex";
import Dashboard from './views/Dashboard.vue'
  export default {
    name: 'app',

    components: {
      Dashboard
    },
    computed: {
    ...mapGetters(["isLoggedIn"])
  },
  
    

  }
</script>