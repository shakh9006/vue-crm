<template>
    <div>
        <div class="page-title">
            <h3>Planning</h3>
            <h4>{{$store.getters.getInfo.bill}}</h4>
        </div>

        <Loader v-if="loading" />
        <p v-else-if="!categories.length" class="center">There is no any categories. <router-link to="/categories">Please create category</router-link> </p>
        <section v-else>
            <div
                v-for="c in categories"
                :key="c.id"
            >
                <p>
                    <strong>{{c.title}}:</strong>
                    {{c.spend}} of {{c.limit}}
                </p>
                <div class="progress">
                    <div
                            class="determinate"
                            :class="[c.percentColor]"
                            :style="`width:${c.percent}%`"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Planning",
        data: () => ({
            loading: true,
            categories: [],
        }),

        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');
            const categories = await this.$store.dispatch('fetchCategories');

            this.categories = categories.map(c => {
               const spend = records.filter(r => r.category === c.id)
                                    .filter(r => r.type === 'outcome')
                                    .reduce((total, r) => {
                                        return total += + r.amount;
                                    }, 0);

                const $percent = spend * 100 / c.limit;
                const percent = $percent > 100 ? 100 : $percent;
                const percentColor = percent < 60
                    ? 'green'
                    : percent < 100
                    ? 'yellow'
                    : 'red';

                return {
                    ...c,
                    spend,
                    percent,
                    percentColor,
                }
            });

            this.loading = false;
        },
    }
</script>

<style scoped>

</style>