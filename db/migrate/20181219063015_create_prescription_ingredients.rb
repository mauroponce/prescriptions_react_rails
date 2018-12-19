class CreatePrescriptionIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :prescription_ingredients do |t|
      t.references :prescription, foreign_key: true
      t.references :ingredient, foreign_key: true
      t.float :percentage

      t.timestamps
    end
  end
end
