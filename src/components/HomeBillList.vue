<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Exchange Rates</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Course</th>
                        <th>Date</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr v-for="(cur, index) in currency.rates"
                        :key="index"
                    >
                        <td>{{index}}</td>
                        <td>{{currency.rates[index]}}</td>
                        <td>{{currency.date}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeBillList",
        props: ['currency'],
        data() {
            return {

            }
        },


    }
</script>

<style scoped>

</style>