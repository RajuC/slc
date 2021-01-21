defmodule SlcWeb.AttributesView do
  use SlcWeb, :view
  alias SlcWeb.AttributesView

  def render("index.json", %{bike_attributes: %{results: results}}) do
    %{data: results}
  end

  # def render("index.json", %{bike_attributes: bike_attributes}) do
  #   %{data: render_many(bike_attributes, AttributesView, "bike_attribute.json")}
  # end

  # def render("show.json", %{bike_attribute: bike_attribute}) do
  #   %{data: render_one(bike_attribute, AttributesView, "bike_attribute.json")}
  # end

  # def render("bike_attribute.json", %{bike_attribute: bike_attribute}) do
  #   %{
  #     type: bike_attribute.type,
  #     brand: bike_attribute.brand,
  #     model: bike_attribute.model}
  # end




  def render("index.json", %{car_attributes: %{results: results}}) do
    %{data: results}
  end

  # def render("index.json", %{car_attributes: car_attributes}) do
  #   %{data: render_many(car_attributes, AttributesView, "car_attribute.json")}
  # end

  # def render("show.json", %{car_attribute: car_attribute}) do
  #   %{data: render_one(car_attribute, AttributesView, "car_attribute.json")}
  # end

  # def render("car_attribute.json", %{car_attribute: car_attribute}) do
  #   %{
  #     type: car_attribute.type,
  #     brand: car_attribute.brand,
  #     model: car_attribute.model,
  #     variant: car_attribute.variant}
  # end

end
