<template>
    <div>
        <Loader v-if="loading" />
        <p v-else-if="!record">There is no id with <strong>{{$route.params.id}}</strong></p>
        <div v-else>
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">History</router-link>
                <a class="breadcrumb">
                    {{record.typeTitle}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="[record.typeColor]">
                        <div class="card-content white-text">
                            <p>Description: {{record.desc}}</p>
                            <p>Count: {{record.amount}}</p>
                            <p>Category: {{record.categoryTitle}}</p>
                            <small>{{record.date}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailRecord",

        data: () => ({
            loading: true,
            record: null,
        }),

        async mounted() {
            const id = this.$route.params.id;
            const record = await this.$store.dispatch('fetchRecordById', id);
            const category = await this.$store.dispatch('fetchCategoryById', record.category);

            this.record = {
                ...record,
                typeColor: record.type === 'income' ?  'green' : 'red',
                categoryTitle: category.title,
                typeTitle: record.type === 'income' ? 'Income' : 'OutCome',
            };

            this.loading = false;
        }
    }
</script>

<style scoped>

</style>