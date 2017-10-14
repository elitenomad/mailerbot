require 'rails_helper'

RSpec.describe 'routes' do
  describe 'Application index route' do
    it 'is expected to route to landing controller' do
      expect(:get => "/").to route_to(:controller => "landing", :action => "index")
    end
  end
end