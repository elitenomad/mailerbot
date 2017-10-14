module Mail
  class API <  Grape::API
    format :json

    desc 'Trigger e-mail service providers to dispatch emails.' do
      # to 'Receiver email address(es)'
      # from  'Sender email address'
      # cc 'copied e-mail address(es)'
      # bcc 'invisible copied e-mail address(es)'
      # subj 'Subject of email'
      # body 'Body of email (Plain text)'
      # success API::Entities::Entity
      # failure [[401, 'Unauthorized', 'Entities::Error']]
    end
    params do
      requires :from, type: String, allow_blank: { value: false, message: 'cannot be blank' } , regexp: { value:  /.+@.+/, message: 'format is invalid' }
      requires :to, type: String, allow_blank: { value: false, message: 'cannot be blank' } , regexp: { value:  /.+@.+/, message: 'format is invalid' }
      optional :cc, type: String
      optional :bcc, type: String
      requires :subject, type: String, allow_blank: { value: false, message: 'cannot be blank' }, message: 'is mandatory'
      requires :body, type: String, allow_blank: { value: false, message: 'cannot be blank' }
    end
    post '/compose' do

      from = params[:from]
      to = params[:to]
      cc = params[:cc]
      bcc = params[:bcc]
      subject = params[:subject]
      body = params[:body]
      response = {}

      # Trigger email-delivery gem methods
      client = Email::Delivery::Client.new(from, to, cc, bcc, subject, body)
      begin
        response = client.dispatch
      rescue Exception => e
        puts "Error stacktrace #{ e }"
        response = {status: 4, message: e.response }
      end

      response
    end

    get 'ping' do
      { "status" => "ok" }
    end
  end
end
