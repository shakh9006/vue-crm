<template>
    <div>
        <div class="page-title">
            <h3>Record History</h3>
        </div>
        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">There is no any records. <router-link to="/record">Please Create New</router-link></p>
        <section>
            <HistoryTable :records="items" :key="pageSize"/>
            <Paginate
                :page-count="pageCount"
                :click-handler="paginateHandler"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :page-class="'waves-effect'"
                :container-class="'pagination'"
            />
        </section>
    </div>
</template>

<script>
    import HistoryTable from "../components/HistoryTable";
    import Mixin from "../mixins/paginate.mixin"
    import { Pie } from 'vue-chartjs'
    export default {
        name: "History",
        extends: Pie,
        mixins: [Mixin],
        components: {
            HistoryTable
        },
        data: () => ({
            records: [],
            loading: true,
        }),

        async mounted() {

            this.records = await this.$store.dispatch('fetchRecords');
            const categories = await this.$store.dispatch('fetchCategories');
            this.setup(categories);
            this.loading = false;
        },


        methods: {
            setup(categories) {
                this.setUpPagination(this.records.map(r => {
                    return {
                        ...r,
                        categoryName: categories.find(c => c.id === r.category).title,
                        typeColor: r.type === 'income' ? 'green' : 'red',
                    }
                }));
                //

                setTimeout(() => {
                    this.renderChart({
                        labels: categories.map(c => c.title),
                        datasets: [{
                            label: '# of Votes',
                            data: categories.map(c => {
                                return this.records.reduce((t, r) => {
                                    if(r.type === 'outcome' && c.id === r.category) {
                                        t += +r.amount;
                                    }
                                    return t;
                                }, 0)
                             }),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    });
                })
            }
        },
    }
</script>

<style scoped>

</style>