<template>
    <div>

        <div class="page-title">
            <h3>New Record</h3>
        </div>

        <Loader v-if="loading"/>
        <p v-else-if="!categories.length" class="center">There is no any categories. <router-link to="/categories">Please create category</router-link> </p>
        <form v-else class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <select
                    v-model="category"
                    ref="select"
                >
                    <option
                        v-for="c in categories"
                        :key="c.id"
                        :value="c.id"
                    >
                        {{c.title}}
                    </option>
                </select>
                <label>Select Category</label>
            </div>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>Income</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"
                    />
                    <span>Outcome</span>
                </label>
            </p>

            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                        :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
                >
                <label for="amount">Amount</label>
                <span
                        v-if="$v.amount.$dirty && !$v.amount.minValue"
                        class="helper-text invalid">
                    Amount must be at least {{$v.amount.$params.minValue.min}}
                </span>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model.trim="desc"
                        :class="{invalid: $v.desc.$dirty && !$v.desc.required}"
                >
                <label for="description">Description</label>
                <span
                        v-if="$v.desc.$dirty && !$v.desc.required"
                        class="helper-text invalid">
                    Description field is required
                </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Create
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    export default {
        name: "Record",

        data: () => ({
            desc: '',
            amount: 100,
            select: null,
            loading: true,
            categories: [],
            category: null,
            type: 'outcome',
        }),

        validations: {
            desc: {required},
            amount: {minValue: minValue(1)}
        },

        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories');
            if(this.categories.length) {
                this.loading = false;
                this.category   = this.categories[0].id;
                setTimeout(() => {
                    window.M.updateTextFields();
                    this.select = window.M.FormSelect.init(this.$refs.select)
                }, 0);
            }
        },

        computed: {
            checkType() {
                if(this.type === 'income') {
                    return true;
                }

                return this.$store.getters.getInfo.bill >= this.amount;
            }
        },

        methods: {
            submitHandler() {
                if(this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                if(this.checkType) {
                    const date = new Date();
                    this.$store.dispatch('createRecord', {
                        type: this.type,
                        desc: this.desc,
                        amount: this.amount,
                        category: this.category,

                        date: date.toJSON(),
                    });

                    const bill = this.type === 'income'
                        ? this.$store.getters.getInfo.bill + this.amount
                        : this.$store.getters.getInfo.bill - this.amount;

                    this.$message('Record created successfully');
                    this.$store.dispatch('updateInfo', {bill})

                    this.desc = '';
                    this.amount = 100;
                    this.category = this.categories[0].id;

                }else {
                    this.$message(`insufficient funds in the account (${ this.amount - this.$store.getters.getInfo.bill})`);
                }
            }
        },

        destroyed() {
            if(this.select && this.select.destroy) {
                this.select.destroy();
            }
        },
    }
</script>

<style scoped>

</style>