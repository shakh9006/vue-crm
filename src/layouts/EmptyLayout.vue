<template>
    <div class="grey darken-1 empty-layout">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "Empty",
        computed: {
            error() {
                return this.$store.getters.error;
            }

        },

        watch: {
            error(fError) {
                this.$message(fError.message);
            }
        }
    }
</script>

<style scoped>

</style>