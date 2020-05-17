<template>
    <div>
        <Loader v-if="loading" />
        <div v-else>
            <div class="page-title">
                <h3>Categories</h3>
            </div>
            <section>
                <div class="row">

                    <CreateCategory @created="addCategory"/>

                    <EditCategory
                            v-if="categories.length"
                            :key="categories.length + categoryCount"
                            :categories="categories"
                            @updated="updateCategory"/>

                    <p v-else class="center">No Category yet!</p>

                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import CreateCategory from "../components/CreateCategory";
    import EditCategory from "../components/EditCategory";

    export default {
        name: "Categories",

        components: {
            CreateCategory, EditCategory
        },

        data: () => ({
            categories: [],
            loading: true,
            categoryCount: 0,
        }),

        methods: {
            addCategory(category) {
                this.categories.push(category);
            },

            updateCategory(category) {
                const idx = this.categories.findIndex(e => e.id === category.id);
                this.categories[idx].title = category.title;
                this.categories[idx].limit = category.limit;
                this.categoryCount++;
            },
        },

        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories');
            this.loading = false;
        },

    }
</script>

<style scoped>

</style>