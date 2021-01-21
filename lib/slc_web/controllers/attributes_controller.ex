defmodule SlcWeb.AttributesController do
  use SlcWeb, :controller

  alias Slc.Attributes

  action_fallback SlcWeb.FallbackController

  def bike_attrs(conn, params) do
    bike_attributes = Attributes.list_bike_attributes(params)
    render(conn, "index.json", bike_attributes: bike_attributes)
  end

  def car_attrs(conn, params) do
    car_attributes = Attributes.list_car_attributes(params)
    render(conn, "index.json", car_attributes: car_attributes)
  end


end
