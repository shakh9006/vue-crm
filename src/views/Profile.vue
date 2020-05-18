<template>
    <div>
        <div class="page-title">
            <h3>Profile</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model.trim="name"
                        :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <label for="description">Name</label>
                <span
                    v-if="$v.name.$dirty && !$v.name.required"
                    class="helper-text invalid">
                   Name field is required
                </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Update
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    export default {
        name: "Profile",
        data: () => ({
            name: '',
        })  ,

        validations: {
            name: {required},
        },

        mounted() {
            this.name = this.$store.getters.getInfo.name;
            setTimeout(() => {
                window.M.updateTextFields();
            })
        },

        methods: {
            async submitHandler() {
                if(this.$v.$invalid){
                    this.$v.$touch();
                    return;
                }

               await this.$store.dispatch('updateInfo', {name: this.name});
               this.$message('Name field updated successfully');
            }
        }
    }
</script>

<style scoped>

</style>