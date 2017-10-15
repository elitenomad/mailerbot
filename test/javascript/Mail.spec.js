import { expect } from 'chai'
import { mount } from 'avoriaz'
window.Promise = require('promise');

/*
    Import the libraries required || Used to create the component
 */
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import Mail from '../../app/javascript/components/mail.vue';
import Headers from '../../app/javascript/components/header_c.vue';
import Errors from '../../app/javascript/components/errors.vue';
import Success from '../../app/javascript/components/success.vue';

// Header component
describe('Headers', () => {

    it('has a root element as div for the  app', () => {
        const wrapper = mount(Headers);
        expect(wrapper.is('div')).to.equal(true)
    });

    it('has a root element with an id header of app', () => {
        const wrapper = mount(Headers);
        expect(wrapper.is('#header')).to.equal(true)
    });


    it('has a default values set to header and lead !', () => {
        const wrapper = mount(Headers);
        expect(wrapper.data().h1).to.equal('Software Engineer Challenge V2.2 - Email');
        expect(wrapper.data().lead).to.equal('Email Providers: Sendgrid and mailgun');
    });


    it('should render correct h1 contents', () => {
        const vm = mount(Headers);
        const title = vm.find('h1')[0];
        const lead = vm.find('p.lead')[0];
        expect(title.text())
            .to.equal('Software Engineer Challenge V2.2 - Email');
        expect(lead.text())
            .to.equal('Email Providers: Sendgrid and mailgun');
    });

});

// Mail Component
describe('Mail', () => {

    it('has a root element as div for the  app', () => {
        const wrapper = mount(Mail);
        expect(wrapper.is('div')).to.equal(true)
    });

    it('has a root element with an id of app', () => {
        const wrapper = mount(Mail);
        expect(wrapper.is('#app')).to.equal(true)
    });


    it('has a message set to default mail values!', () => {
        const wrapper = mount(Mail);
        expect(wrapper.data().mail.from).to.equal(undefined);
        expect(wrapper.data().mail.to).to.equal(undefined);
        expect(wrapper.data().mail.cc).to.equal(undefined);
        expect(wrapper.data().mail.bcc).to.equal(undefined);
        expect(wrapper.data().mail.subject).to.equal(undefined);
        expect(wrapper.data().mail.body).to.equal(undefined);
    });


    xit('has a validation message for form fields if blank');
    xit('has a form submitted with errors');
    xit('has a form submitted successfully');
});

describe('Errors', () => {

    it('has a button to close error panel !', () => {
        const form_errors = ['To cannot be blank', 'From Cannot be blank','Subject Cannot be blank','Body cannot be blank'];
        const wrapper = mount(Errors, {propsData:{ form_errors }});
        const btn = wrapper.find('button');
        expect(btn.length).to.equal(1)
    });

    it('renders 4 list elements inside ul', () => {
        const form_errors = ['To cannot be blank', 'From Cannot be blank','Subject Cannot be blank','Body cannot be blank'];
        const wrapper = mount(Errors, {propsData:{ form_errors }});
        const listElements = wrapper.find('ul li');
        expect(listElements.length).to.equal(4);
    })
});

describe('Success', () => {

    it('has set successful message', () => {
        const wrapper = mount(Success);
        wrapper.setProps({
            form_success: 'Email sent successfully'
        });
        const msg = wrapper.find('span')[1];
        expect(msg.text()).to.equal('Email sent successfully')
    });

});