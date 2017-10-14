require 'rails_helper'

RSpec.describe Mail::API do
  context 'GET /api/v1.0.0/ping' do
    it 'returns 200' do
      get '/api/v1.0.0/ping'
      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
    end
  end

  context 'POST /api/v1.0.0/compose' do
    let(:from) { 'test@test.com' }
    let(:to) { 'test_to@test.com' }
    let(:subject) { 'Testing subject' }
    let(:body) { 'Testing body' }

    describe 'success' do
      it 'returns 201 when all parameters are passed' do
        post '/api/v1.0.0/compose', {from: from, to: to, subject: subject, body: body}
        expect(last_response.status).to eq(201)
      end
    end

    describe 'failure' do
      it 'returns error status 400 when required params missing' do
        post '/api/v1.0.0/compose', {from: '', to: '', cc: from, bcc: from ,subject: subject, body: body}
        expect(last_response.status).to eq(400)
      end
    end
  end
end