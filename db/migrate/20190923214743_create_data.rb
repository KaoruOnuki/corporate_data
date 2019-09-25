class CreateData < ActiveRecord::Migration[5.2]
  def change
    create_table :data do |t|
      t.string :domain
      t.string :company
      t.string :prefecture
      t.string :address
      t.string :phone
      t.string :fax
      t.string :url
      t.string :id_number

      t.timestamps
    end
  end
end
