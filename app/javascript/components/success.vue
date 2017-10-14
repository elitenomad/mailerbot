<template>
    <div class="alert alert-success alert-dismissible fade in" v-if="form_success">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
        <span>{{ form_success }}</span>
    </div>
</template>

<script>
    module.exports = {
        props: [ 'form_success' ],
    };
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
</style>
