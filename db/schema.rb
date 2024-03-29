# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_19_063015) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "formulation_ingredients", force: :cascade do |t|
    t.bigint "formulation_id"
    t.bigint "ingredient_id"
    t.float "percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["formulation_id"], name: "index_formulation_ingredients_on_formulation_id"
    t.index ["ingredient_id"], name: "index_formulation_ingredients_on_ingredient_id"
  end

  create_table "formulations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.float "minimum_percentage"
    t.float "maximum_percentage"
    t.string "description"
    t.text "classes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prescription_ingredients", force: :cascade do |t|
    t.bigint "prescription_id"
    t.bigint "ingredient_id"
    t.float "percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_prescription_ingredients_on_ingredient_id"
    t.index ["prescription_id"], name: "index_prescription_ingredients_on_prescription_id"
  end

  create_table "prescriptions", force: :cascade do |t|
    t.string "patient_name"
    t.string "address"
    t.string "dob"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "formulation_ingredients", "formulations"
  add_foreign_key "formulation_ingredients", "ingredients"
  add_foreign_key "prescription_ingredients", "ingredients"
  add_foreign_key "prescription_ingredients", "prescriptions"
end
