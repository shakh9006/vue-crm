<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('click')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{date | dateFormat('datetime')}}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
                        {{ getName }}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <li>
                            <router-link to="/profile" class="black-text">
                                <i class="material-icons">account_circle</i>Profile
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a @click.prevent="logout" href="#" class="black-text">
                                <i class="material-icons">assignment_return</i>{{getText}}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        data(){
            return {
                date: '',
                timer: null,
                dropdown: null,
                isUserValid: true,
            }
        },

        computed: {
           getName() {
               return this.$store.getters.getInfo.name ? this.$store.getters.getInfo.name : 'Please Sign In';
           },

           getText() {
               return this.$store.getters.getInfo.name ? 'Logout' : 'Sign Up'
           }
        },

        mounted() {
            this.timer = setInterval(() => this.date = new Date, 1000);
            this.dropdown = this.$refs.dropdown;
            window.M.Dropdown.init(this.dropdown, {
                constrainWidth: false,
            });

        },

        methods: {
            async logout() {

               if(this.$store.getters.getInfo.name) {
                   await  this.$store.dispatch('logout');
                   await  this.$router.push('/login?message=logout');
               }else{
                   await  this.$router.push('/login');
               }
            },
        },

        beforeDestroy() {

            clearInterval(this.timer);

            if(this.dropdown && this.dropdown.destroy)
                this.dropdown.destroy();
        }
    }
</script>

<style scoped>

</style>