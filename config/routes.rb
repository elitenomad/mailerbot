Rails.application.routes.draw do
  root to: 'landing#index'
  mount Mail::API => '/api/v1.0.0'
end
