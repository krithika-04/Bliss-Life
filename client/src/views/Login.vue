<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 cyan--text text--lighten-3"
                        >Sign in to Bliss Life </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        
                        <v-form @submit.prevent="loginUser">
                          <v-text-field
                            label="Username"
                            name="username"
                            v-model="username"
                            prepend-icon="person"
                            type="text"
                            color="cyan lighten-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            prepend-icon="lock"
                            type="password"
                            color="cyan lighten-3"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center my-3">
                        <v-btn type="submit" rounded color="cyan lighten-3" @click="loginUser" dark>SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="cyan lighten-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="cyan lighten-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form @submit.prevent="registerUser">
                          <v-text-field
                            label="Name"
                            name="Name"
                            v-model="name"
                            prepend-icon="person"
                            type="text"
                            color="cyan lighten-3"
                          />
                          <v-text-field
                            label="Username"
                            name="username"
                            v-model="username"
                            prepend-icon="person"
                            type="text"
                            color="cyan lighten-3"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            v-model="email"
                            type="text"
                            color="cyan lighten-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            prepend-icon="lock"
                            type="password"
                            color="cyan lighten-3"
                          />
                          <v-text-field
                            id="cpassword"
                            label="Confirm Password"
                            name="cpassword"
                            v-model="confirm_password"
                            prepend-icon="lock"
                            type="password"
                            color="cyan lighten-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center my-5">
                        <v-btn rounded color="cyan lighten-3" @click="registerUser">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    step: 1,
     username: "",
      password: "",
      confirm_password:"",
      email:"",
      name:"",
  }),
  props: {
    source: String
  },
  methods: {
    ...mapActions(['login']),
      ...mapActions(["register"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/dashboard/home");
          }
          //console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    registerUser() {
      let user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name
      };
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push("/dashboard/home");
        }
      });
    }
  }
};
</script>