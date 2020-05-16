<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Create</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                    Create
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    export default {
        name: "CreateCategory",
        data: () => ({
            title: '',
            limit: 100,
        }),
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },

        mounted() {
            window.M.updateTextFields();
        },
        methods: {
           async submitHandler() {
                if(this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit
                });

                this.title = '';
                this.limit = 100;
                this.$v.$reset();

                this.$emit('created', category);
                this.$message('Category created successfully');
           }
        }
    }
</script>

<style scoped>

</style>