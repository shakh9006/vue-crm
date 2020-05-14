<template>
    <form class="card auth-card" @submit.prevent="login">
        <div class="card-content">
            <span class="card-title" style="text-align: center">Login</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        class="validate"
                        v-model.trim="email"
                        :class="{invalid: (!$v.email.required && $v.email.$dirty) || ($v.email.$dirty && !$v.email.email)}"
                >
                <label for="email">Email</label>
                <small
                    v-if="$v.email.$dirty && !$v.email.required"
                    class="helper-text invalid"
                >
                    Email field is required
                </small>
                <small
                        v-else-if="$v.email.$dirty && !$v.email.email"
                        class="helper-text invalid"
                >
                    Bad Email address
                </small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        class="validate"
                        v-model.trim="password"
                        :class="{invalid: ($v.password.$dirty) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <label for="password">Password</label>
                <small
                        v-if="$v.password.$dirty && !$v.password.required"
                        class="helper-text invalid"
                >
                    Password field is required
                </small>
                <small
                        v-else-if="$v.password.$dirty && !$v.password.minLength"
                        class="helper-text invalid"
                >
                    Password length is must be {{$v.password.$params.minLength.min}}, entered {{password.length}}
                </small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Sign In
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                No Account yet?
                <router-link to="/register">Sign Up</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators'
    import $messages from '../utils/messages';
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
            }
        },

        validations: {
            email: {email, required},
            password: {required, minLength: minLength(8)}
        },


        mounted() {
            if($messages[this.$route.query.message])
                this.$message($messages[this.$route.query.message]);
        },

        methods: {
           async login() {
                if(this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                const formData = {
                    email: this.email,
                    password: this.password,
                };

                try {
                    await this.$store.dispatch('login', formData);
                    await this.$router.push('/');
                }catch (e) {
                    console.log(e);
                }

            }
        },
    }
</script>

<style scoped>

</style>