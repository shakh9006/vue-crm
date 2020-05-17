<template>
    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>Count</th>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>View</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(record, id) in records" :key="id">
            <td>{{id + 1}}</td>
            <td>{{record.amount}}</td>
            <td>{{record.data}}</td>
            <td>{{record.categoryName}}</td>
            <td>
                <span
                    :class="[record.typeColor]"
                    class="white-text badge">
                    {{record.type.toUpperCase()}}
                </span>
            </td>
            <td>
                <button @click="$router.push(`/detail/${record.id}`)" class="btn-small btn">
                    <i class="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: {
            records: {
                type: Array,
                required: true,
            },
        },
        name: "HistoryTable"
    }
</script>

<style scoped>

</style>