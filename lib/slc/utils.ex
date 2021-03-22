defmodule Slc.Utils do
  # %{
  #   "lat" => 17.4503375,
  #   "location_str" => "Malkajgiri, Secunderabad, Telangana, India",
  #   "long" => 78.53224809999999,
  #   "place_id" => "ChIJdRIOrsubyzsR0x-UrJmo4T0"
  # }

  def frame_location(
        %{"location_str" => location, "place_id" => place_id, "lat" => lat, "long" => long} =
          loc_vall
      ) do
    loc_vall
    |> IO.inspect(
      label:
        "#{__ENV__.module}||#{inspect(__ENV__.function)}||L:#{__ENV__.line}||--------> location: "
    )

    location_map =
      case String.split(location, ", ") do
        [subRegion1, subRegion2, region, city, state, "India"] ->
          %{
            sub_region: subRegion1 <> " " <> subRegion2,
            region: region,
            city: city,
            state: state,
            location_str: location,
            place_id: place_id,
            lat: lat,
            long: long
          }

        [subRegion, region, city, state, "India"] ->
          %{
            sub_region: subRegion,
            region: region,
            city: city,
            state: state,
            location_str: location,
            place_id: place_id,
            lat: lat,
            long: long
          }

        [region, city, state, "India"] ->
          %{
            region: region,
            city: city,
            state: state,
            location_str: location,
            place_id: place_id,
            lat: lat,
            long: long
          }

        [city, state, "India"] ->
          %{
            region: city,
            city: city,
            state: state,
            location_str: location,
            place_id: place_id,
            lat: lat,
            long: long
          }
      end

    {:ok, location_map}
  end
end
