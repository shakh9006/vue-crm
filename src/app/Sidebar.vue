<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">

        <router-link
            v-for="link in links"
            :key="link.url"
            tag="li"
            :to="link.url"
            :ecact="link.exact"
        >
            <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>
    export default {
        name: "Sidebar",
        props: {
            value: Boolean,
        },
        data() {
            return {
                links: [
                    {title: 'Invoice', url: '/', exact: true},
                    {title: 'History', url: '/history'},
                    {title: 'Planning', url: '/planning'},
                    {title: 'New Record', url: 'record'},
                    {title: 'Categories', url: '/categories'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>