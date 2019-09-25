json.extract! datum, :id, :domain, :company, :prefecture, :address, :phone, :fax, :url, :id_number, :created_at, :updated_at
json.url datum_url(datum, format: :json)
