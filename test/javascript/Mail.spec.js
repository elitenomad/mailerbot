import { expect } from 'chai'
import { mount } from 'avoriaz'

import Vue from 'vue'
import Mail from '../../app/javascript/components/mail.vue';

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('Mail', () => {

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


    it('should render correct h1 contents', () => {
        const vm = mount(Mail);
        expect(vm.text())
            .to.equal('Software Engineer Challenge V2.2 - Email')
    })
});