class PrescriptionsController < ApplicationController
  before_action :set_prescription, only: [:show, :update, :destroy]

  # POST /prescriptions
  def create
    @prescription = Prescription.new(prescription_params)

    if @prescription.save
      render json: @prescription, status: :created, location: @prescription
    else
      render json: @prescription.errors, status: :unprocessable_entity
    end
  end

  # GET /prescriptions/suggestions
  def suggestions
    data = [
      {
        title: 'Ingredients',
        items: Ingredient.all.map do |ingredient|
          {
            id: ingredient.id,
            name: ingredient.name,
            minimum_percentage: ingredient.minimum_percentage,
            maximum_percentage: ingredient.maximum_percentage,
            description: ingredient.description
          }
        end
      },
      {
        title: 'Formulations',
        items: Formulation.all.map do |formulation|
          {
            id: formulation.id,
            name: formulation.name,
            ingredient_ids: formulation.ingredient_ids
          }
        end
      }
    ];

    render json: data
  end

  private

    # Only allow a trusted parameter "white list" through.
    def prescription_params
      params.require(:prescription).permit(:patient_name, :address, :dob)
    end
end
