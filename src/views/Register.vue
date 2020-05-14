<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Sign Up</span>
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
            <div class="input-field">
                <input
                        id="name"
                        type="text"
                        v-model.trim="name"
                        :class="{invalid: $v.password.$dirty && !$v.password.required}"
                >
                <label for="name">Name</label>
                <small
                        v-if="$v.name.$dirty && !$v.name.required"
                        class="helper-text invalid"
                >
                    Name field is required
                </small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model.trim="agree"/>
                    <span>Are you agree ?</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Register
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Already have account?
                <router-link to="/login">Sign In!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators'

    export default {
        name: "Register",
        data() {
            return {
                name: '',
                email: '',
                password: '',
                agree: false,
            }
        },

        validations: {
            name: {required},
            email: {email, required},
            password: {required, minLength: minLength(8)},

            agree: {checked: v => v},
        },

        methods: {
            async submitHandler() {
                if(this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                const formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                };

                try {
                    await this.$store.dispatch('register', formData);
                    await this.$router.push('/');
                }catch (e) {
                    console.log(e)
                }

            }
        },
    }
</script>

<style scoped>

</style>