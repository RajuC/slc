defmodule SlcWeb.AdView do
  use SlcWeb, :view
  alias SlcWeb.AdView

  def render("index.json", %{ads: ads}) do
    %{data: render_many(ads, AdView, "mini_ad.json")}
  end

  def render("show.json", %{ad: ad}) do
    %{data: render_one(ad, AdView, "ad.json")}
  end

  def render("mini_ad.json", %{ad: ad}) do
    # ad |> IO.inspect(label: "#{__ENV__.module}||#{inspect(__ENV__.function)}||L:#{__ENV__.line}||--------> mini_ad: " )
    %{
      id: ad.id,
      name: "#{ad.brand} #{ad.model} #{ad.variant}",
      post_ad_id: ad.post_ad_id,
      type: ad.type,
      brand: ad.brand,
      model: ad.model,
      variant: ad.variant,
      year: ad.year,
      km_driven: ad.km_driven,
      fuel_type: ad.fuel_type,
      asking_price: ad.asking_price,
      display_image_url: get_dp(ad.images),
      location: ad.location,
      ad_status: ad.ad_status,
      is_ad_active: ad.is_ad_active,
      inserted_at: ad.inserted_at,
      updated_at: ad.updated_at
    }
  end

  def render("ad.json", %{ad: ad}) do
    # ad.images |> IO.inspect(label: "#{__ENV__.module}||#{inspect(__ENV__.function)}||L:#{__ENV__.line}||--------> Ad images: " )
    %{
      id: ad.id,
      name: "#{ad.brand} #{ad.model} #{ad.variant}",
      post_ad_id: ad.post_ad_id,
      type: ad.type,
      brand: ad.brand,
      body_type: ad.body_type,
      km_driven: ad.km_driven,
      model: ad.model,
      variant: ad.variant,
      year: ad.year,
      condition: ad.condition,
      fuel_type: ad.fuel_type,
      transmission: ad.transmission,
      no_of_owners: ad.no_of_owners,
      features: ad.features,
      extra_notes: ad.extra_notes,
      seller_name: ad.seller_name,
      seller_email: ad.seller_email,
      seller_phone: ad.seller_phone,
      images: ad.images,
      location: ad.location,
      asking_price: ad.asking_price,
      views: ad.views,
      display_image_url: get_dp(ad.images),
      ad_status: ad.ad_status,
      ad_active_timestamp: ad.ad_active_timestamp,
      is_ad_active: ad.is_ad_active,
      inserted_at: ad.inserted_at,
      updated_at: ad.updated_at
    }
  end

  defp get_dp([image | _Rest]), do: image
end
