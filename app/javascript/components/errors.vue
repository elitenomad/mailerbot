<template>
    <div class="alert alert-danger alert-dismissible fade in" v-if="form_errors.length > 0">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
        <ul v-for="error in form_errors">
            <li>{{ error['field'] }}: {{ error['message'] }}</li>
        </ul>
    </div>
</template>

<script>
    module.exports = {
        props: [ 'form_errors' ],
    };
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
</style>
