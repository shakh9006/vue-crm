<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Edit</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select  v-model="current" ref="select">
                        <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
                    </select>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model.trim="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">Name of Category</label>
                    <span
                            v-if="$v.title.$dirty && !$v.title.required"
                            class="helper-text invalid">
                        Name field is required
                    </span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">Limit</label>
                    <span
                            v-if="$v.limit.$dirty && !$v.limit.minLength"
                            class="helper-text invalid">
                        Min count must be {{$v.limit.$params.minValue.min}}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Save changes
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    export default {
        name: "EditCategory",
        props: ['categories'],
        data: () => ({
            title: '',
            limit: 100,
            select: null,
            current: null,
        }),

        created() {
            const {id, title, limit} = this.categories[0];
            this.current = id;
            this.title = title;
            this.limit = limit;
        },

        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.select);
            window.M.updateTextFields();
        },

        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },

        watch: {
            current(val) {
                const {title, limit} = this.categories.find(e => e.id === val);
                this.title = title;
                this.limit = limit;
            }
        },

        destroyed() {
            if(this.select && this.select.destroy) {
                this.select.destroy();
            }
        },

        methods: {
            async submitHandler() {
                if(this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                const formData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit,
                };

                await this.$store.dispatch('editCategory', formData);
                this.$emit('updated', formData);
                this.$message('Category updated successfully');
            },
        }
    }
</script>

<style scoped>

</style>