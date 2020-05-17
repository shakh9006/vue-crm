<template>
    <div>
        <div class="page-title">
            <h3>Record History</h3>
        </div>
        <Loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">There is no any records. <router-link to="/record">Please Create New</router-link></p>
        <template v-else>
            <div class="history-chart">
                <canvas></canvas>
            </div>

            <section>
                <HistoryTable :records="records"/>
            </section>
        </template>
    </div>
</template>

<script>
    import HistoryTable from "../components/HistoryTable";
    export default {
        name: "History",
        components: {
            HistoryTable
        },
        data: () => ({
            records: [],
            loading: true,
            categories: [],
        }),

        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');
            this.categories = await this.$store.dispatch('fetchCategories');
            this.records = records.map(r => ({
                ...r,
                categoryName: this.categories.find(c => c.id = r.category).title,
                typeColor: r.type === 'income' ? 'green' : 'red',
            }));

            this.loading = false;
        },
    }
</script>

<style scoped>

</style>