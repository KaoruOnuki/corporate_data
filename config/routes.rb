Rails.application.routes.draw do
  resources :data
  root to: 'data#new'
end
