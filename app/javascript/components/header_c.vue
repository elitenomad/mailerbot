<template>
    <div id="header">
        <h1>{{ h1 }}</h1>
        <p class="lead">{{ lead }}</p>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                h1: "Software Engineer Challenge V2.2 - Email",
                lead: "Email Providers: Sendgrid and mailgun"
            }
        }
    };
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
</style>
