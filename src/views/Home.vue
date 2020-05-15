<template>
    <div class="home">
        <div>
            <div class="page-title">
                <h3>Счет</h3>

                <button class="btn waves-effect waves-light btn-small" @click.prevent="refresh">
                    <i class="material-icons">refresh</i>
                </button>
            </div>
            <Loader v-if="loading" />
            <div v-else class="row">

                <HomeBill :rates="currency.rates"/>

                <HomeBillList :currency="currency"/>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeBill from "../app/HomeBill";
    import HomeBillList from "../app/HomeBillList"

    export default {
        name: 'Home',
        components: {
            HomeBill, HomeBillList
        },

        data() {
            return {
                loading: true,
                currency: null,
            }
        },

        async mounted() {
            this.getFixer()
        },

        methods: {
            async refresh() {
                this.loading = true;
                this.getFixer();
            },

            async getFixer() {
                this.currency = await this.$store.dispatch('fetchFixer');
                this.loading = false;
            }
        }
    }
</script>
