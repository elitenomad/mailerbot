<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <Headers></Headers>

                    <form id="contact-form" role="form" @submit.prevent="validateForm('form-1')" data-vv-scope="form-1" novalidate>

                        <Errors :form_errors='form_errors'></Errors>
                        <Success :form_success="form_success"></Success>

                        <div class="controls">

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{'input': true, 'has-error': errors.has('form-1.from') }">
                                        <label for="form_from">From *</label>
                                        <input id="form_from"
                                               type="email"
                                               name="from"
                                               class="form-control"
                                               placeholder="e.g abc@gmail.com"
                                               v-model="mail.from"
                                               v-validate="{ required: true, email: true, regex: /.+@.+/ }" autofocus>
                                        <span class="help-block pull-right" v-show="errors.has('form-1.from')">{{ errors.first('form-1.from') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{'input': true, 'has-error': errors.has('form-1.to') }">
                                        <label for="form_to">To *</label>
                                        <input id="form_to"
                                               type="text"
                                               name="to"
                                               class="form-control"
                                               placeholder="e.g xyz@gmail.com, mnop@gmail.com"
                                               v-model="mail.to"
                                               v-validate="{ required: true, regex: /^\w+(.\w+)*@\w+\.\w+(,\s*\w+@\w+\.\w+)*$/ }">
                                        <span class="help-block pull-right" v-show="errors.has('form-1.to')">{{ errors.first('form-1.to') }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{'input': true, 'has-error': errors.has('form-1.cc') }">
                                        <label for="form_cc">CC</label>
                                        <input id="form_cc"
                                               type="email"
                                               name="cc"
                                               class="form-control"
                                               placeholder="e.g xyz_cc@gmail.com, mnop_cc@gmail.com"
                                               v-validate="{ required: false, regex: /^\w+(.\w+)*@\w+\.\w+(,\s*\w+@\w+\.\w+)*$/ }"
                                                v-model="mail.cc">
                                        <span class="help-block pull-right" v-show="errors.has('form-1.cc')">{{ errors.first('form-1.cc') }}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{'input': true, 'has-error': errors.has('form-1.bcc') }">
                                        <label for="form_bcc">BCC</label>
                                        <input id="form_bcc"
                                               type="email"
                                               name="bcc"
                                               class="form-control"
                                               placeholder="e.g xyz_bcc@gmail.com, mnop_bcc@gmail.com"
                                               v-validate="{ required: false, regex: /^\w+(.\w+)*@\w+\.\w+(,\s*\w+@\w+\.\w+)*$/ }"
                                               v-model="mail.bcc">
                                        <span class="help-block pull-right" v-show="errors.has('form-1.bcc')">{{ errors.first('form-1.bcc') }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{'input': true, 'has-error': errors.has('form-1.subject') }">
                                        <label for="form_bcc">Subject *</label>
                                        <input id="form_subject"
                                               type="text"
                                               name="subject"
                                               class="form-control"
                                               placeholder="e.g about vehicle"
                                               v-model="mail.subject"
                                               v-validate="{ required: true }">
                                        <span class="help-block pull-right" v-show="errors.has('form-1.subject')">{{ errors.first('form-1.subject') }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{'input': true, 'has-error': errors.has('form-1.message') }">
                                        <label for="form_message">Message *</label>
                                        <textarea id="form_message"
                                                  name="message"
                                                  class="form-control"
                                                  placeholder="Create a story and send an email"
                                                  rows="5"
                                                  v-model="mail.body"
                                                  v-validate="{ required: true }"></textarea>

                                        <span class="help-block pull-right" v-show="errors.has('form-1.message')">{{ errors.first('form-1.message') }}</span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-success btn-send">Send Message</button>&nbsp;&nbsp;
                                    <button class="btn btn-danger" type="button" name="button" @click="clearForm">Clear validations</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="text-muted"><strong>*</strong> These fields are required.</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Headers from './header_c.vue';
    import Errors from './errors.vue';
    import Success from './success.vue';

    export default {
        data () {
            return {
                mail: {
                    from: undefined,
                    to: undefined,
                    cc: undefined,
                    bcc: undefined,
                    subject: undefined,
                    body: undefined
                },
                form_errors: [],
                form_success: ''
            }
        },
        components: { Headers, Errors, Success },
        methods: {
            /**
             * Callback method when form is submitted.
             */
            validateForm (scope) {
                let that = this;
                this.$validator.validateAll(scope).then((result) => {
                    if (result) {
                        axios.post('/api/v1.0.0/compose', that.mail)
                            .then(function (response) {
                                console.log("what is resoonse ", response);
                                const message = response.data
                                if(message.status === 0){
                                    that.form_success = 'Email sent successfully';
                                }else {
                                    if(JSON.parse(message.message)['errors']){
                                        that.form_errors = JSON.parse(message.message)['errors'];
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log("what is error ", error);
                            });
                    }
                });
            },
            clearForm (e){
                this.mail = {
                    from: '',
                    to: '',
                    cc: '',
                    bcc: '',
                    subject: '',
                    body: ''
                };
                this.errors.clear('form-1');
                e.preventDefault();
            }
        }
    }

</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
    form#contact-form{
        border: 1px solid gray;
        padding: 60px;
        box-shadow: 5px 5px 30px #888888;
    }
    .btn-send {
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 20px;
    }

</style>
