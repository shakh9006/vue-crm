<template>
    <div>
        <Loader v-if="loading"/>
        <div v-else class="app-main-layout">
            <Navbar @click="isOpen = !isOpen"/>
            <Sidebar v-model="isOpen"/>
            <main class="app-content" :class="{full: !isOpen}">
                <div class="app-page">
                    <router-view></router-view>
                </div>
            </main>
            <div class="fixed-action-btn">
                <router-link class="btn-floating btn-large blue" to="/record">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import Sidebar from "../components/Sidebar";
    export default {
        name: "MainLayout",
        components: {
            Sidebar, Navbar
        },
        data() {
            return {
                isOpen: true,
                loading: true,
            }
        },
        async mounted() {
            if(!Object.keys(this.$store.getters.getInfo).length){
                await this.$store.dispatch('fetchInfo');
                this.loading = false;
            }
        },
    }
</script>

<style scoped>

</style>