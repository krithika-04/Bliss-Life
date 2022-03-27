<template>
  <v-container class="my-8" v-if="hasData">
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Profile
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              >
            </v-avatar>
            <p class="ml-3">
               {{ user.name}}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
          Username : {{user.username}}  
          </div>
          <div class="font-weight-bold ml-8 mb-2">
          E-mail : {{user.email}}  
          </div>

          
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
export default {
  data(){
return {
  hasData:false
}
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
 async created() {
  const user=  await this.getProfile();
  this.hasData=true
  }
};
</script>