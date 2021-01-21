defmodule Slc.Attributes do
  import Ecto.Query, warn: false
  alias Slc.Repo

  def list_bike_attributes(%{"type" => type, "brand" => brand}) do
    query =
      from(u in "bike_attributes",
        where: u.brand == ^brand and u.type == ^type,
        select: u.model
      )

    results = Repo.all(query) |> Enum.uniq()
    %{results: results}
  end

  def list_bike_attributes(%{"type" => type}) do
    query =
      from(u in "bike_attributes",
        where: u.type == ^type,
        select: u.brand
      )

    results = Repo.all(query) |> Enum.uniq()
    %{results: results}
  end

  def list_bike_attributes(%{}) do
    query =
      from(u in "bike_attributes",
        where: u.type == "bike",
        select: %{"brand" => u.brand, "model" => u.model, "type" => u.type}
      )

    results = Repo.all(query)
    %{results: results}
  end

  def list_car_attributes(%{"type" => type, "brand" => brand, "model" => model}) do
    query =
      from(u in "car_attributes",
        where: u.model == ^model and u.brand == ^brand and u.type == ^type,
        select: u.variant
      )

    results = Repo.all(query) |> Enum.uniq()
    %{results: results}
  end

  def list_car_attributes(%{"type" => type, "brand" => brand}) do
    query =
      from(u in "car_attributes",
        where: u.brand == ^brand and u.type == ^type,
        select: u.model
      )

    results = Repo.all(query) |> Enum.uniq()
    %{results: results}
  end

  def list_car_attributes(%{"type" => type}) do
    query =
      from(u in "car_attributes",
        where: u.type == ^type,
        select: u.brand
      )

    results = Repo.all(query) |> Enum.uniq()
    %{results: results}
  end

  def list_car_attributes(%{}) do
    query =
      from(u in "car_attributes",
        where: u.type == "car",
        select: %{
          "brand" => u.brand,
          "model" => u.model,
          "type" => u.type,
          "variant" => u.variant
        }
      )

    results = Repo.all(query)
    %{results: results}
  end
end
