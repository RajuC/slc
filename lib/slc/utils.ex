defmodule Slc.Utils do
  def frame_location(location) do
    location_map =
      case String.split(location, ", ") do
        [subRegion, region, city, state, "India"] ->
          %{
            sub_region: subRegion,
            region: region,
            city: city,
            state: state,
            location_str: location
          }

        [region, city, state, "India"] ->
          %{
            region: region,
            city: city,
            state: state,
            location_str: location
          }

        [city, state, "India"] ->
          %{
            region: city,
            city: city,
            state: state,
            location_str: location
          }
      end

  {:ok, location_map}
  end
end
